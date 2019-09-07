

app = new Vue({
    el: ".main",
    data: {
        hello: "hello world",
        info: null,
        input_: "",
    },
    methods: {
        parseInput(inp) {
            url_pattern = new RegExp("\b(([\w-]+://?|www[.])[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|/)))#iS")
            // input matches a URL
            if (inp.match(url_pattern)) {
                // remove trailing / from URL (if it exists)
                inp.replace(/\/$/, "");
                // need to extract title from URL
                split_url = inp.split("/")
                inp = split_url[split_url.length - 1]
                inp.replace(/\-/, "+")
            // input is assumed to be the title
            } else {
                re = new RegExp("\ ", "g")
                inp.replace(re, "+")
            }
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