const fs = require("fs");
const unlinkImage = (imageArray, path) => {
  imageArray.forEach((ele) => {
    const imageSplit = ele.split("/");
    const splitLength = imageSplit.length;
    const filename = imageSplit[splitLength - 1];

    return (
      fs.existsSync(`${path}/${filename}`) &&
      fs.unlinkSync(`${path}/${filename}`)
    );
  });
};

module.exports = { unlinkImage };
