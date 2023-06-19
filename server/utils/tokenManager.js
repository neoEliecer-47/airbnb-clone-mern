import JWT from 'jsonwebtoken'

export const generateToken = (uid) => {
    
    const expiresIn = 60 * 30 * 3
    
    try {
    
        const token = JWT.sign({uid}, process.env.JWT_SECRET, {expiresIn})
        return {token, expiresIn}

    } catch (error) {
        console.log('error de token: '+error)
    }
}

