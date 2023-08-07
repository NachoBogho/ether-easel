import data from '../data/data.json';

export const getItemById = (id) => {
    return new Promise((resolve, reject) => {
        const item = data.find((element) => element.id === id)

        if (item) {
            resolve(item)

        }else{
            reject({ 
                error: "Any product was not found"
        })
        }
    })

}