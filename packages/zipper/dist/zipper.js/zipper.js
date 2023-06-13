"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var archiver = require("archiver");
var commander_1 = require("commander");
commander_1.program
    .arguments("<files...>")
    .option("-o, --output <output>", "Output zip file path")
    .parse(process.argv);
function zipFiles(files, outputFilePath) {
    return new Promise(function (resolve, reject) {
        var output = fs.createWriteStream(outputFilePath);
        var archive = archiver("zip", {
            zlib: { level: 9 }, // Compression level (0-9)
        });
        output.on("close", function () {
            console.log("Successfully zipped the files.");
            resolve();
        });
        archive.on("error", function (err) {
            console.error("Failed to zip the files:", err);
            reject(err);
        });
        archive.pipe(output);
        // eslint-disable-next-line no-restricted-syntax
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var filePath = files_1[_i];
            var file = path.basename(filePath);
            archive.append(fs.createReadStream(filePath), { name: file });
        }
        archive.finalize();
    });
}
var filesToZip = commander_1.program.args;
var outputFilePath = commander_1.program.opts().output || "output.zip";
if (!filesToZip.length || !outputFilePath) {
    commander_1.program.help();
}
else {
    zipFiles(filesToZip, outputFilePath).catch(function (err) {
        console.error("An error occurred while zipping the files:", err);
    });
}
