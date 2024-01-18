import axios from 'axios'
import { Names } from '../interfaces/namesInterface'
import fs from 'fs/promises'

class AlternateNamesService {

    async getAlternateNames() {

        try {
            const api = process.env.API;
            const urlAlternateName = `${api}/characters`;

            const response = await axios.get<Names[]>(urlAlternateName);
            const bothNames = response.data.map((name) => ({
                name: name.name,
                codnomes: name.alternate_names,
            }));

            const csvContent = this.convertToCSV(bothNames);
            const csvFilePath = 'charactersNames.csv';

            await fs.writeFile(csvFilePath, csvContent, 'utf-8') 

            return bothNames;
        } catch (error) {
            console.error('Erro ao enviar nomes', error);
        }
    }

    private convertToCSV(data: any[]) {
        const headers = Object.keys(data[0]).join(',') + '\n';
    
        const rows = data.map((row) => Object.values(row).join(',') + '\n');
    
        return headers + rows.join('');
      }
}

export default AlternateNamesService;