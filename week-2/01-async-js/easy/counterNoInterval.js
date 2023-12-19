let count = 0;
function counter() {
  setTimeout(() => {
    county();
  }, 1000);
}
function county() {
  count++;
  console.log(count);
  counter();
}

county();
