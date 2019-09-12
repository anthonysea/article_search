

app = new Vue({
    el: ".main",
    data: {
        hello: "hello world",
        articles: null,
        input_: "",
        numberOfResults: null,
    },
    methods: {
        parseQuery(inp) {
            url_pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/
            // input matches a URL
            if (inp.match(url_pattern)) {
                console.log("URL input") 
                // remove trailing / from URL (if it exists)
                inp = inp.replace(/\/$/, "")
                // need to extract title from URL
                split_url = inp.split("/")
                inp = split_url[split_url.length - 1]
                inp = inp.replace(/\-/g, "+")
                console.log(inp)
            // input is assumed to be the title
            } else {
                re = /\ /g
                inp.replace(re, "+")
            }
            console.log(inp)
            return inp
        },
        parseNumberOfResults() {

        },
        articleSearch(event, inp) {
            console.log(event);
            cleanedInp = this.parseQuery(inp)
            if (!this.numberOfResults) {
                this.numberOfResults = 10;
            }
            axios
                .get(`http://localhost:5000/api/search?title=${cleanedInp}&numberOfResults=${this.numberOfResults}`)
                .then(response => (this.articles = response.data))
        },

    },
    computed: { 

    }
})