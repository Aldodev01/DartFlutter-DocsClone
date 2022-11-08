const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token')
        if(!token) 
            return res.status(401).json({msg : 'Tidak ada auth token, Akses ditolak'})
        
        const verified = jwt.verify(token, 'passwordKey')
        if(!verified)
            return res.status(401).json({msg: "Token verifikasi gagal, authorisasi ditolak"})

        req.user = verified.id
        req.token = token
        next()
    } catch (error) {   
        res.status(500).json({error : error.message})
    }
}

module.exports = auth