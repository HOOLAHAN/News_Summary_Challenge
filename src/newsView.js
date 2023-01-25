class NewsView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainerEl = document.querySelector('#main-container');
  }

  displayNews() {
    document.querySelectorAll(".article").forEach(element => {
      element.remove();
    });
    
    const news = this.model.getNews();
    const newsFromApi = news.response.results;

    const feedEl = document.createElement('div');
    feedEl.className = 'feed';
    this.mainContainerEl.append(feedEl);

    newsFromApi.forEach(article => {
      const articleEl = document.createElement('div');
      articleEl.className = 'article';
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