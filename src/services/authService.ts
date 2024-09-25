import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class AuthService {
    private readonly jwtSecret = process.env.SECRET

    //simulação do banco de dados
    private users = [
        {
            id: 1,
            username: 'user1',
            password: bcrypt.hashSync('password1', 8)
        }
    ]

    //valida usuário e senha
    public validateUser(username: string, password: string) {
        const user = this.users.find(user => user.username === username)
        if (!user) return null

        const validatePassword = bcrypt.compareSync(password, user.password)
        if (!validatePassword) return null
        
        return user;
    }

    //gera o token JWT
    public generateToken(user: { id: number; username: string }) {
        return jwt.sign({ id: user.id, username: user.username }, this.jwtSecret, {
            expiresIn: '12h'
        })
    }

    //verifica o token jwt
    public verifyToken(token: string) {
        try {
            return jwt.verify(token, this.jwtSecret)
        } catch (error) {
            console.error(error)
            return null
        }
    }
}