export default class apiFeatures {
    constructor(mongooseQuery, queryString) {
      this.mongooseQuery = mongooseQuery;
      this.queryString = queryString;
    }
    pagination() {
      //pagination
      let page = this.queryString.page * 1 || 1;
      if (this.queryString.page <= 0) page = 1;
      let skip = (page - 1) * 4;
      this.page=page
      this.mongooseQuery.skip(skip).limit(4);
      return this;
    }
    filter() {
      // 
      let filterObject = { ...this.queryString };
  
      let excutedQuery = ["page", "sort", "keyword","fields"];
      excutedQuery.forEach((q) => {
        delete filterObject[q];
      });
  
      filterObject = JSON.stringify(filterObject);
      filterObject = filterObject.replace(
        /\bgt|gte|lt|lte\b/g,
        (match) => `$${match}`
      );
      filterObject = JSON.parse(filterObject);
      this.mongooseQuery.find(filterObject);
      return this;
    }

}