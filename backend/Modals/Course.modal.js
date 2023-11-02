import mongoose, { Schema } from "mongoose";


const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lecture1: {
        type: String,
        required: true
    },
    lecture2: {
        type: String,
        required: true
    },
    lecture3: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

export default mongoose.model("Course", courseSchema)