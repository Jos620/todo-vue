new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: [
            { text: 'Fazer o header'            , done: true },
            { text: 'Fazer uma seção dos todos' , done: true },
            { text: 'Form para novos todos'     , done: true },
            { text: 'Adicionar todo'            , done: true },
            { text: 'Deletar todo'              , done: true },
            { text: 'Completar todo'            , done: true },
            { text: 'Filtrar todos'             , done: true },
            { text: 'Validar input'             , done: false },
            { text: 'Firebase / Firestore'      , done: false },
        ]
    },
    methods: {
        addTodo() {
            if (this.newTodo.trim() != '') {
                this.todoList.push({
                    text: this.newTodo,
                    done: false
                })
            } else {
                alert('Você não pode adicionar uma tarefa vazia!')
            }
        },
        delTodo(todo) {
            this.todoList = this.todoList.filter((item) => item !== todo)
        },
        toggleTodo(todo) {
            todo.done = !todo.done
            this.sortList()
        },
        sortList() {
            this.todoList.sort((a, b) => a.done - b.done)
        }
    },
    computed: {
        filteredList() {
            return this.todoList.filter((todo) => todo.text.toLowerCase().match(this.newTodo.toLowerCase()))
        }
    },
    created: function() {
        this.sortList()
    }
})