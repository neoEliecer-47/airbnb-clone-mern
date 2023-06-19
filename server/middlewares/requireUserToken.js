import JWT from 'jsonwebtoken'

export const requireUserToken = (req, res, next) => {
    try {
        
        const {token} = req?.cookies

        if(token){
            const {uid} = JWT.verify(token, process.env.JWT_SECRET)//facil desestructuamos aqui, por el verify, asi como podriamos retornarlo en un callback funtion, como segundo parametro
            req.uid = uid
            next()
        }else{
            res.json(null)
        }

    } catch (error) {
        return res.status(401).json(error.message)
    }
}