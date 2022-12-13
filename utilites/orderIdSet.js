const orderListSet = (num) => {
  if (num < 10) {
    return "000" + num;
  } else if (num < 100) {
    return "00" + num;
  } else if (num < 1000) {
    return "0" + num;
  } else {
    return num;
  }
};
module.exports = orderListSet;
