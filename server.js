import express from 'express';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import foodsController from './controllers/foods.js';

dotenv.config();
const app = express();

app.use(bodyParser.json());


const docOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Food API WITH SWAGGER",
            version: "1.0.0",
            description: "This API allows users to explore a variety of food items, their ingredients, nutritional information, and availability. It provides endpoints to fetch food categories, search for specific dishes, and retrieve detailed food descriptions. Ideal for food enthusiasts, restaurants, and meal planners looking for organized food data.",
        }
        
    },
    apis: ['./controllers/*.js'] 
};

const openapiSpecification = swaggerJSDoc(docOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


mongoose.connect(process.env.DB, {})
.then((res) => console.log('The connection to MongoDB was successful'))
.catch((err) => console.log(`The connectionwas a failure - Sooo Over: ${err}`));


app.use('/api/v1/foods', foodsController);

app.listen(3000, () => {
    console.log('Express API running on port 3000');
});