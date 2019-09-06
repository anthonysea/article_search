from bs4 import BeautifulSoup
import requests

def extractSearchResults(title):

    results = []
    url = f"https://www.google.com/search?query={title}&tbm=nws"
    r = requests.get(url)
    soup = BeautifulSoup(r.content, "html.parser")
    # Results are in a div.g
    div = soup.findAll('div', {'class': 'g'})

    for res in div:
        result = {}
        # Extract the title of the article
        result['title'] = res.select('a')[0].text

        # Extract the url of the article, need to strip extra query parameters
        # that Google adds to the href attribute
        result_url_str = res.find('a')['href'].strip('/url?q=')
        delim = result_url_str.find('&')
        result_url_str = result_url_str[:delim]
        result['url'] = result_url_str

        # Get the news source
        result['source'] = res.find('span', class_='f').text.split(" - ")[0]

        results.append(result)
    
    return results



def search(title):
    results = extractSearchResults(title)
    return results, 200
    