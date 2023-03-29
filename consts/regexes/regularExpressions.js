const Expressions = {
    NewNoteExpr: `^$command\\s+([\\w-]+)\\s+([\\s\\S]*)$`,
    GetDeleteNoteExpr: `^$command\\s+([\\w-]+)$`,
    DeleteAllNotesExpr: `^$command\\s+(y)$`
}

module.exports = {
    Expressions
}