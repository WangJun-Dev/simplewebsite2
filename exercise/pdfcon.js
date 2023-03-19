const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const docxConverter = require('docx-pdf');
const pdfToText = require('pdf-to-text');

const app = express();
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/convert', upload.single('file'), async (req, res) => {
  const inputFile = req.file.path;
  const fileExtension = path.extname(inputFile);
  const outputFile = path.join('uploads', path.basename(inputFile, fileExtension) + (fileExtension === '.docx' ? '.pdf' : '.docx'));

  if (fileExtension === '.docx') {
    try {
      await convertWordToPdf(inputFile, outputFile);
      res.download(outputFile);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error converting Word to PDF.');
    }
  } else if (fileExtension === '.pdf') {
    try {
      await convertPdfToWord(inputFile, outputFile);
      res.download(outputFile);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error converting PDF to Word.');
    }
  } else {
    res.status(400).send('Unsupported file format.');
  }
});

function convertWordToPdf(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    docxConverter(inputPath, outputPath, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function convertPdfToWord(inputPath, outputPath) {
  const text = await pdfToText.pdfToText(inputPath, {});
  fs.writeFileSync(outputPath, text);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
