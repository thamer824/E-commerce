const userCtrl = require('../controllers/userCtrl');
const router = require('express').Router();
const auth = require('../midlleware/auth')
 
router.post('/register',userCtrl.register) ;
router.post('/login',userCtrl.login) ;
router.get('/logout',userCtrl.logout) ;
router.get('/refresh_token',userCtrl.refreshToken) ;
router.get('/infor',auth, userCtrl.getUser) ; // awka deja badltha req.userr fl auth bch tzid tefhem   // hedhi l auth tpassi l id mtee l user li heya token ki thotha fl header mbaed l get koulch alik hatetlou id ama enti hastetlou req.user.id edika hiya l id mtaa l user eela hatetlou l header 
router.patch('/addcart',auth,userCtrl.addCart);
router.get('/history',auth,userCtrl.history);

module.exports = router;







