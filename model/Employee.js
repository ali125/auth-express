// Writing model name in firstCapital letter
// is most standard that is using by people

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
});

// name should be singular not plural
// Mongoose automatically looks for the plural, lowercased version of your model name
module.exports = mongoose.model('Employee', employeeSchema);
