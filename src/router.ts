import { Router, Request, Response } from "express"
import SpellsService from "./services/spellsService"
import SpellsController from "./controllers/spellsController"
import CharacterNameService from "./services/characterNameService"
import CharacterNameController from "./controllers/characterNameController"
import AlternateNamesService from "./services/alternateNamesService"
import AlternateNamesController from "./controllers/alternateNamesController"

const router = Router();

const spellsService = new SpellsService();
const spellsController = new SpellsController(spellsService);
const characterNameService = new CharacterNameService();
const characterNameController = new CharacterNameController(characterNameService);
const alternateNamesService = new AlternateNamesService();
const alternateNamesController = new AlternateNamesController(alternateNamesService);

router.get('/ping', (req: Request, res: Response) => {
    res.status(200).send("pong");
});

router.get('/spells', spellsController.getSpells);

router.get('/character', characterNameController.getCharacter);

router.get('/names', alternateNamesController.getAlternateNames);

export default router;
