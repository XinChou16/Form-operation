/**
 * 用户schema表结构
 */
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: String,
    sex: String,
    age: Number,
    school: String
});

module.exports = userSchema;
