const axios = require("axios").default;

const url = "https://api.github.com/repos/gitpod-io/openvscode-server/releases";

async function main() {
    const data = (await axios.get(url)).data;
    var final_ = {};
    var final__ = {};
    var final = "";
    for(var i = 0; i < data.length; i++) {
        if(data[i].prerelease === true) continue;
        final_ = data[i].assets;
        break;
    }
    for(var i = 0; i < final_.length; i++) {
        if(final_[i].browser_download_url.includes("arm64")) {
            final__ = final_[i];
            break;
        }
    }
    final = final__.browser_download_url;
    return final;
}

module.exports = main;