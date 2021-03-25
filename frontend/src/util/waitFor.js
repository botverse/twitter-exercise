function waitFor(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

export default waitFor;
