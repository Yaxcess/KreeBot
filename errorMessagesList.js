const Errors = {
    NoteNameExists: 'Запись с таким именем уже существует',
    NoteNotFound: 'Запись с таким именем не найдена',
    NoNotesFound: 'В базе данных нет записей',
    ErrGettingNames: 'Ошибка при получении списка имен записей',
    UnexpErrDeletingAll: 'Ошибка при удалении записей',
    UnexpErrSearching: 'Ошибка при поиске записи',
    UnexpErrCreating: 'Ошибка при записи'
}


module.exports = {
    Errors
}