const router = require('express').Router();
const categoryCtrl = require('../controllers/categoryCtrl')
const authAdmin = require('../midlleware/authAdmin');
const auth = require('../midlleware/auth');
const { route } = require('./userRoute');

router.route('/category')
    .get(categoryCtrl.getCategories)
    .post(auth, authAdmin , categoryCtrl.createCategories)

router.route('/category/:id')
 .delete(auth,authAdmin,categoryCtrl.deleteCategory)
 .put(auth,authAdmin,categoryCtrl.updateCategory)

module.exports = router ; 