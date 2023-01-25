const NewsClient = require('../src/newsClient')
require('jest-fetch-mock').enableMocks();

describe('NewsClient', () => {

  it('calls fetch and loads news data', (done) => {
    
    const client = new NewsClient();

    fetch.mockResponseOnce(JSON.stringify ({
      article: "mock"
    }));
  
    client.getNewsFromApi((returnedDataFromApi) => {
    expect(returnedDataFromApi.article).toBe("mock");
    done();
    });

  });

})