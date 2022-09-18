const router = require("express").Router();
const paymentCtrl = require("../controllers/paymentCtrl")
const auth = require("../midlleware/auth")


router.route('/payment')
.get(auth,paymentCtrl.getPayment)
.post(auth,paymentCtrl.createPayment)


module.exports = router