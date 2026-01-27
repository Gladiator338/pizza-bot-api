const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { loadPizzaFromCsv } = require('./utils/loadPizzaFromCsv');
const { handleRequest } = require('./utils/signatureVerification');

app.use(express.json());

/* ============================
   In-memory DB + Indexes
============================ */

let pizzaCache = [];
let storeIndex = {}; // { store_id: [pizzas...] }

/* ============================
   Init Loader
============================ */

async function initData() {
    try {
        pizzaCache = await loadPizzaFromCsv();

        // Build store index (O(1) lookups)
        storeIndex = {};
        for (const pizza of pizzaCache) {
            if (!storeIndex[pizza.store_id]) {
                storeIndex[pizza.store_id] = [];
            }
            storeIndex[pizza.store_id].push(pizza);
        }

        console.log("🚀 Pizza DB initialized");
        console.log("Stores indexed:", Object.keys(storeIndex).length);
    } catch (err) {
        console.error("🔥 Failed to initialize data:", err);
        process.exit(1); // fail fast
    }
}

initData();

/* ============================
   Health Check
============================ */

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        pizzas_loaded: pizzaCache.length,
        stores: Object.keys(storeIndex).length,
        uptime: process.uptime()
    });
});

/* ============================
   Webhook Receiver
============================ */

app.post('/receive', (req, res) => {

    handleRequest(req).then(response => {
        const isValid = response.ok;
        if (!isValid) {
            console.log("❌ Invalid signature");

            return res.status(401).json({
                status: 'failure',
                error: 'Invalid signature'
            });
        }

        console.log("✅ Signature verified");

        // Further processing can be done here

        res.status(200).json({
            status: 'success',
            message: 'Webhook received and verified'
        });
    }).catch(err => {
        console.error("🔥 Error during signature verification:", err);
        res.status(500).json({
            status: 'failure',
            error: 'Internal server error'
        });
    });
});

/* ============================
   Client Token Protected Route
============================ */

app.post('/protected-webhook', (req, res) => {

    const clientToken = req.headers['client-token'];

    if (!clientToken) {
        console.log("❌ Missing client-token header");

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


/* ============================
   API Routes
============================ */

app.get('/api/greeting', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

/*
   GET /api/pizzas?store_id=123&is_available=true
*/
app.get('/api/pizzas', (req, res) => {
    const { store_id, is_available } = req.query;

    /* ---------- Validation ---------- */
    if (!store_id) {
        return res.status(400).json({
            status: 'failure',
            error: 'store_id is mandatory'
        });
    }

    /* ---------- Data Fetch ---------- */
    let products = storeIndex[store_id];

    if (!products) {
        return res.json({
            status: 'success',
            store_id,
            count: 0,
            products: []
        });
    }

    /* ---------- Filters ---------- */
    if (typeof is_available === 'string') {
        const availability = is_available.toLowerCase();
        if (availability === 'true' || availability === 'false') {
            products = products.filter(
                (pizza) => pizza.is_active === availability
            );
        }
    }

    /* ---------- Response Mapping ---------- */
    const response = products.map(pizza => ({
        id: pizza.product_id,
        name: pizza.pizza_name,
        price: pizza.price,
        description: pizza.description_of_pizza,
        is_active: pizza.is_active,
        store_id: pizza.store_id
    }));

    res.json({
        status: 'success',
        store_id,
        count: response.length,
        products: response
    });
});

/* ============================
   Server Start
============================ */

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
