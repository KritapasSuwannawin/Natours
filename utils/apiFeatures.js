class APIFeatures {
  constructor(dbQuery, requestQueryObj) {
    this.dbQuery = dbQuery;
    this.requestQueryObj = requestQueryObj;
  }

  filter() {
    const queryObj = { ...this.requestQueryObj };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    const replacedQueryStr = JSON.stringify(queryObj).replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.dbQuery = this.dbQuery.find(JSON.parse(replacedQueryStr));

    return this;
  }

  sort() {
    if (this.requestQueryObj.sort) {
      const sortBy = this.requestQueryObj.sort.split(',').join(' ');
      this.dbQuery = this.dbQuery.sort(sortBy);
    } else {
      this.dbQuery = this.dbQuery.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.requestQueryObj.fields) {
      const fields = this.requestQueryObj.fields.split(',').join(' ');
      this.dbQuery = this.dbQuery.select(fields);
    } else {
      this.dbQuery = this.dbQuery.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.requestQueryObj.page * 1 || 1;
    const limit = this.requestQueryObj.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.dbQuery = this.dbQuery.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
