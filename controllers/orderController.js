import { orderDb } from '../models/orderModel.js';
import { productDb } from '../models/productModel.js';
export default class OrderController {

    
    getHistoryByUserId = async (req, res) => {
        res.json({
            success: true,
            message: 'Orders found.',
            status: 200,
            orders: req.orders
        })
    };

    getAllHistory = async (req, res) => {
        // console.log(req.discounts)
        res.json({
            success: true,
            message: 'Orders found.',
            status: 200,
            orders: req.orders
        })
    };

    getById = (req, res) => {
        res.json({
            success: true,
            message: 'Order found.',
            status: 200,
            order: req.order
        });
    }

    place = async (req, res) => {
        const { order } = req;

        order.orderPlacedAt = new Date();
        order.orderIsPlaced = true;

        let combinedEstimatedTimeInMinutes = 0;
        for (const item of order.products) {
            combinedEstimatedTimeInMinutes += item.product.estimatedTimeInMinutes * item.amount;
        }

        combinedEstimatedTimeInMinutes = combinedEstimatedTimeInMinutes;
        order.estimatedTimeInMinutes = Math.min(10 + (combinedEstimatedTimeInMinutes), 30);

        await this.update(order);

        return res.status(200)
            .json({
                success: true,
                message: 'Order placed.',
                status: 200,
                order: req.order
            });
    };

    addDiscount = async (req, res) => {
        // console.log(req.discounts);
        const order = await this._handleDiscount(req);
        // console.log('ORDER', order);
        

        await this.update(order);

        return res.status(200)
            .json({
                success: true,
                message: 'Product is added to order. Do not forget to add the "orderId" inside req.body if this is a guest.',
                status: 200,
                order: order

            });        
    }; 

    addProduct = async (req, res) => {
        const { product } = req;
        let { order } = req;
        // console.log(req.discounts);
        

        let { amount } = req.body;
        amount = !amount || amount <= 0 ? 1 : amount;
        const index = order.products.findIndex(item => item.product._id === product._id)
        order.totalPrice += product.price * amount;



        if (index === -1) {
            order.products.unshift({
                product: product,
                amount: amount
            });
        }
        else {
            order.products[index].amount += amount;
        }
        order = await this._handleDiscount(req);
        await this.update(order);

        return res.status(200)
            .json({
                success: true,
                message: 'Product is added to order. Do not forget to add the "orderId" inside req.body if this is a guest.',
                status: 200,
                order: order,
                addedProduct: product
            });
    };

    removeProduct = async (req, res) => {
        let { order, product } = req;

        let { amount } = req.body;

        const index = order.products.findIndex(item => item.product._id === product._id)
        amount = Math.min(Math.max(amount, 1), order.products[index].amount)
        order.totalPrice -= product.price * amount; //Korrigerar priset

        if (order.products[index].amount <= amount) {
            order.products.splice(index, 1); //Tar bort produkten om det inte finns några fler varor kvar av den.
            if(order.products.length === 0){
                await orderDb.removeOne({orderId: order.orderId});

                return res.status(200)
                .json({
                    success: true,
                    message: 'product removed from order, and deleted order because it is now empty.',
                    status: 200,
                    order: order,
                    removedProduct: product
                });
            }

        }
        else {
            order.products[index].amount -= amount; //Tar bort mängden varor från korgen.
        }
        order = await this._handleDiscount(req);

        await this.update(order);


        res.status(200)
            .json({
                success: true,
                message: 'product removed from order.',
                status: 200,
                order: order,
                removedProduct: product
            });
    };

    getEstimatedTimeLeft = async (req, res) => {
        const { order } = req;
        const now = new Date();
        const orderPlacedAt = new Date(order.orderPlacedAt); //Detta görs för att få en riktig Date variabel att använda när man placerade ordern.
        const elapsedTime = (now - orderPlacedAt);
        let remainingTime = (order.estimatedTimeInMinutes * 60000) - elapsedTime; // Återstående tid i millisekunder

        // Om återstående tid är negativ, sätt den till noll
        if (remainingTime < 0) {
            return res.json({
                success: true,
                message: 'Kaffet ska ha levererats nu, enligt vårt supersäkra system! Coolt va?',
                status: 200,
            });
        }

        // Omvandla återstående tid till minuter och sekunder
        const minutes = Math.floor(remainingTime / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        res.json({
            success: true,
            message: `Uppskattad återstående tid: ${minutes} minuter och ${seconds} sekunder.`,
            time: {
                minutes: minutes,
                seconds: seconds
            },
            status: 200,
        });
    };

    async _handleDiscount (req) {
        const { order, discounts, discount } = req;
        if(discount){
            order.discounts.unshift(discount);

            for(const product of discount.products){
                let { productId, amount } = product;
                amount = !amount || amount <= 0 ? 1 : amount;
    
                const newProduct = await productDb.findOne({_id: productId});
    
                const index = order.products.findIndex(item => item.product._id === productId)
                if (index === -1) {
                    
                    order.products.unshift({
                        product: newProduct,
                        amount: amount
                    });
                }
                else {
                    order.products[index].amount += amount;
                }
                // console.log('NEW PRODUCT', newProduct);
                order.totalPrice += newProduct.price * amount;
    
            }
            return order;
        }
        const orderedProducts = structuredClone(order.products);
        if(order.discounts.length >0){
            const possibleIndexesOfUnusableDiscounts = [];
            order.discounts.forEach(discount => {
                discount.products.forEach((product, i )=> {
                    const index = orderedProducts.findIndex(item => item.product._id === product.productId && item.amount >= product.amount );
                    if(index === -1){ //Det har alltså försvunnit från ordern som gör att kampanjerbjudandet inte kan gälla, därav får vi ta bort den. 
                        possibleIndexesOfUnusableDiscounts.push(i);
                    }
                    else{
                        if (orderedProducts[index].amount - product.amount === 0) {
                            orderedProducts.splice(index, 1); //Tar bort produkten i kopian om det inte finns några fler varor kvar av den.
                        }
                        else {
                            orderedProducts[index].amount -= product.amount;
                        }
                    }

                });
            });         
            if(possibleIndexesOfUnusableDiscounts.length >0){
                possibleIndexesOfUnusableDiscounts.forEach(i => {
                    order.discounts.splice(i, 1);
                })
            }
        }
        for(const discount of discounts){
           
            let isEligableForDiscount = true;

            let discountIndexesInsideOrderedProducts = [];

            discount.products.forEach((product) => {
                const index = orderedProducts.findIndex(item => item.product._id === product.productId && item.amount >= product.amount)
                if( index === -1){
                    isEligableForDiscount = false;
                }
                else{
                    discountIndexesInsideOrderedProducts.push({index: index, amount: product.amount});
                }
            });
            if(isEligableForDiscount){
                discountIndexesInsideOrderedProducts.forEach(item => {
                    console.log('HÄR ÄR JAG', item.index);
                    
                    
                    if (orderedProducts[item.index].amount - item.amount === 0) {
                        orderedProducts.splice(item.index, 1); //Tar bort produkten i kopian om det inte finns några fler varor kvar av den.
                    }
                    else {
                        orderedProducts[item.index].amount -= item.amount;
                    }
                });
                order.discounts.push(discount);
                order.totalDiscount += discount.discount;
            }

        }
        return order;


        

    };

    async update(order) {
        try {
            const orderExists = await orderDb.findOne({ orderId: order.orderId });
            order.totalDiscount = 0;
            if (orderExists && orderExists !== null) {
                for(const discount of order.discounts){
                    order.totalDiscount += discount.discount;
                }
                await orderDb.update(
                    { _id: order._id },
                    {
                        $set: order
                    }
                );
            } else {
                await orderDb.insert(order);
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    }
}


