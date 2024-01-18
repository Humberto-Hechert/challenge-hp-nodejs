import axios from 'axios'
import { Spell } from '../interfaces/spellInterface'
import translate from 'translate-google'

class SpellsService {

    async getSpells() {

        try {
            const api = process.env.API;
            const urlSpells = `${api}/spells`;

            const response = await axios.get(urlSpells);
            const spells: Spell[] = response.data; 
            const translatedSpells = await Promise.all(
                spells.map(async (spell) => {
                    const translation = await translate(spell.description, { to: 'pt' });
                    return {
                        name: spell.name,
                        description: translation
                    }
                })
            )

            return translatedSpells;

        } catch (error) {
            console.error("Erro ao consultar feitiços", error);
        }
    }
}

export default SpellsService;