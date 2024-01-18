import { Request, Response } from "express"
import CharacterNameService from "../services/characterNameService"

class CharacterNameController {

    private characterNameService: CharacterNameService;

    constructor (characterNameService: CharacterNameService) {
        this.characterNameService = characterNameService;
    }

    getCharacter = async (req: Request, res: Response) => {

        try {
            const charName = req.body.name
            const characterResponse = await this.characterNameService.getCharacter(charName);
            res.status(200).json(characterResponse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default CharacterNameController;