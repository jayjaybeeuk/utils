/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { program } = require('commander');

program
  .arguments('<files...>')
  .option('-o, --output <output>', 'Output zip file path')
  .parse(process.argv);

function zipFiles(files, outputFilePath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputFilePath);
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Compression level (0-9)
    });

    output.on('close', () => {
      console.log('Successfully zipped the files.');
      resolve();
    });

    archive.on('error', (err) => {
      console.error('Failed to zip the files:', err);
      reject(err);
    });

    archive.pipe(output);

    for (const filePath of files) {
      const file = path.basename(filePath);
      archive.append(fs.createReadStream(filePath), { name: file });
    }

    archive.finalize();
  });
}

const filesToZip = program.args;
const outputFilePath = program.opts().output || 'output.zip';

if (!filesToZip.length || !outputFilePath) {
  program.help();
} else {
  zipFiles(filesToZip, outputFilePath).catch((err) => {
    console.error('An error occurred while zipping the files:', err);
  });
}

