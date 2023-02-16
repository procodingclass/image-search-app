const natural = require('natural');
const { promisify } = require('util');

// wrap the download method in a Promise
function downloadReuters() {
  return new Promise((resolve, reject) => {
    natural.download('reuters', err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// use promisify to turn the wrapped download function into a Promise
const download = promisify(downloadReuters);

// download the Reuters corpus and wait for it to finish
download().then(() => {
  // choose a topic
  const topic = 'oil prices';

  // load the Reuters corpus
  const reuters = new natural.Corpus('reuters');

  // get Reuters news articles on the topic
  const articles = reuters
    .reuters()
    .filter(article => article.topics.includes(topic))
    .map(article => article.body);

  // choose a random article
  const articleText = articles[Math.floor(Math.random() * articles.length)];

  // tokenize the article text into sentences
  const tokenizer = new natural.SentenceTokenizer();
  const sentences = tokenizer.tokenize(articleText);

  // concatenate the sentences into a paragraph
  const paragraph = sentences.join(' ');

  console.log(paragraph);
}).catch(err => {
  console.error(err);
});
