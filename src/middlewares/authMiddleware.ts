import { Request, Response, NextFunction } from "express";
import AuthService from "../services/authService";

class AuthMiddleware {
    constructor (private authService: AuthService) {}

    //Middleware para verificar o token jwt
    public authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
        const token = req.header("Authorization")?.split(" ")[1]

        if (!token) {
            res.status(403).json({ message: "Token not provided" })
        }

        const validated = this.authService.verifyToken(token)
        if (!validated) {
            res.status(401).json({ message: "Invalid token" })
        }

        (req as any).user = validated
        next()
    }
}

export default AuthMiddleware;