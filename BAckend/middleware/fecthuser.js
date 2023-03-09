var jwt = require('jsonwebtoken');
// creating a tokenn in jwt to add sign in the backoff the token
const JWT_SCERET = "hellouserinapp";

const fecthuser = (req , res , next) =>{
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({error : "Enter a valid user token for authentication"})
    }
    try {
        const data = jwt.verify(token , JWT_SCERET);
        req.user = data.user;
        next(); 
        } catch (error) {
            res.status(401).send({error : "Enter a valid user token for authentication"})
    }
}

module.exports = fecthuser