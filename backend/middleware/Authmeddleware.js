const jwt = require("jsonwebtoken");  // ✅ correct

module.exports = function (req,res,next){
    // const authHeaders =req.hearders['authorization'];
    // if(!authHeaders)
    //     {
    //     return res.status(401).json({message:"Auth failed.No token provided"});
    //     }

    //     const token = authHeaders.split('')[1];
    //     if(!token){
    //         return res.status(401).json({message:"Auth failed.Invalid token"})
    //     }

    //     try{
    //         const decoded = jwt.verify(
    //             token,
    //             process.env.JWT_SECRET || "secret123");
    //             req.user = decoded;
    //             next()

    //     }
    //     catch(error){
    //         return res.status(401).json({ message:"Auth failded.Invalid token"});
    //     }
    const authHeaders = req.headers['authorization'];
   // req.headers["authorization"]
    if(!authHeaders){
        return res.status(401).json({message:"Auth failed . no token provided"});
    }
    const token = authHeaders.split('')[1];
    if(!token){
        return res.status(401).json({message:"Auth failded.Invalide token"})
    }
    try{
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "secret123");
            req.user = decoded;
            next()
     }catch(errot){
        return res.status(401).json({message:"Auth failed .invalide token"});
     }


    }
