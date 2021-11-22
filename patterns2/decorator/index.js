const fs = require("fs");
const path = require("path");
const { Article, ArticleDecorator } = require("./decorator");

const articleOne = new Article(1, 150, "USD");
const articleTwo = new Article(1, 250, "CNY");

const articleOneExchanged = new ArticleDecorator(articleOne);
const articleTwoExchanged = new ArticleDecorator(articleTwo);

const articles = [articleOne, articleTwo];
const articlesExchanged = [articleOneExchanged, articleTwoExchanged];

articlesExchanged.forEach((articleExchanged) => {
  switch (articleExchanged.article.currency) {
    case "USD":
      articleExchanged.currencyExchange = "USD_EUR";
      break;
    case "GBP":
      articleExchanged.currencyExchange = "GBP_EUR";
      break;
    case "CHF":
      articleExchanged.currencyExchange = "CHF_EUR";
      break;
    case "JPY":
      articleExchanged.currencyExchange = "JPY_EUR";
      break;
    case "CAD":
      articleExchanged.currencyExchange = "CAD_EUR";
      break;
    case "CNY":
      articleExchanged.currencyExchange = "CNY_EUR";
      break;
  }
});

const file = path.join(__dirname, "currency_conversions.json");

fs.readFile(file, "utf8", (error, data) => {
  if (error) throw new Error(error);

  let obj = JSON.parse(data);

  articlesExchanged.forEach((articleExchanged) => {
    articleExchanged["exchange"] = articleExchanged.getTotalValueConverted(
      obj[articleExchanged.currencyExchange]
    );
  });

  console.log(articles);
  console.log(articlesExchanged);
});
