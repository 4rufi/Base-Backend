const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { ALLOWED_EXTENSIONS } = process.env;
const allowedDefault = ALLOWED_EXTENSIONS.split(',');

const uploadFile = async (
  files,
  allowedExtensions = allowedDefault,
  folder = ''
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;

    const imgName = file.name.split('.');
    const extension = imgName[imgName.length - 1].toLowerCase();
    if (!allowedExtensions.includes(extension))
      return reject(
        `Extension file not allowed, extensions allowed: ${allowedExtensions}`
      );

    const temporalName = `${uuidv4()}.${extension}`;
    uploadPath = path.join(__dirname, '../uploads/', folder, temporalName);
    file.mv(uploadPath, (error) => {
      if (error) {
        console.log(error);
        return reject('Error uploading file');
      }
    });
    resolve(temporalName);
  });
};

module.exports = {
  uploadFile,
};
