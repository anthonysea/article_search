

app = new Vue({
    el: ".main",
    data: {
        hello: "hello world",
        info: null,
        input_: "",
    },
    methods: {
        parseInput(inp) {
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