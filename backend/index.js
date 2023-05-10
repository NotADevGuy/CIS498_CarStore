// System dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Models for MongoDB connection
const User = require('./src/models/user_model');
const Car = require('./src/models/car_model');

// MongoDB connection
const db = require('./src/models/db_info');

db.mongoose.connect(
    db.url, {useNewUrlParser:true, useUnifiedTopology:true}
)
    .then( () => {console.log("Database Connected.")})
    .catch( () => {process.exit()})

// Create express app
const app = express();
const corsOptions = {origin:"http://localhost:3000"};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Import API routes, and mount them.
const userRoutes = require('./src/services/user_service');
const carRoutes = require('./src/services/car_service');
app.use('/api/user', userRoutes);
app.use('/api/car', carRoutes);

// Start the server
const port = 8080 || process.env.PORT;
app.listen(port, () => {console.log(`Server running on port ${port}`)});
