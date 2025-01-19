// merger two files

// const express = require('express')
// const path = require('path')
// const app = express()
// const multer  = require('multer')
// const {mergePdfs}  = require('./merge')

// const upload = multer({ dest: 'uploads/' })
// app.use('/static', express.static('public'))
// const port = 3000

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, "templates/server.html"))
// })


// app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
//   console.log(req.files)
//   let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
//   res.redirect(`http://localhost:3000/static/${d}.pdf`)
//   // res.send({data: req.files})
//   // req.files is array of `pdfs` files
//   // req.body will contain the text fields, if there were any
// })

// app.listen(port, () => {
//   console.log(`App is running at http://localhost:${port}`)
// })


// Merge Multiple files

const express = require('express');
const path = require('path');
const multer = require('multer');
const { mergePdfs } = require('./merge');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Temporary storage for uploaded files
app.use('/static', express.static('public'));
const port = 3000;

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/server.html'));
});

// Handle PDF merge
app.post('/merge', upload.array('pdfs', 100), async (req, res) => {
  try {
    console.log(req.files); // Log uploaded files

    // Create an array of full paths for the uploaded files
    const pdfPaths = req.files.map(file => path.join(__dirname, file.path));

    // Merge the PDFs and get the unique timestamp for the merged file
    const timestamp = await mergePdfs(pdfPaths);

    // Redirect to the merged PDF
    res.redirect(`/static/${timestamp}.pdf`);
  } catch (err) {
    console.error('Error merging PDFs:', err);
    res.status(500).send('An error occurred while merging the PDFs.');
  }
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
