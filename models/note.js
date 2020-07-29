const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    body:{
        type:String,
        required:true,
        trim:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdDate:{
        type:String,
        default:''
    },
    editedTime:{
        type:String,
        default:'Not edited'
    },
    noteID:{
        type:String,
        required:true
    }
})
const Note = mongoose.model('Note', NoteSchema);
module.exports = Note