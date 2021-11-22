class Article {
  constructor(articleId, value, currency) {
    this.articleId = articleId;
    this.value = value;
    this.currency = currency;
  }

  getTotalValue() {
    return this.value;
  }
}

class ArticleDecorator {
  constructor(article) {
    this.article = article;
  }

  getTotalValueConverted(rate) {
    const convertedValue = this.article.getTotalValue() * rate;
    return `Currency exchange: ${this.article.currency} at rate of ${rate} equals to: ${convertedValue} euros`;
  }
}

module.exports = {
  Article,
  ArticleDecorator,
};
