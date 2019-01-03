var _ = require('lodash');
let checkDublicate = (arr, ele) => {
    var result = (arr.some(item => _.isEqual(item.name, ele.name)));
    return result;

};
let checkBookDublicate=(arr,ele)=>{
    var result = ((arr.some(item => _.isEqual(item.title, ele.title)))&&(arr.some(item => _.isEqual(item.author, ele.author))));
    return result;
}
module.exports={checkDublicate,
    checkBookDublicate};