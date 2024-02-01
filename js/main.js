new Vue({
    el: '#app',
    data() {
        return {
            column1: JSON.parse(localStorage.getItem('column1')) || [],
            column2: JSON.parse(localStorage.getItem('column2')) || [],
            column3: JSON.parse(localStorage.getItem('column3')) || [],
            newCardTitle: '',
            newItemText: [''], 
        }
    },
    methods: {
        handleCardPosition(card) {
            const totalItems = card.items.length;
            const completedItems = card.items.filter(item => item.completed).length;

            if (completedItems / totalItems > 0.5 && this.column1.includes(card)) {
                this.column1.splice(this.column1.indexOf(card), 1);
                this.column2.push(card);
            } else if (completedItems / totalItems === 1 && this.column2.includes(card)) {
                this.column2.splice(this.column2.indexOf(card), 1);
                this.column3.push(card);
                card.completedDate = new Date().toLocaleString(); 
            }
            this.saveData();
        },
        addCard() {
            if (this.newCardTitle !== '' && this.column1.length < 3) {
                const newCard = {
                    id: Date.now(),
                    title: this.newCardTitle,
                    items: this.newItemText.filter(item => item.trim() !== '').map(item => ({ text: item, completed: false }))
                };
                if (newCard.items.length < 3) {
                    alert("Пожалуйста, добавьте не менее 3-х пунктов!");
                } else if (this.newCardTitle !== '' && newCard.items.length >= 3 && newCard.items.length <= 5) {
                    this.column1.push(newCard);
                    this.handleCardPosition(newCard);
                    this.newCardTitle = '';
                    this.newItemText = [''];
                } else {
                    alert("Не более 5 пунктов, не наглеем");
                }
            }
            this.saveData();
        },
        saveData() {
            localStorage.setItem('column1', JSON.stringify(this.column1));
            localStorage.setItem('column2', JSON.stringify(this.column2));
            localStorage.setItem('column3', JSON.stringify(this.column3));
        },
        addItem() {
            this.newItemText.push(''); 
        }
    }
})