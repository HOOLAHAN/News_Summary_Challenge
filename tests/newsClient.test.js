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

  it('calls fetch based on inputted search parameters', (done) => {
    const client = new NewsClient();

    fetch.mockResponseOnce(JSON.stringify ({
      article: "mocked article about boris"
    }));

    client.searchNewsFromApi("boris", (returnedDataFromApi) => {
      expect(returnedDataFromApi.article).toBe("mocked article about boris");
      done();
    });
  })

})