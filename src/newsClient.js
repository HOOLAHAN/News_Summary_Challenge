const guardianApiKey = require('../guardianApiKey')

class NewsClient {
  
  getNewsFromApi(callback) {
    fetch(`https://content.guardianapis.com/search?api-key=${guardianApiKey}&show-fields=all`)
    .then(response => response.json())
    .then(articleData => {
      callback(articleData)
    })
  }

}

module.exports = NewsClient;