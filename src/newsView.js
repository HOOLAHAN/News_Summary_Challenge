class NewsView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainEl = document.querySelector('#main');
  }

  displayNews() {
    document.querySelectorAll(".article").forEach(element => {
      element.remove();
    });
    
    const news = this.model.getNews();
    const newsFromApi = news.response.results;
    const storiesEl = document.createElement('h2');

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
      this.displayNews();
    })
  }

}

module.exports = NewsView; 