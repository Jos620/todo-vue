//* Firebase
//* ========

var firebaseConfig = {
    apiKey: "AIzaSyBniljKXjAIQoppNToQOWIF37uJ1yFIhSo",
    authDomain: "todo-ce8db.firebaseapp.com",
    projectId: "todo-ce8db",
    storageBucket: "todo-ce8db.appspot.com",
    messagingSenderId: "542113504197",
    appId: "1:542113504197:web:3271ee0b7b7fbf981649ac",
    measurementId: "G-GMTZX6Q6XL"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

//* Vue
//* ===

new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: []
    },
    methods: {
        addTodo() {
            if (this.validateInput()) {
                db.collection('todos').add({
                    text: this.newTodo,
                    done: false
                })
                this.newTodo = ''
            } else {
                alert('Você não pode adicionar uma tarefa vazia ou duplicada!')
            }
        },
        delTodo(todo) {
            this.todoList = this.todoList.filter((item) => item !== todo)
            db.collection('todos').doc(todo.id).delete()
        },
        toggleTodo(todo) {
            let invertDone = !todo.done
            todo.done = invertDone
            db.collection('todos').doc(todo.id).update({
                done: invertDone
            })
            this.sortList()
        },
        sortList() {
            this.todoList.sort((a, b) => a.done - b.done)
        },
        checkIfTodoExists() {
            return this.todoList.some((todo) => todo.text.toLowerCase() === this.newTodo.toLowerCase().trim())
        },
        validateInput() {
            return !(!this.newTodo.trim() || this.checkIfTodoExists());
        }
    },
    computed: {
        filteredList() {
            return this.todoList.filter((todo) => todo.text.toLowerCase().match(this.newTodo.toLowerCase()))
        }
    },
    created: function() {
        db.collection('todos').onSnapshot((res) => {
            const changes = res.docChanges();

            changes.forEach((change) => {
                if (change.type === 'added') {
                    this.todoList.push({
                        ...change.doc.data(),
                        id: change.doc.id
                    })
                    this.sortList()
                }
            })
        })
    }
})