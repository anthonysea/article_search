

app = new Vue({
    el: ".main",
    data: {
        hello: "hello world",
        info: null,
        input_: "",
    },
    methods: {
        parseInput(inp) {
            re = new RegExp("\ ", "g")
            inp.replace(re, "+")
            return inp
        },
        articleSearch(event, inp) {
            console.log(event);
            cleanedInp = this.parseInput(inp)
            axios
                .get(`http://localhost:5000/api/search?title=${cleanedInp}`)
                .then(response => (this.info = response))

        },

    },
    computed: { 

    }
})