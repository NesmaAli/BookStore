const fs = require('fs')


var fetchData = () => {
  try {
    var dataString = fs.readFileSync('DB/books.json');

    return JSON.parse(dataString);
  } catch (e) {
    return [];
  }
};
//console.log(fetchData().categories);

var saveData = (newData) => {
  fs.writeFileSync('DB/books.json', JSON.stringify(newData));
};
exports.fetchData = fetchData
exports.saveData = saveData