
// const mergePdfs = async (p1, p2) => {
//   const PDFMerger = (await import('pdf-merger-js')).default;
//   const merger = new PDFMerger();

//   await merger.add(p1);
//   await merger.add(p2);
//   //   await merger.add('pdf1.pdf');  //merge all pages. parameter is the path to file and filename.
//   //   await merger.add('pdf2.pdf', 2); // merge only page 2
//   //   await merger.add('pdf2.pdf', [1, 3]); // merge the pages 1 and 3
//   //   await merger.add('pdf2.pdf', '4, 7, 8'); // merge the pages 4, 7 and 8
//   //   await merger.add('pdf3.pdf', '3 to 5'); //merge pages 3 to 5 (3,4,5)
//   //   await merger.add('pdf3.pdf', '3-5'); //merge pages 3 to 5 (3,4,5)
//   let d = new Date().getTime()
//   await merger.save(`public/${d}.pdf`); //save under given name and reset the internal document
//   return d
//   // Export the merged PDF as a nodejs Buffer
//   // const mergedPdfBuffer = await merger.saveAsBuffer();
//   // fs.writeSync('merged.pdf', mergedPdfBuffer);
// } 

// module.exports = {mergePdfs}


const mergePdfs = async (pdfPaths) => {
  const PDFMerger = (await import('pdf-merger-js')).default;
  const merger = new PDFMerger();

  // Add each PDF file from the array
  for (const pdfPath of pdfPaths) {
    try {
      await merger.add(pdfPath); // Ensure each file path is valid
    } catch (err) {
      console.error(`Failed to add file ${pdfPath}:`, err);
      throw err; // Optionally, handle errors gracefully
    }
  }

  // Save the merged PDF with a unique name
  const timestamp = new Date().getTime();
  const outputFilePath = `public/${timestamp}.pdf`;
  await merger.save(outputFilePath);

  return timestamp; // Return the timestamp to identify the merged file
};

module.exports = { mergePdfs };
