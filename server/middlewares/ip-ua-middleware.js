

module.exports = function (req, res, next) {
    if (req.ip.includes('::ffff:')) {
        req.ip2 = req.ip.split(':').reverse()[0].toLowerCase();
    }
    req.ua= req.useragent['os']+"|"+req.useragent['browser'];
    next();
}
