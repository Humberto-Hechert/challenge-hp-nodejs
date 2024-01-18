import axios from "axios"

class CharacterNameService {

    async getCharacter(charName: any) {

        try{
            const api = process.env.API;
            const urlCharacters = `${api}/characters`;

            const response = await axios.get(urlCharacters);
            const character = response.data.find((char) => char.name.toLowerCase() === charName.toLowerCase())

            if (!character) {
                return console.error("Personagem não encontrado")
            }

            return character;
        } catch (error) {
            console.error("Erro ao consultar personagem", error);
        }
    }
}

export default CharacterNameService;