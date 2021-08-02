const advanceResults = (model, populate) => async(req, res, next) => {
    let query;
    // Copy req.query
    const reqQuery = { ...req.query };
    // seleccionar el field
    const removeFields = ['select', 'sort', 'page', 'limit'];
    // loop over removeFields and delete then from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    // match for gte gt 
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    // parser de query
    query = model.find(JSON.parse(queryStr));
    // SELECT Fields
    if(req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }
    // Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt')
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 200;
    const startIndex = (page -1) * limit;
    let  endIndex = page * limit;
    const total = await model.countDocuments();
    console.log(endIndex);

    query = query.skip(startIndex).limit(limit);

    if (populate) {
        query = query.populate(populate);
    }

    //execute query
    const results = await query;
    //pagination result
    const pagination = {};
    
    if (total >= endIndex) {
        pagination.next = {
            page: page +1,
            limit
        }
    }
    if (startIndex > 0) {
        pagination.pre = {
            page: page -1,
            limit
        }
    }

    res.advanceResults = {
        success: true,
        count: results.length,
        pagination,
        data: results   
    }

    next();
}


module.exports = advanceResults;
