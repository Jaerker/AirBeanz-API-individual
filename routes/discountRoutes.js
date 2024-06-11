import { Router } from 'express';

import validateMiddleware from '../middleware/validation.js';
import DiscountController from '../controllers/discountController.js';
import authMiddleware from '../middleware/authentication.js';

const router = Router();
const controller = new DiscountController();

router.get('/' , controller.getAll);

router.post('/',
    authMiddleware.checkUserStrict,
    validateMiddleware.users.isAdmin,
    validateMiddleware.discounts.new, 
    controller.add);

router.put('/:discountId', 
    authMiddleware.checkUserStrict,
    validateMiddleware.users.isAdmin,
    validateMiddleware.discounts.update,
    controller.update);

router.delete('/:discountId',
    authMiddleware.checkUserStrict,
    validateMiddleware.users.isAdmin,
    validateMiddleware.discounts.one,
    controller.remove);

router.delete('/', 
    authMiddleware.checkUserStrict,
    validateMiddleware.users.isAdmin,
    controller.clear);

export default router;