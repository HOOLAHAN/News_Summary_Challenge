class NewsView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainEl = document.querySelector('#main');

    const submitButtonEl = document.querySelector('#news-search-submit');
    const searchBarEl = document.querySelector('#news-search')

    submitButtonEl.addEventListener('click', () => {
      const searchQuery = searchBarEl.value;

      this.client.searchNewsFromApi(searchQuery, articleData => {
        this.model.setNews(articleData);
        document.querySelector('.stories-header').remove();
        this.displayNews(searchQuery);
      });
    });
  }

  displayNews(searchQuery) {
    document.querySelectorAll(".article").forEach(element => {
      element.remove();
    });
    
    const news = this.model.getNews();
    const newsFromApi = news.response.results;

    const storiesEl = document.createElement('h2');

    if (searchQuery === undefined) {
      storiesEl.textContent = 'Top stories';
    } else {
      storiesEl.textContent = `Latest '${searchQuery}' stories`;
    }

    storiesEl.className = 'stories-header'
    this.mainEl.append(storiesEl);

    const feedEl = document.createElement('div');
    feedEl.className = 'feed';
    this.mainEl.append(feedEl);

    newsFromApi.forEach(article => {
      const articleEl = document.createElement('div');
      articleEl.className = 'article';
      const linkEl = document.createElement('a');
      linkEl.href = article.webUrl;

      const articleThumbnail = document.createElement('img');
      articleThumbnail.src = article.fields.thumbnail;
      
      const articleTitle = document.createElement('h3');
      articleTitle.textContent = article.webTitle;
      
      linkEl.appendChild(articleThumbnail);
      linkEl.appendChild(articleTitle);
      articleEl.append(linkEl);
      feedEl.append(articleEl);
    });

  };

  displayNewsFromApi() {
    this.client.getNewsFromApi(data => {
      this.model.setNews(data)
      console.log(this.model.getNews())
      this.displayNews();
    })
  }

}

module.exports = NewsView; 