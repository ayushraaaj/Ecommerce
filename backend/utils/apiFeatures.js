class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ?
            {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i'
                }
            } : {}

        console.log(keyword);

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryStrCopy = { ...this.queryStr };

        // console.log(queryStrCopy);

        // Removing some fields for category
        const removeFileds = ['keyword', 'page', 'limit'];

        removeFileds.forEach(key => {
            delete queryStrCopy[key];
        });

        // console.log(queryStrCopy);

        // Filter for price and rating
        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (key) => `$${key}`)

        this.query = this.query.find(JSON.parse(queryStr));

        // console.log(queryStr);

        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;