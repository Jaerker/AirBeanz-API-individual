import { Router } from 'express';

import validateMiddleware from '../middleware/validation.js';
import authMiddleware from '../middleware/authentication.js';

import ProductController from './../controllers/productController.js';

const router = Router();

const controller = new ProductController();

router.get('/', 
    validateMiddleware.products.many, 
    controller.getAll);

router.post('/',
    authMiddleware.checkUserStrict, 
    validateMiddleware.users.isAdmin,
    validateMiddleware.products.new, 
    controller.add);

router.put('/:productId', 
    authMiddleware.checkUserStrict, 
    validateMiddleware.users.isAdmin,
    validateMiddleware.products.one,
    validateMiddleware.products.update,
    controller.update);

router.get('/:productId', 
    validateMiddleware.products.one, 
    controller.get);

router.delete('/:productId', 
    authMiddleware.checkUserStrict, 
    validateMiddleware.users.isAdmin,
    validateMiddleware.products.one, 
    controller.remove);



export default router;

