const Commands = {
startCommand:
    '/start - приветственное сообщение\n',
commandsCommand: '/commands - список команд\n',
NewNoteCommand:
    '/NewNote NoteName Text - создать запись.\n' +
    '!!Обязательно разделение частей этой команды пробелами!!\n' +
    '!!NoteName может содержать только латинские буквы любого регистра, ' +
    'цифры и символ "-"!!\n',
GetNoteCommand:
    '/GetNote NoteName - просмотреть существующую запись\n',
GetAllNamesCommand:
    '/GetAllNames - просмотреть названия всех существующих записей\n',
DeleteNoteCommand:
    '/DeleteNote NoteName - удалить запись\n',
DeleteAllNotesCommand:
    '/DeleteAllNotes y - удалить ВСЕ существующие записи\n' +
    '(Требует подтверждение в виде латинского "y")'
}

module.exports = {
    Commands
}
