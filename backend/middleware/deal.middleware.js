module.exports = async (req, res, next) => {
    if (!req.body.hasOwnProperty("free"))
        req.body.free = 0;
    if (!req.body.hasOwnProperty("store_id"))
        req.body.store_id = -1;
    if (!req.body.hasOwnProperty("category_id"))
        req.body.category_id = [];
    if (!req.body.hasOwnProperty("feature"))
        req.body.feature = "new";
    next() ;
}
