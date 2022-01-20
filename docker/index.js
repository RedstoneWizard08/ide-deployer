const fetcher = require("@openvscode-server/fetcher");
const download = require("download");
const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");

fetcher().then(async (data) => {
    if(fs.existsSync(path.join(__dirname, data.split("/")[data.split("/").length - 1]))) {
        fs.rmSync(path.join(__dirname, data.split("/")[data.split("/").length - 1]));
    }
    if(fs.existsSync(path.join(__dirname, data.split("/")[data.split("/").length - 1].replace(".tar.gz", "")))) {
        childProcess.execSync("rm -rf " + data.split("/")[data.split("/").length - 1].replace(".tar.gz", ""));
    }
    await download(data, __dirname);
    console.log("Download Completed!");
    childProcess.execSync("tar zxvf " + data.split("/")[data.split("/").length - 1]);
    console.log("Extraction Completed!");
    fs.rmSync(path.join(__dirname, data.split("/")[data.split("/").length - 1]));
});