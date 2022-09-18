const router = require('express').Router();
var cloudinary = require('cloudinary');
const auth = require('../midlleware/auth');
const authAdmin = require('../midlleware/authAdmin');
const fs = require('fs');

// here we upload images on cloudinary 

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_TOKEN, 
    secure: true
  });

 // uploaod image
 router.post('/upload',auth,authAdmin,(req,res)=>{
    try {
        // ======> hadom naamlouhom bch nchoufou fl console ki nsobou file yatl3elna ghadi walee 
         console.log(req.files);
         
         if(!req.files || Object.keys(req.files).length===0){
            
            return res.status(400).json({msg:"no files were uploaded. "})
         }
         const  file = req.files.file; 
         if(file.size > 1024*1024) return res.status(400).json({msg:"file is too large "}) // manetha ken l file  > 1MB
         if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") return res.status(400).json({msg:"format file is incorrect"})
         

         cloudinary.v2.uploader.upload(file.tempFilePath,{folder:"test"}, async(error, result)=>{
            if(error) throw error;
            // remove(file.tempFilePath)  ahaya l faza
            res.json({public_id:result.public_id,url:result.secure_url});

         });


          
    } catch (error) {
        return res.status(500).json({msg: error.message});
        
    }
 })


router.post('/destroy',auth,authAdmin,(req,res)=>{
         
    try {
        const {public_id} =req.body;
    if(!public_id){
         res.status(400).json({msg:"no images seected "})
    }
    cloudinary.v2.uploader.destroy(public_id,async(err,result)=>{
        if(err) throw err;
        res.json({msg:"Deleted Image"})
    })
    } catch (error) {
      return   res.status(500).json({ msg: error.message })
    }
    

})




















///////////// hada ken je l file yetgenerata fi temp folder l fonctio hedi tne7iih mahachtnech biih 
///////////// donc l function taaytelha lfok
// const remove = (path)=>{     
//     fs.unlink(path,err=>{
//         if(err) throw err;
//     })
// }


module.exports = router;
