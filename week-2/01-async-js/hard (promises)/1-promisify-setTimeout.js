/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/
function wait(n) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      return res();
    }, n * 1000);
  });
}

// const timeTaken = new Date().getTime - startTime / 1000;
// console.log("resolves after " + timeTaken + " seconds");

module.exports = wait;
