import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
       
        console.log("token",token)
        if (!token) {
            return res.status(401).json({ message: "Not Allowed: No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded) {
            return res.status(403).json({ message: "Not Allowed: Invalid Token" });
        }

        // Attach the decoded token or user information to the request object if needed
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(403).json({ message: "Not Allowed: Invalid Token" });
    }
};

export default authMiddleware;
