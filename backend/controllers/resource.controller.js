const randomUtil = require("../utils/random.util");
const fs = require('fs')
const urlConfig = require("../config/url.config")

exports.upload = async (req, res) => {
    try {
        const newName = randomUtil.generateLongNumber();
        fs.renameSync(req.file.path, __dirname + "/../resource/" + newName);
        return res.json({
            url: `${urlConfig.SERVER_URL}api/resource/get/` + newName
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
}

exports.get = async (req, res) => {
    try {
        const stream = fs.createReadStream(__dirname + "/../resource/" + req.params.id); // Replace with the actual file path
        // Pipe the stream to the response object
        stream.pipe(res);
    }
    catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
}