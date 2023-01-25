const NewsModel = require('../src/newsModel');

describe('NewsModel', () => {
  it('constructs', () => {
    const model = new NewsModel();

    model.setNews([
      {content: "some content"},
      {content: "some more content"}
    ])

    expect(model.getNews()).toEqual([
      {content: "some content"},
      {content: "some more content"}
    ]);
  });
})