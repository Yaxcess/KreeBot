const Commands = {
    startCommand: {
        command: '/start',
        attributes: '',
        description: 'Приветственное сообщение'
    },
    commandsCommand: {
        command: '/commands',
        attributes: '',
        description: 'Cписок команд'
    },
    NewNoteCommand: {
        command: '/NewNote',
        attributes: 'NoteName Text',
        description: 'Cоздать запись.\n' +
            '!!Обязательно разделение частей этой команды пробелами!!\n' +
            '!!NoteName может содержать только латинские буквы любого регистра,' +
            'цифры и символы "-" и "_"!!'
    },
    GetNoteCommand: {
        command: '/GetNote',
        attributes: 'NoteName',
        description: 'Просмотреть существующую запись'
    },
    GetAllNamesCommand: {
        command: '/GetAllNames',
        attributes: '',
        description: 'Просмотреть названия всех существующих записей'
    },
    DeleteNoteCommand: {
        command: '/DeleteNote',
        attributes: 'NoteName',
        description: 'Удалить запись'
    },
    DeleteAllNotesCommand: {
        command: '/DeleteAllNotes',
        attributes: 'y',
        description: 'Удалить ВСЕ существующие записи ' +
            '(Требует подтверждение в виде латинского "y")'
    },
}

module.exports = {
    Commands
}
