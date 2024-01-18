import { Request, Response } from "express"
import AlternateNamesService from "../services/alternateNamesService"

class AlternateNamesController {

    private alternateNamesService: AlternateNamesService;

    constructor (alternateNamesService: AlternateNamesService) {
        this.alternateNamesService = alternateNamesService
    }

    getAlternateNames = async (req: Request, res: Response) => {

        try {
            const alternateNames = await this.alternateNamesService.getAlternateNames();
            res.status(200).json(alternateNames)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

export default AlternateNamesController;