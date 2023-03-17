const mongoose = require('mongoose');
const MongoURL = require('./MongoLink')

mongoose.connect(MongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const MessageSchema = new mongoose.Schema({
  chatId: {
    type: Number,
    required: true,
  },
  noteName: {
    type: String,
    required: true,
    unique: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const MessageModel = mongoose.model('Message', MessageSchema);


module.exports = {
    MessageModel
}