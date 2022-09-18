const User = require('../models/userModel');

const authAdmin = async(req,res,next)=>{

    try {
        // get user information by id 
        const user = await User.findOne({
            _id: req.userr.id
        })
        if(user.role=== 0){
            return res.status(400).json({msg:"Admin ressources Access denied"});
        }
        next();
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }

}


module.exports = authAdmin ; 
