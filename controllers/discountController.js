import { discountDb } from '../models/discountModel.js';

export default class DiscountController {

    getAll = async (req, res) => {
        let data = await discountDb.find();
        const {query} = req;

        if(query.active){
            data = data.filter(item => new Date(item.expiresAt) - new Date() >=0)
        }
        
        res.status(200).json({
            success: true,
            message: 'Discounts found.',
            status: 200,
            filterOptions: query,
            discounts: data
        });
    };

    add = async (req, res) => {

        await discountDb.insert(req.discount);
        
        res.status(200).json({
            success: true,
            message: 'Discount added successfully.',
            status: 200,
            discount: req.discount
        });
    };

    update = async (req, res) => {
        const {oldDiscount, newDiscount} = req;
        await discountDb.update({_id: oldDiscount._id}, {$set: newDiscount}, {upsert:true})

        const data = await discountDb.findOne({_id: oldDiscount._id});

        res.status(200).json({
            success: true,
            message: 'Discount updated successfully.',
            status: 200,
            updatedDiscount: data
        });
    };

    remove = async (req, res) => {
        await discountDb.removeOne({_id: req.discount._id});

        res.status(200).json({
            success: true,
            message: 'Discount removed successfully.',
            status: 200,
            removedDiscount: req.discount
        });
    };

    clear = async (req, res) => {
        await discountDb.removeMany({}, {multi:true});

        res.status(200).json({
            success: true,
            message: 'Discounts removed successfully.',
            status: 200
        });
    };

}

