const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')

let list = fs.readFileSync(__dirname + '/data/index.json',"utf-8")
let getList = JSON.parse(list).url

let data = []
let count = 0
// [{
// 	page: 1,
// 	content: [{
// 		name: "123",
// 		href: "123"
// 	},{
// 	},{
// 	}]
// },{
// 	page: 2,
// 	content: [{},{},{}]
// }]

function replaceText(text){
    return text.replace(/\n/g, "").replace(/\s/g, "");
}
// console.log(getList)
getList.forEach(function(list, i, arr) {
	let http = list
	let obj = {}
	let page = i
	let content = []
	// console.log(page)
	setTimeout(function() {
		superagent
		.get(http)
		.timeout({
			response: 5000,
			deadline: 600000
		})
		.end(function(error, response) {
			if(error) {
				console.log("get error: ")
				console.log(error)
				return
			}
			let $ = cheerio.load(response.text)
			// console.log($('.ssCardICText h3 a').length)
			$('.ssCardICText h3 a').each(function(index, item) {
				// console.log(replaceText($(this).text()) + " " + $(this).attr('href'))
				let itemObj = {}
				itemObj.name = replaceText($(this).text())
				itemObj.href = $(this).attr('href')
				content.push(itemObj)
			})
			obj.page = page
			obj.content = content
			data.push(obj)
			count++
			write()
		})
	}, (Math.floor(Math.random()*20+1)*1000) )
	// }, (Math.floor(Math.random()*2+1)*1000) )
})

function write() {
	if(count == 279) {	
		setTimeout(function() {		
			console.log('write start')
			fs.writeFile(__dirname + '/data/index-list.json', JSON.stringify({
				data: data
			}), function(err) {
				if(err) {
					console.log("write error")
					console.log(err)
					return err
				}
				console.log('write over')
			})
		}, 2000)
	}
}