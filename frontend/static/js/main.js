

app = new Vue({
    el: ".main",
    data: {
        hello: "hello world",
        articles: null,
        input_: "",
        numberOfResults: null,
        errors: [],
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
            numResInt = parseInt(this.numberOfResults)

            // Check if there is an input at all and if the input is a valid integer
            if (!Number.isInteger(numResInt) && this.numberOfResults && this.numberOfResults.includes(".")) {
                this.errors.push("Please enter an integer between 1 and 50 (inclusive) or leave blank for 10")
                console.log("error1")
                return false
            } else {
                // If there is no input
                if (!this.numberOfResults) {
                    this.numberOfResults = 10
                    this.errors = []
                    return true
                // Input is a valid number between 1 and 50
                } else if (Number.isInteger(numResInt) && (1 <= numResInt) && (numResInt <= 50)) {
                    this.errors = []
                    this.numberOfResults = numResInt
                    return true
                } else {
                    this.errors.push("Please enter an integer between 1 and 50 (inclusive) or leave blank for 10")
                    // this.errors[0] = "Please enter an integer between 1 and 50 (inclusive) or leave blank for 10"
                    console.log("error2")
                    return false
                }
            }
        
            // if (Number.isInteger(this.numberOfResults) && (1 <= this.numberOfResults) && (this.numberOfResults <= 50)) {
            //     this.errors = []
            //     console.log('working')
            //     return true
            // } else if (!this.numberOfResults) {
            //     this.numberOfResults = 10
            //     this.errors = []
            //     console.log('branch1')
            //     return true
            // } else {
            //     // this.errors[0] = "Please enter an integer between 1 and 50 (inclusive) or leave blank for 10"
            //     this.errors.push("Please enter an integer between 1 and 50 (inclusive) or leave blank for 10")
            //     console.log('error')
            //     return false
            // }
        },
        articleSearch(event, inp) {
            console.log(event);
            cleanedQuery = this.parseQuery(inp)
            if (!this.parseNumberOfResults()) {
                return
            }
            axios
                .get(`http://localhost:5000/api/search?title=${cleanedQuery}&numberOfResults=${this.numberOfResults}`)
                .then(response => (this.articles = response.data))
        },

    },
    computed: { 

    }
})