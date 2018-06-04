const fs = require('fs')

let list = fs.readFileSync(__dirname + '/data/index-list.json',"utf-8")
let listItem = JSON.parse(list).data

// console.log(listItem)

function sortId(a,b) {  
   return a.page - b.page  
}

let result = listItem.sort(sortId)

console.log(result)

console.log('write over')
fs.writeFileSync(__dirname + '/data/index-list-fix.json', JSON.stringify({
	data: result
}), function(err) {
	if(err) {
		console.log("write error")
		console.log(err)
		return err
	}
	console.log('write over')
})