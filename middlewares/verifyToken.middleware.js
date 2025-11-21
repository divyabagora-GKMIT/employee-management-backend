const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];

            if (!token) {
                return res.status(403).json({ success: false, message: "Authorization denied: No token provided" });
            }

            const decodedData = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedData;
            next();
        }
        else {
            return res.status(401).json({ success: false, message: "Authorization denied: Header missing or incorrect format" });
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: "Token is not valid or has expired" });
    }
}

module.exports = verifyToken;