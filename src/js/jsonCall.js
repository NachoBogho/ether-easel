import data from '../data/data.json';


export const jsonCall = async () => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return data;
    } catch (error) {   
        throw new Error('Error en la llamada a JSON: ' + error.message);
    }
};
