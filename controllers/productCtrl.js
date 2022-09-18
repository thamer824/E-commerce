const Product = require('../models/productModel');

// filter , sort and paginating 

class APIfeatures {

  constructor(queryy,queryString){
    this.queryy = queryy;
    this.queryString = queryString;
  }

  filtering(){
     const queryObj = {...this.queryString};  // queryString = req.query
     // console.log({before: queryObj}); // len ki hatet example page fl postmana tal3et  { id: '63076d0ffa27ff5b38481d1e', page: '2' }
     const excludedFields = ['page','sort','limit'];
     excludedFields.forEach(el=> delete(queryObj[el])); // hedhi manetha ki tekteb fl queryObj page wela sort tne7ihelek
    // console.log({after : queryObj}); // after delete page ayka kenet page 2 wlet { id: '63076d0ffa27ff5b38481d1e' }
       let queryStr = JSON.stringify(queryObj); // hedhi todlek e json object string  queryObj: { id: '63076d0ffa27ff5b38481d1e' } =======>    queryStr: '{"id":"63076d0ffa27ff5b38481d1e"}'
       // console.log({queryObj , queryStr}); 
       queryStr= queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match => '$'+ match)
      // reges mithel thoteha titile= m  taatik ay title fiih m 
       // gte = greater than or equal 
       // lte = lesser than or equal
        // lt = lesser than 
        // gt = greater than

      // console.log({queryStr}); ======>    { queryStr: '{"title":{"$regex":"product"}}' }
       
     this.queryy.find(JSON.parse(queryStr));
       
     return this ; 
  }
  sorting(){
       if(this.queryString.sort){
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.queryy = this.queryy.sort(sortBy);
       }else {
        this.queryy = this.queryy.sort('-createdAt');
       }
       return this ;
    //    var a = "asdasd|dasd|rttewrtert";
    //    var b = a.split('|');
    //    // ["asdasd", "dasd", "rttewrtert"]
    //    var c = b.splice(1);
    //    // ["dasd", "rttewrtert"]
    //    var d = c.join('');
    //    // dasdrttewrtert
  }
  paginating(){
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 9
    const skip = (page - 1) * limit;
     // console.log(skip)
    // Use skip to omit documents from the beginning of the list of returned documents for a read operation.
    this.queryy = this.queryy.limit(limit*1).skip(skip)  // l skip namloha bch neskipiw l previous products
    
    return this;
  }

}




const productCtrl = {

    getProduct : async (req,res)=>{
       
        try {
             //const {page,limit} = req.query; //Product.find().limit(limit*1).skip((page - 1 )* limit) hedhi ki bch trodha paginating lena

            // console.log(req.query); // donc hedhi req.query hiyaa haja par default mel params tamalhaa ch tlawej ala  haja
            const features = new APIfeatures(Product.find(),req.query)
            .filtering().sorting().paginating()
           const products = await features.queryy;
           res.json({
             status: "success",
             result:  products.length,
             products : products

           });

        } catch (error) {
           return res.status(500).json({msg: error.message}); 
        }

    },
    addProduct : async (req,res)=>{
       
        try {
            const {product_id,title,price,description,content,images,category} = req.body;
            if(!images) return res.status(400).json({msg: 'no image uploaded'});
            const product = await Product.findOne({product_id})
            if(product) return res.status(400).json({msg:"product already exists"})
            const neww = new Product({ 
                product_id,title:title.toLowerCase(),price,description,content,images,category
            });
            await neww.save();
            res.json({msg:"created successfully"});
        } catch (error) {
           return res.status(500).json({msg: error.message}); 
        }
  


    },
    deleteProduct : async (req,res)=>{
        try {
           await Product.findByIdAndDelete(req.params.id);
           res.json({msg:"deleted succesfully"})
        } catch (error) {
           return res.status(500).json({msg: error.message}); 
        }
    },
    updateProduct : async (req,res)=>{
       
        try {
            const {product_id,title,price,description,content,images,category} = req.body;
            if(!images) return res.status(400).json({msg: 'no image uploaded'});

            await Product.findByIdAndUpdate({_id:req.params.id},
            
                {product_id,title,price,description,content,images,category}
            
            )

            res.json({msg:"Product updated successfully"})
            
        } catch (error) {
           return res.status(500).json({msg: error.message}); 
        }
  


    },
}
module.exports = productCtrl;