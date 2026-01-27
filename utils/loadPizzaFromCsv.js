const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

function loadPizzaFromCsv() {
    return new Promise(async (resolve, reject) => {
        const pizzas = [];
        
        await fs.createReadStream(path.resolve(__dirname, "../data/pizza_data.csv"))
            .pipe(csv())
            .on('data', (row) => {
                // console.log("Row:", row);
                pizzas.push({
                    product_id: row['product_id'],
                    pizza_name: row['pizza_name'],
                    price: row['price'],
                    is_active: row['is_active'].toLowerCase(),
                    description_of_pizza: row["description_of_pizza"],
                    store_id: row['store_id']
                });
            })
            .on('end', () => {
                console.log("Pizzas loaded from CSV");
                // console.log(pizzas);
                resolve(pizzas);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}


module.exports = { loadPizzaFromCsv };  