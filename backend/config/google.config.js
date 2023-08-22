const urlConfig = require("./url.config")
const GOOGLE_CLIENT_ID = '416034001184-bjcmfq9jtie5neu94s6ca1ns24sf6p00.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const REDIRECT_URI = `${urlConfig.SERVER_URL}}api/user/google`

module.exports = {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URI
}