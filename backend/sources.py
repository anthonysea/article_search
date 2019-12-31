from bs4 import BeautifulSoup
import requests

def extractSearchResults(title, numberOfResults):

    results = []
    url = f"https://www.google.com/search?query={title}&num={numberOfResults}&tbm=nws"
    print(url)
    user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'
    headers = {'User-Agent': user_agent}
    r = requests.get(url, headers=headers)
    soup = BeautifulSoup(r.content, "html.parser")
    # Results are in a div.g
    div = soup.find_all('div', {'class': 'g'})
    print("soup", soup)
    print("div", div)

    for res in div:
        result = {}
        # Extract the title of the article
        result['title'] = res.select('a')[1].text

        # Extract the url of the article, need to strip extra query parameters
        # that Google adds to the href attribute
        result_url_str = res.find('a')['href'].strip('/url?q=')
        delim = result_url_str.find('&')
        result_url_str = result_url_str[:delim]
        result['url'] = result_url_str

        # Get the news source
        result['source'] = res.find('div', class_='slp').text.split("-")[0]
        # Get the time of publication
        result['date'] = res.find('div', class_='slp').text.split("-")[1]

        results.append(result)
    
    return results



def search(title, numberOfResults):
    results = extractSearchResults(title, numberOfResults)
    return results, 200
    