# article_search

Article Search is a simple tool that allows users to search for related news articles given an article title. This application
was built using Vue.js, Flask, BeautifulSoup, and Connexion. 

The application works by using a web crawler built with BeautifulSoup4 to scrape Google search results from a given user query. The results are then served from a REST API that was created with Flask and Connexion. The frontend then consumes the REST API using Vue.js and axios.
