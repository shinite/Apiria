var mongoose=require("mongoose");
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
  employeeId:{
    type:String,
    required: true,
    unique: true
  },
  name: {
    type:String,
    required: true
  },
  location: String,
  role: String
});

module.exports = mongoose.model('employee',employeeSchema);
