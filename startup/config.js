module.exports = function () {
    if (!process.env.VIDSECRETKEY) {
        throw new Error("FATAL ERROR: jwt PrivateKey is not defined");
    }
}