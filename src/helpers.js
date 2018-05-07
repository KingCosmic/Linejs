
const toArray = (maybeArr) => {
  return Array.isArray(maybeArr) ? maybeArr : [maybeArr];
}

const checkJSON = (raw) => {
  if (typeof raw === "object") {
    return raw;
  } else {
    throw new Error(`Failed to parse response body as JSON ${raw}`);
  }
}

const makeMessages = (messages) => {
  messages = toArray(messages);

  return messages.map((message) => {
    if (typeof message === 'string') return { type: 'text', text: message };
  })
}

module.exports = {
  toArray,
  checkJSON,
  makeMessages
}