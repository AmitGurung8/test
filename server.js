import express from 'express';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';


import foodsController from './controllers/foods.js';


const app = express();

app.use(bodyParser.json());


const docOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Food API',
            version: '1.0.0'
        }
    },
    apis: ['./controllers/*.js'] 
};

const openapiSpecification = swaggerJSDoc(docOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


mongoose.connect("mongodb://localhost:27017/Foods/food", {})
.then((res) => console.log('The connection to MongoDB was successful'))
.catch((err) => console.log(`The connectionwas a failure - Sooo Over: ${err}`));


app.use('/api/v1/foods', foodsController);

app.listen(3000, () => {
    console.log('Express API running on port 3000');
});