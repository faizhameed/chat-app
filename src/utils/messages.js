const generateMessage = (text = "No Message") => {
  return {
    text,
    createdAt: new Date().getTime(),
  };
};
const generateLocationMessage = (url) => ({
  url,
  createdAt: new Date().getTime(),
});

module.exports = {
  generateMessage,
  generateLocationMessage,
};
