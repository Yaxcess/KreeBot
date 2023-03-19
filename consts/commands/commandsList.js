const Commands = {
    startCommand: {
        command: '/start',
        description: 'Приветственное сообщение'
    },
    commandsCommand: {
        command: '/commands',
        description: 'Cписок команд'
    },
    NewNoteCommand: {
        command: '/NewNote NoteName Text',
        description: 'Cоздать запись.\n' +
            '!!Обязательно разделение частей этой команды пробелами!!\n' +
            '!!NoteName может содержать только латинские буквы любого регистра,' +
            'цифры и символ "-"!!'
    },
    GetNoteCommand: {
        command: '/GetNote NoteName',
        description: 'Просмотреть существующую запись'
    },
    GetAllNamesCommand: {
        command: '/GetAllNames',
        description: 'Просмотреть названия всех существующих записей'
    },
    DeleteNoteCommand: {
        command: '/DeleteNote NoteName',
        description: 'Удалить запись'
    },
    DeleteAllNotesCommand: {
        command: '/DeleteAllNotes y',
        description: 'Удалить ВСЕ существующие записи ' +
            '(Требует подтверждение в виде латинского "y")'
    },
}

module.exports = {
    Commands
}
