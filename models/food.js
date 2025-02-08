import mongoose, { Mongoose } from "mongoose";


const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    foodGroup: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        max:999999999,
        min:0
    },
    weight: {
        type: Number,
        required: true,
        max: 9999999,
        min: 0
    }
});

const Food = mongoose.model('Food', foodSchema);
export default Food;