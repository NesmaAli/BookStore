var sortJsonArray = require('sort-json-array');
var _ = require('lodash');
let sort=(data,type,order)=>{
    resultData = _.orderBy(data, type, order);
   return resultData;
}
let filter=(data,filterObj)=>{
    resultData = _.filter(data, filterObj);
    return resultData;

}
let paging=(data,Pnum,perPage)=>{
  
        console.log(Pnum,perPage)
        if (!Pnum) {
            Pnum = 1
        }
        if (Pnum > data.length /perPage) {
            Pnum = Math.ceil(data.length /perPage);
        }
        resultData = data.slice(Pnum * perPage - perPage, Pnum * perPage)
        return resultData;

}
exports.sort=sort;
exports.filter=filter;
exports.paging=paging;