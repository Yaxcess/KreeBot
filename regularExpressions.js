const Expressions = {
    NewNoteExpr: /^\/NewNote\s+([\w-]+)\s+([\s\S]*)$/,
    GetNoteExpr: /^\/GetNote\s+([\w-]+)$/,
    DeleteNoteExpr: /^\/DeleteNote\s+([\w-]+)$/,
    DeleteAllNotesExpr: /^\/DeleteAllNotes\s+(y)$/
}

module.exports = {
    Expressions
}