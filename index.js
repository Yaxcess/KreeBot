const TelegramBot = require('node-telegram-bot-api');
const Token = require('./t').Token;
const MessageModel = require('./MongoDBConnect').MessageModel;
const { Expressions } = require('./regularExpressions');
const { Commands } = require('./commandsList');
const { Errors } = require('./errorMessagesList');
const { Success } = require('./successMessagesList');

function startBot() {
  const bot = new TelegramBot(Token, { polling: true });

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if (text === '/start') {
      bot.sendMessage(chatId, Success.StartMessage);
    }
    //commands and parameters
    if (text === '/commands') {
      bot.sendMessage(chatId, Commands.startCommand +
        Commands.commandsCommand + Commands.NewNoteCommand +
        Commands.GetNoteCommand + Commands.GetAllNamesCommand +
        Commands.DeleteNoteCommand + Commands.DeleteAllNotesCommand)
    }
    //create
    const newNoteRegex = Expressions.NewNoteExpr;
    const newNoteMatches = text.match(newNoteRegex);

    if (newNoteMatches) {
      const noteName = newNoteMatches[1];
      const userMessage = newNoteMatches[2];

      try {
        const existingMessage = await MessageModel.findOne({ noteName });
        if (existingMessage) {
          bot.sendMessage(chatId, Errors.NoteNameExists);
          return;
        }

        const message = new MessageModel({
          chatId,
          noteName,
          text: userMessage,
        });
        await message.save();
        bot.sendMessage(chatId, Success.SuccessfulSave);
      } catch (error) {
        bot.sendMessage(chatId, Errors.UnexpErrCreating);
      }
    };
    //get
    const getNoteRegex = Expressions.GetNoteExpr;
    const getNoteMatches = text.match(getNoteRegex);

    if (getNoteMatches) {
      const noteName = getNoteMatches[1];

      try {
        const message = await MessageModel.findOne({ noteName });
        if (message) {
          bot.sendMessage(chatId, message.text);
        } else {
          bot.sendMessage(chatId, Errors.NoteNotFound);
        }
      } catch (error) {
        bot.sendMessage(chatId, Errors.UnexpErrSearching);
      }
    };
    //delete
    const deleteNoteRegex = Expressions.DeleteNoteExpr;
    const deleteNoteMatches = text.match(deleteNoteRegex);

    if (deleteNoteMatches) {
      const noteName = deleteNoteMatches[1];

      try {
        const result = await MessageModel.deleteOne({ noteName });
        if (result.deletedCount > 0) {
          bot.sendMessage(chatId,
            Success.SuccessfulDeletionOne.replace("$text", noteName));
        } else {
          bot.sendMessage(chatId, Errors.NoteNotFound);
        }
      } catch (error) {
        bot.sendMessage(chatId, Errors.UnexpErrSearching);
      }
    };
    //deleteAll
    const deleteAllNotesRegex = Expressions.DeleteAllNotesExpr;
    const deleteAllNotesMatches = text.match(deleteAllNotesRegex);

    if (deleteAllNotesMatches) {
      const confirmDelete = deleteAllNotesMatches[1];

      if (confirmDelete === 'y') {
        try {
          const result = await MessageModel.deleteMany({});
          bot.sendMessage(chatId,
            Success.SuccessfulDeletionAll.replace("$text",
              result.deletedCount));
        } catch (error) {
          bot.sendMessage(chatId, Errors.UnexpErrDeletingAll);
        }
      }
    };
    if (text === '/GetAllNames') {
      try {
        const messages = await MessageModel.find({}, 'noteName');
        if (messages.length > 0) {
          const messageNames = messages.map((message) =>
            message.noteName).join(', ');
          bot.sendMessage(chatId,
            Success.AllNamesGettingSuccess + messageNames);
        } else {
          bot.sendMessage(chatId, Errors.NoNotesFound);
        }
      } catch (error) {
        bot.sendMessage(chatId, Errors.UnexpErrSearching);
      }
    }
  });
};

startBot();