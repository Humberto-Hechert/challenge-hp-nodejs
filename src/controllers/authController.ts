import { Request, Response } from "express";
import AuthService from "../services/authService";

class AuthController {
    constructor(private authService: AuthService) {}

    //método para realizar login
    public login = (req: Request, res: Response): void => {

        try{ 

            const { username, password } = req.body

            if (!username || !password) {
                res.status(400).json({ message: "Username and password are required" })
            }

            const user = this.authService.validateUser(username, password)
            if (!user) {
                res.status(400).json({ message: "Invalid credentials" })
            }

            const token = this.authService.generateToken(user)
            res.status(200).json({ data: {
                token: token
            } })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default AuthController;