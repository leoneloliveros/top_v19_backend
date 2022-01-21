const fs = require('fs');
const cloudinary = require('cloudinary');

// cloudinary.config({
//   cloud_name: 'top-v19-cloud',
//   api_key: '882782381866894',
//   api_secret: 'kN9zcwXXjfaQXley9T7MbeJzcWc',
// });

async function uploadSingleHandler(req, res) {
  // aqui es donde vamos a leer el archivo
  const { file, body } = req;

  // dependecia de node que baje resolucion de los archivos (img)

  try {
    // if (file.size > 50000) {
    //   res.status(500).json({ message: 'Imagen Muy pesada' });
    // }
    const result = await cloudinary.uploader.upload(file.path);
    res.status(200).json({ message: 'se conecto a la ruta', result });
  } catch (e) {
    res.status(500).json(e);
  } finally {
    fs.unlinkSync(file.path);
  }
}

async function uploadMultipleHandler(req, res) {
  // aqui es donde vamos a leer el archivo
  const { files, body } = req;

  const response = [];

  for (const sigleFile of files) {
    try {
      const result = await cloudinary.uploader.upload(sigleFile.path);
      response.push(result);
    } catch (e) {
      res.status(500).json(e);
    } finally {
      fs.unlinkSync(sigleFile.path);
    }
  }
  res.status(200).json({ message: 'se conecto a la ruta', response });
}

module.exports = {
  uploadSingleHandler,
  uploadMultipleHandler,
};
