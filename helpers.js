
exports.toArray = (maybeArr) => {
  return Array.isArray(maybeArr) ? maybeArr : [maybeArr];
}

exports.checkJSON = (raw) => {
  if (typeof raw === "object") {
    return raw;
  } else {
    throw new Error(`Failed to parse response body as JSON ${raw}`);
  }
}