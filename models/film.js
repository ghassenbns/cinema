const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const FilmSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  actors :[String],
  seances: [{ 
      date :{
        type: String,
            },
  temps:{
      type : String,
        },
  places:{type:Number}
}],
  
})
module.exports = Film = mongoose.model("Films", FilmSchema);
