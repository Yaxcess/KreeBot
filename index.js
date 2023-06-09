const TelegramBot = require('node-telegram-bot-api');
const Token = require('./t').Token;
const MessageModel = require('./MongoDBConnect').MessageModel;
const { Expressions } = require('./consts/regexes/regularExpressions');
const { Commands } = require('./consts/commands/commandsList');
const { Errors } = require('./consts/messages/errorMessagesList');
const { Success } = require('./consts/messages/successMessagesList');

function startBot() {
  const bot = new TelegramBot(Token, { polling: true });

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    //start
    if (text === Commands.startCommand.command) {
      bot.sendMessage(chatId, Success.StartMessage);
    }
    //commands and parameters
    if (text === Commands.commandsCommand.command) {
      let message = Success.CommandsList;
      for (const command in Commands) {
        message += Commands[command].command + ' ' +
          Commands[command].attributes +
          ' - ' + Commands[command].description + '\n';
      }
      bot.sendMessage(chatId, message)
    }
    //create
    const newNoteRegex = Expressions.NewNoteExpr.replace('$command',
      Commands.NewNoteCommand.command);
    const newNoteMatches = text.match(newNoteRegex);

    if (newNoteMatches) {
      const noteName = newNoteMatches[1];
      const userMessage = newNoteMatches[2];

      try {
        const existingMessage = await MessageModel.findOne({ chatId, noteName });
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
    const getNoteRegex = Expressions.GetDeleteNoteExpr.replace('$command',
      Commands.GetNoteCommand.command);
    const getNoteMatches = text.match(getNoteRegex);

    if (getNoteMatches) {
      const noteName = getNoteMatches[1];

      try {
        const message = await MessageModel.find({ chatId, noteName });
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
    const deleteNoteRegex = Expressions.GetDeleteNoteExpr.replace('$command',
      Commands.DeleteNoteCommand.command);
    const deleteNoteMatches = text.match(deleteNoteRegex);

    if (deleteNoteMatches) {
      const noteName = deleteNoteMatches[1];

      try {
        const result = await MessageModel.deleteOne({ chatId, noteName });
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
    const deleteAllNotesRegex = Expressions.DeleteAllNotesExpr.replace('$command',
      Commands.DeleteAllNotesCommand.command);
    const deleteAllNotesMatches = text.match(deleteAllNotesRegex);

    if (deleteAllNotesMatches) {
      const confirmDelete = deleteAllNotesMatches[1];

      if (confirmDelete === 'y') {
        try {
          const result = await MessageModel.deleteMany({ chatId });
          bot.sendMessage(chatId,
            Success.SuccessfulDeletionAll.replace("$text",
              result.deletedCount));
        } catch (error) {
          bot.sendMessage(chatId, Errors.UnexpErrDeletingAll);
        }
      }
    };
    //getNames
    if (text === Commands.GetAllNamesCommand.command) {
      try {
        const messages = await MessageModel.find({ chatId }, 'noteName');
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