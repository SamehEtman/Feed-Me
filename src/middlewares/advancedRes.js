const advancedRes = (model, populate) => async (req, res, next) => {

    let query;
    const toRemove = ['select', 'skip', 'limit', 'sort']
    let reqQuery = {
        ...req.query
    };
    toRemove.forEach((key) => {
        delete reqQuery[key];
    })

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    query = model.find(JSON.parse(queryStr));


    if (req.query.select) {
        const selectFrom = req.query.select.split(',').join(' ');
        query.select(selectFrom);
    }
    
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query.sort(sortBy);
    }
    if (populate) {
        query = query.populate(populate)
    }

    const page = parseInt(req.query.skip) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    query.skip(startIndex).limit(limit)

    const result = await query;

    const total = await model.countDocuments()

    const pagination = {};
    if (startIndex > 0) {
        pagination.prev = {
            prev: page - 1,
            limit
        }
    }
    if (endIndex < total) {
        pagination.next = {
            next: page + 1,
            limit
        }
    }
    res.advancedRes = {
        success: true,
        count: result.length,

        pagination,
        data: result
    };
    next()
}


module.exports = advancedRes