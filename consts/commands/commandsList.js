const Commands = {
    startCommand: {
        command: '/start',
        description: 'Приветственное сообщение\n'
    },
    commandsCommand: {
        command: '/commands',
        description: 'Cписок команд\n'
    },
    NewNoteCommand: {
        command: '/NewNote NoteName Text',
        description: 'Cоздать запись.\n' +
            '!!Обязательно разделение частей этой команды пробелами!!\n' +
            '!!NoteName может содержать только латинские буквы любого регистра, ' +
            'цифры и символ "-"!!\n'
    },
    GetNoteCommand: {
        command: '/GetNote NoteName',
        description: 'Просмотреть существующую запись\n'
    },
    GetAllNamesCommand: {
        command: '/GetAllNames',
        description: 'Просмотреть названия всех существующих записей\n'
    },
    DeleteNoteCommand: {
        command: '/DeleteNote NoteName',
        description: 'Удалить запись\n'
    },
    DeleteAllNotesCommand: {
        command: '/DeleteAllNotes y',
        description: 'Удалить ВСЕ существующие записи\n' +
            '(Требует подтверждение в виде латинского "y")'
    },
}

module.exports = {
    Commands
}
