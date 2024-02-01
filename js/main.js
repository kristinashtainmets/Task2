const app = new Vue({
    el: '#app',
    data: {
        columns: [
            { id: 1, notes: [], maxCards: 3 },
            { id: 2, notes: [], maxCards: 5 },
            { id: 3, notes: [] }
        ],
        newNote: { content: '', items: [] },
        newItem: ''
    },
    methods:{
        addNote(columnId){
            const column = this.columns.find(col => col.id === columnId);
            if(column && (!column.maxCards || column.notes.length < column.maxCards)){
                if(column.notes.length > 0 && column.notes[column.notes.length - 1].items.length < 3){
                    alert('Пожалуйста, добавьте не менее 3 пунктов в текущую заметку перед созданием новой');
                    return;
                }
                column.notes.push({ ...this.newNote, completedAt: null });
                this.newNote = { content: '', items: [] };
            }
        },
        addItem(note){
            if(note.items.length < 5){
                note.items.push({ content: this.newItem, done: false, clicked: false });
                this.newItem = '';
            }
        },
        toggleItem(item, note){
            if(!item.clicked){
                item.done = !item.done;
                item.clicked = true;
            }
            this.checkNoteCompletion(note);
        },
        checkNoteCompletion(note){
            const doneItems = note.items.filter(item => item.done).length;
            if(doneItems > note.items.length / 2){
                const noteIndex = this.columns[0].notes.indexOf(note);
                if(noteIndex > -1){
                    // Создаем копию заметки
                    const noteCopy = JSON.parse(JSON.stringify(note));
                    // Удаляем заметку из первого столбца
                    this.columns[0].notes.splice(noteIndex, 1);
                    // Добавляем копию заметки во второй столбец
                    this.columns[1].notes.push(noteCopy);
                    // Обновляем заметки в каждом столбце, чтобы Vue мог отслеживать изменения
                    this.$set(this.columns[0], 'notes', [...this.columns[0].notes]);
                    this.$set(this.columns[1], 'notes', [...this.columns[1].notes]);
                }
            }
        }
    }
});
