const fs = require('fs')

let list = fs.readFileSync(__dirname + '/data/index-list-fix.json',"utf-8")
let listItem = JSON.parse(list).data

let result = []

let count = 0

listItem.forEach(function(item, index, arr) {
	item.content.forEach(function(c, i ,a) {
		result.push(c.href)
		count++
		console.log(count)
		write()
	})
})

console.log(result.length)

console.log('write start')

function write() {
	if(count == 6693) {
		fs.writeFileSync(__dirname + '/data/all-href.json', JSON.stringify({
			data: result
		}), function(err) {
			if(err) {
				console.log("write error")
				console.log(err)
				return err
			}
			console.log('write over')
		})
	}
}

// const fs = require('fs')

// let list = fs.readFileSync(__dirname + '/data/all-href.json',"utf-8")
// let listItem = JSON.parse(list).data

// console.log(listItem.length)