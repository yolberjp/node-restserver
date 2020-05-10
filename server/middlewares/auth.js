const jwt = require('jsonwebtoken');

// Verificar token

let tokenVerify = (req, res, next)=>{

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded)=>{

        if(err){
            return res.status(401).json({
                ok:false,
                err: {
                    message: "Invalid token"
                }
            })
        }

        req.user = decoded.user;
        next();

    })

}

let adminRoleVerify = (req, res, next)=>{

    let role = req.user.role;

    if(role != 'ADMIN_ROLE'){
        return res.status(403).json({
            ok:false,
            err:{
                message: "Acceso denegado"
            }

        })
    }

    next();

}



module.exports = {
    tokenVerify,
    adminRoleVerify
}