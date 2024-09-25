import { Router, Request, Response } from "express"
import SpellsService from "./services/spellsService"
import SpellsController from "./controllers/spellsController"
import CharacterNameService from "./services/characterNameService"
import CharacterNameController from "./controllers/characterNameController"
import AlternateNamesService from "./services/alternateNamesService"
import AlternateNamesController from "./controllers/alternateNamesController"
import AuthService from "./services/authService"
import AuthController from "./controllers/authController"
import AuthMiddleware from "./middlewares/authMiddleware"

const router = Router();

const spellsService = new SpellsService();
const spellsController = new SpellsController(spellsService);
const characterNameService = new CharacterNameService();
const characterNameController = new CharacterNameController(characterNameService);
const alternateNamesService = new AlternateNamesService();
const alternateNamesController = new AlternateNamesController(alternateNamesService);
const authService = new AuthService();
const authController = new AuthController(authService);
const authMiddleware = new AuthMiddleware(authService);

router.get('/ping', (req: Request, res: Response) => {
    res.status(200).send("pong");
});

router.get('/spells', authMiddleware.authenticateToken, spellsController.getSpells);

router.get('/character', authMiddleware.authenticateToken, characterNameController.getCharacter);

router.get('/names', authMiddleware.authenticateToken, alternateNamesController.getAlternateNames);

router.post('/login', authController.login);

export default router;
