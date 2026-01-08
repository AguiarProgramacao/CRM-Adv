const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', '..', 'uploads');

// Cria a pasta caso não exista
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('[UPLOAD] Pasta "uploads" criada automaticamente.');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('[UPLOAD] Salvando em:', uploadDir);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '_' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage });

module.exports = upload;
