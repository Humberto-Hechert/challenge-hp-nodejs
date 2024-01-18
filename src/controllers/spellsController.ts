import { Request, Response } from "express"
import SpellsService from "../services/spellsService"

class SpellsController {

    private spellsService: SpellsService;

    constructor (spellsService: SpellsService) {
        this.spellsService = spellsService;
    }

    getSpells = async (req: Request, res: Response) => {

        try {
            const spellsResponse = await this.spellsService.getSpells();
            res.status(200).json(spellsResponse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default SpellsController;