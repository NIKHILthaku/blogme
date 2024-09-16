const {Schema,model} = require("mongoose");


const blogschema = new Schema({
    title:{
        type: String,
        required: true,
        
    },
    body:{
        type: String,
        required: true,
    },
    coverimageurl:{
        type: String,
        required: false,
    },
    createdby:{
        type: Schema.Types.ObjectId,
        ref:"users",
    }

},{timestamps:true})

const blog = model("blogkro", blogschema);

module.exports= blog;

