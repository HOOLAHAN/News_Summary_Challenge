/**
 * @jest-environment jsdom
 */

require('jest-fetch-mock').enableMocks();
const fs = require('fs');
const NewsView = require('../src/newsView');
const NewsModel = require('../src/newsModel');
const apiMock = require('../mocks/guardianApiMock');
const NewsClient = require('../src/newsClient');

describe('News View', () => {
  let model;
  let view;

  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    model = new NewsModel();
    view = new NewsView(model);
  });

  it('displays news articles from API call', () => {
    const clientMock = {
      getNewsFromApi: (callback) => {
        callback(apiMock)
      }
    }
    const view = new NewsView(model, clientMock);
    view.displayNewsFromApi();
    expect(document.querySelectorAll('div.article').length).toEqual(10);
  })

  it('displays articles from API call based on search params', () => {
    const client = new NewsClient();
    const view = new NewsView(model, client);
    model.setNews(apiMock)
    view.displayNews();
    expect(document.querySelectorAll('div.article').length).toEqual(10);
  })
}) 