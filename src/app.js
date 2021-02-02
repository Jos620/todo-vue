const { default: Vue } = require("vue");

new Vue({
    el: '#app',
    data: {
        todoList: [
            { text: 'Fazer o header'            , done: true },
            { text: 'Fazer uma seção dos todos' , done: false },
            { text: 'Form para novos todos'     , done: false },
            { text: 'Adicionar todo'            , done: false },
            { text: 'Deletar todo'              , done: false },
            { text: 'Completar todo'            , done: false },
            { text: 'Paleta de cores'           , done: false },
            { text: 'Criar os estilos'          , done: false },
            { text: 'Filtrar todos'             , done: false },
            { text: 'Validar input'             , done: false },
            { text: 'Firebase / Firestore'      , done: false },
        ]
    }
})