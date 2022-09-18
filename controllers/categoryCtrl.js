
const { reset } = require("nodemon");
const Category = require("../models/categories");
const Products = require("../models/productModel");
const categoryCtrl = {

    getCategories: async (req, res) => {
        try {
            const category = await Category.find();
            res.json(category);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }

    },

    createCategories: async (req, res) => {
        try {
            // if user have role ===1
            // only admin can create , delete and update category
            const { name } = req.body;
            const category = await Category.findOne({ name });
            if (category) return res.status(400).json({ msg: "category already exists" });
            const newCategory = new Category({ name });

            await newCategory.save();
            res.json({ msg: "category created successfully" });


        } catch (error) {
            return res.status(500).json({ message: error.message })

        }
    },

    deleteCategory: async (req, res) => {

        try {
            
            await Category.findByIdAndDelete(req.params.id);
            res.json({ msg: "category deleted successfully" });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }



    },
    updateCategory: async (req, res) => {
        try {

            const {name} = req.body;
            await Category.findByIdAndUpdate({ _id: req.params.id },{name});  // lena li dakhlou baed k id hoa eli bch tupdaytiih
            res.json({ msg: "category updates successfully" });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }



    }

}
module.exports = categoryCtrl; 