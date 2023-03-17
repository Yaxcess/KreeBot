const mongoose = require('mongoose');
const MongoURL = require('./MongoLink')

mongoose.connect(MongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Определяем схему данных для записи сообщений пользователей
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

// Создаем модель данных на основе схемы
const MessageModel = mongoose.model('Message', MessageSchema);


module.exports = {
    MessageModel
}