const moment = require('moment');
const messages = require('./messages');
const { indexName } = require('./utils');

moment.suppressDeprecationWarnings = true;

const preparePayload = tweets => {
  const payload = [];

  tweets.forEach(tweet => {
    payload.push({
      index: {
        _index: indexName,
        _type: 'document',
        _id: tweet.id,
      },
    });
    payload.push({
      ...tweet,
      date: moment.utc(tweet.date).toDate().getTime(),
    });
  });

  return { body: payload };
};

const upload = (client, logger, tweets) => {
  const mapped = preparePayload(tweets);

  client.bulk(mapped, (error, response) => {
    if (error) {
      logger.error(messages.uploads.esError, error);
    } else if (response && response.errors) {
      logger.error(messages.uploads.esError, response.items ? response.items[0] : null);
    } else {
      logger.success(messages.uploads.esSuccess);
    }
  });
};

module.exports = upload;
