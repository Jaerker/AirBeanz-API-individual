import jwt from 'jsonwebtoken';

import { productDb, productSchema } from '../models/productModel.js';
import Order, { orderDb } from '../models/orderModel.js';
import { userDb, userSchema, loginSchema } from '../models/userModel.js';
import { discountDb, discountSchema } from '../models/discountModel.js';

import { aboutDb } from '../controllers/aboutController.js';
import { navigationDb } from '../models/navigationModel.js';

const SECRET_KEY = process.env.SECRET_KEY || 'a59be5d7-0753-4d62-b665-e62d62a63c5b';

const validationError = new Error();

const validate = {
    //ORDRAR
    orders: {
        //Kollar orderId som passeras in i bodyn. Om inte den finns, skapa ny order     
        one: async (req, res, next) => {
            let { orderId } = req.body;
            const { user } = req;

            let orderToReturn = null;

            if (!orderId) {
                if (req.params.orderId) {

                    orderId = req.params.orderId;
                    
                    orderToReturn = await orderDb.findOne({ orderId: orderId, orderIsPlaced: false });
                    if (!orderToReturn) {
                        validationError.message = 'Order not found.';
                        validationError.status = 404;
                        return next(validationError);
                    }

                }
                else {

                    // Om ingen orderId, försök hitta en existerande icke-placerad order för användaren
                    if (user) {
                        orderToReturn = await orderDb.findOne({ userId: user.userId, orderIsPlaced: false });
                        if (!orderToReturn) {
                            orderToReturn = new Order(user.userId);
                            await orderToReturn.init();
                        }
                    } else {
                        orderToReturn = new Order();
                        await orderToReturn.init();
                    }
                }

            }
            else {
                orderToReturn = await orderDb.findOne({ orderId: orderId, orderIsPlaced: false });
                if (!orderToReturn) {
                    validationError.message = 'Order not found.';
                    validationError.status = 404;
                    return next(validationError);
                }
            }

            req.order = orderToReturn;
            next();

        },
        //Kollar orderId som passeras in i bodyn, annars kan du inte komma vidare   
        oneStrict: async (req, res, next) => {
            let { orderId } = req.body;
            const { productId } = req.params;

            if (!orderId) {
                if (req.params.orderId) {
                    orderId = req.params.orderId;
                }
                else {
                    validationError.message = 'orderId parameter not found.';
                    validationError.status = 404;
                    return next(validationError);
                }
            }

            const order = await orderDb.findOne({ orderId: orderId });

            if (!order) {
                validationError.message = 'Order not found.';
                validationError.status = 404;
                return next(validationError);
            }

            if (req.method === 'DELETE' && order.products.findIndex(item => item.product._id === productId) === -1) {

                validationError.message = `Product with _id ${productId} does not exist in order.`;
                validationError.status = 404;
                return next(validationError);
            }

            req.order = order;
            next();
        },

        many: async (req, res, next) => {
            const orders = await orderDb.find();

            if (orders.length < 0) {
                validationError.message = 'No orders found'
                validationError.status = 404
                return next(validationError);
            }
            req.orders = orders;
            next();
        },

        history: async (req, res, next) => {
            const orders = await orderDb.find({ userId: req.user.userId }).sort({ orderPlacedAt: 1 });

            if (orders.length < 0) {
                validationError.message = 'No orders found.'
                validationError.status = 404
                return next(validationError);
            }
            req.orders = orders;
            next();
        },

        isOrderPlaced: async (req, res, next) => {
            if (req.order.orderIsPlaced) {
                validationError.message = 'Unauthorized access: Order is already placed.';
                validationError.status = 400;
                return next(validationError);
            }
            next();

        },

        isOrderNotPlaced: async (req, res, next) => {
            if (!req.order.orderIsPlaced) {
                validationError.message = 'Unauthorized access: Order is not placed yet.';
                validationError.status = 400;
                return next(validationError);
            }
            next();

        },

        userIdInsideOrder: (req, res, next) => {
            const { order, user } = req;
            if (user) {
                if (order.userId !== '') {
                    if (order.userId !== user.userId) {
                        validationError.message = 'Unauthorized access: UserId for user and UserId for order does not match.';
                        validationError.status = 400;
                        return next(validationError);
                    }
                }
                else {
                    order.userId = user.userId
                }
            }
            next();
        }
    },

    products: {
        one: async (req, res, next) => {
            const { productId } = req.params;

            if (!productId) {
                validationError.message = 'No productId found in req.params.';
                validationError.status = 404;
                return next(validationError);
            }

            const product = await productDb.findOne({ _id: productId });

            if (!product) {
                validationError.message = 'No product found in database.';
                validationError.status = 404;
                return next(validationError);
            }

            //req.product kan användas  
            req.product = product;
            next();
        },

        many: async (req, res, next) => {
            const products = await productDb.find().sort({ id: 1 });
            if (!products || products.length <= 0) {
                validationError.message = 'No products found.';
                validationError.status = 400;
                return next(validationError);
            }
            req.products = products;
            next();

        },

        new: async (req, res, next) => {
            const { error } = productSchema.validate(req.body);
            if (error) {
                validationError.message = error.details[0].message;
                validationError.status = 400;
                return next(validationError);
            }
            if (!req.body.estimatedTimeInMinutes) {
                req.body.estimatedTimeInMinutes = 0.5;
            }

            const products = await productDb.find();

            if (products.length > 0) {
                const { title } = req.body;
                if (products.some(item => item.title === title)) {
                    validationError.message = 'A product with the same name already exists.';
                    validationError.status = 400;
                    return next(validationError);
                }
            }
            req.product = req.body;
            next();

        },

        update: async (req, res, next) => {

            const { productId } = req.params;

            const allowedUpdates = ['desc', 'title', 'price', 'estimatedTimeInMinutes']; // Add other fields if needed
            const updates = Object.keys(req.body);
            const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

            if (!isValidOperation) {
                validationError.message = 'There are values inside req.body that are not allowed or needed.';
                validationError.status = 400;
                return next(validationError);
            }

            const product = await productDb.findOne({ _id: productId });

            if (!product) {
                validationError.message = 'Product does not exist.';
                validationError.status = 400;
                return next(validationError);
            }
            req.oldProduct = product;
            req.newProduct = req.body;

            next();

        },

    },

    users: {
        register: async (req, res, next) => {
            const { error } = userSchema.validate(req.body);
            if (error) {
                validationError.message = error.details[0].message;
                validationError.status = 400;
                return next(validationError);
            }

            const { username, password, validatePassword } = req.body;
            if (password !== validatePassword) {
                validationError.message = 'Password and verifyPassword are not equal.';
                validationError.status = 401;
                return next(validationError);
            }

            if (await userDb.findOne({ username: username })) {
                validationError.message = 'Username already taken.';
                validationError.status = 401;
                return next(validationError);
            }

            next();
        },


        login: async (req, res, next) => {
            const { error } = loginSchema.validate(req.body);
            const { username, password } = req.body;

            if (error) {
                validationError.message = error.details[0].message;
                validationError.status = 400;
                return next(validationError);
            }

            const user = await userDb.findOne({ username: username, password: password });

            if (!user) {
                validationError.message = 'Bad credentials: Wrong username or password.';
                validationError.status = 400;
                return next(validationError);
            }

            const token = jwt.sign(user, SECRET_KEY);
            req.token = token;

            next();
        },

        isAdmin: async (req, res, next) => {

            if (!req.user?.isAdmin) {
                validationError.message = 'Unauthorized access: User does not have authority to pass.';
                validationError.status = 400;
                return next(validationError);
            }
            next();
        },

        validUserIdParam: async (req, res, next) => {
            const { userId } = req.params;

            if (!userId) {
                validationError.message = 'Bad credentials: No userId in req.params.';
                validationError.status = 400;
                return next(validationError);
            }
            const searchedUser = await userDb.findOne({ userId: userId });

            if (!searchedUser) {
                validationError.message = `Bad credentials: No user with userId: ${userId}.`;
                validationError.status = 400;
                return next(validationError);
            }
            //Ta bort lösenordet från användarens uppgifter
            delete searchedUser.password;
            req.searchedUser = searchedUser;
            next();
        },
    },

    discounts: {
        one: async (req, res, next) => {
            const { discountId } = req.params;
            if (!discountId) {
                validationError.message = 'No discountId found.';
                validationError.status = 400;
                return next(validationError);
            }

            const discountItem = await discountDb.findOne({ _id: discountId });

            if (!discountItem) {
                validationError.message = 'No discount item found.';
                validationError.status = 404;
                return next(validationError);
            }
            req.discount = discountItem;
            next();
        },

        new: async (req, res, next) => {
            const { error } = discountSchema.validate(req.body);
            if (error) {
                validationError.message = error.details[0].message;
                validationError.status = 400;
                return next(validationError);
            }

            const { products } = req.body;
            if (products.length <= 0) {
                validationError.message = 'No products inside discount object.';
                validationError.status = 400;
                return next(validationError);
            }

            products.forEach(async item => {
                const product = await productDb.findOne({ _id: item.productId });
                if (!product) {
                    validationError.message = `Product with ID ${item.productId} does not exist.`;
                    validationError.status = 400;
                    return next(validationError);
                }
            });
            const discount = req.body;

            discount.createdAt = new Date();
            discount.expiresAt = new Date(discount.expiresAt).toJSON();

            req.discount = discount;
            next();

        },

        update: async (req, res, next) => {
            const { discountId } = req.params;


            const allowedUpdates = ['desc', 'title', 'discount', 'products', 'expiresAt']; // Add other fields if needed
            const updates = Object.keys(req.body);
            const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

            if (!isValidOperation) {
                validationError.message = 'There are values inside req.body that are not allowed or needed.';
                validationError.status = 400;
                return next(validationError);
            }


            const discount = await discountDb.findOne({ _id: discountId });

            if (!discount) {
                validationError.message = 'Discount item does not exist.';
                validationError.status = 400;
                return next(validationError);
            }
            req.newDiscount.modifiedAt = new Date();

            req.oldDiscount = discount;
            req.newDiscount = req.body;


            next();
        },

        many: async (req, res, next) => {

            let discounts = await discountDb.find();

            discounts = discounts.filter(discount => discount.expiresAt > new Date().toJSON());

            req.discounts = discounts;
            next();
        },
    },

    navigation: async (req, res, next) => {
        let navigationItems = await navigationDb.find();

        if (navigationItems.length <= 0) {
            const defaultData = [
                {
                    title: 'Meny',
                    url: '/menu',
                    isAdmin: false
                },
                {
                    title: 'Vårt kaffe',
                    url: '/about',
                    isAdmin: false
                },
                {
                    title: 'Min profil',
                    url: '/profile',
                    isAdmin: false
                },
                {
                    title: 'Orderstatus',
                    url: '/status',
                    isAdmin: false
                }
            ];
            await navigationDb.insert(defaultData);
            navigationItems = defaultData;
        }
        req.navigationItems = navigationItems;
        next();
    },
    about: async (req, res, next) => {
        const textInfo = await aboutDb.findOne({ _id: 'zCGcKgM2UNsUfG6T' });

        if (!textInfo) {
            validationError.message = `Bad credentials: No info available for the AboutPage.`;
            validationError.status = 400;
            return next(validationError);
        }
        req.textInfo = textInfo;
        next();
    }
}

export default validate;
