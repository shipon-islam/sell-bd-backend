//@Date: 01/10/2022
//@Author: Shipon islam

const uploads = require("../utilites/uploads");
function uploadFile(folder){
    const file = (req, res, next) => {
  uploads(folder).any()(req, res,(err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}
return file;
}


module.exports = uploadFile;
