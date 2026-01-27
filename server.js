const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { loadPizzaFromCsv, pizzas: pizzaProductsDB } = require('./utils/loadPizzaFromCsv');

// Load pizza data from CSV before starting the server
loadPizzaFromCsv()
    .then(() => {
        console.log('Pizza data loaded successfully.');
    })
    .catch((error) => {
        console.error('Error loading pizza data:', error);
    });     


// Define receive Webhook route

app.get('/receive', (req, res) => {
    const clientToken = req.headers['client-token'];
    const query = req.query;
    
    console.log('Received webhook:');
    console.log('Client Token:', clientToken);
    console.log('Query Parameters:', query);
    console.log('Body:', req.body);
    
    if (!clientToken) {
        return res.status(401).json({
            status: 'failure',
            error: 'client-token header is required'
        });
    }
    
    res.status(200).json({
        status: 'success',
        message: 'Webhook received'
    });
});

// Define a simple GET route
app.get('/api/greeting', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

// Define the /api/pizzas endpoint
app.get('/api/pizzas', (req, res) => {
    const { store_id, is_available } = req.query;

    // Mandatory validation
    if (!store_id) {
        return res.status(400).json({
            status: 'failure',
            error: 'store_id is mandatory'
        });
    }

    // Filter pizzas by store_id
    let products = pizzaProductsDB.filter(
        (pizza) => pizza.store_id === store_id
    );

    // Optional filter
    if (is_available !== undefined) {
        const availability = is_available === 'true';
        products = products.filter(
            (pizza) => pizza.is_active === availability
        );
    }

    // Format the response
    products = products.map(pizza => ({
        id: pizza.product_id,
        name: pizza.pizza_name,
        price: pizza.price,
        description: pizza.description_of_pizza
    }))
    
    res.json({
        status: 'success',
        store_id,
        count: products.length,
        products
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
