const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const headerToken = req.headers["authorization"];
    console.log(headerToken)

    try{
        
    if(!headerToken){
        return res.status(401).json({errorMessage: "Unauthorised access"})
    }

    const decode = jwt.verify(headerToken, process.env.SECRET_KEY);
    req.userId = decode.userId;
    next();

    }catch(error) {
        console.log(error);
        res.status(500).json({errorMessage: "Invalid token!"})
    }
}

module.exports = verifyToken;