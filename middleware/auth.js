const jwt = require('jsonwebtoken');
module.exports= (req,res,next)=>{
    // let headerToken = req.headers;
    //     console.log(headerToken);
    try{
        let token = req.headers.authantication.split(" ")[1];
       let decode = jwt.verify(token, '0123456789');
       req.userData = decode;
        // console.log(token);
        next();
    }
    catch(err){
        res.json({
            msg:"invalid Token",
            err:err
        })
    }
   
}