const generateEmbedding = (text) => {
  const words = text.toLowerCase().split(" ");

  const embedding = new Array(10).fill(0);

  words.forEach((word) => {
    embedding[word.length % 10] += 1;
  });

  return embedding;
};

module.exports = generateEmbedding;
