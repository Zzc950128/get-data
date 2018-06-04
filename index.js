// "http://www.zhongchou.com/browse/re-si_c"
// "http://www.zhongchou.com/browse/re-si_c2"
// "http://www.zhongchou.com/browse/re-si_c-p279"

const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')

let requireUrl = []
let data = []
for(let i = 1; i <= 279; i++) {
	let http
	if(i == 1) {
		http = "http://www.zhongchou.com/browse/re-si_c"
	}else {
		http = "http://www.zhongchou.com/browse/re-si_c-p" + i
	}
	requireUrl.push(http)
	if(i == 279) {
		console.log(requireUrl.length)
		console.log('write start')
		fs.writeFile(__dirname + '/data/index.json', JSON.stringify({
			url: requireUrl
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
// let http = "httpss://icobench.com/icos?page=1&filterStatus=upcoming"

// function replaceText(text){
//     return text.replace(/\n/g, "").replace(/\s/g, "");
// }

// requireUrl.forEach(function(item, index, arr) {
// 	setTimeout(function() {	
// 		superagent
// 		.get(item)
// 		.timeout({
// 			response: 5000,  
// 			deadline: 600000, 
// 		})
// 		.end(function(err, res) {
// 			if(err) {
// 				console.log("get error")
// 				console.log(err)
// 				return err
// 			}
// 			let $ = cheerio.load(res.text)
// 			for(let i = 0; i < $('.name').length; i++) {
// 				console.log("get start")
// 				console.log(replaceText($('.name').eq(i).text()) + " " + count)
// 				data.push(("https://icobench.com" + $('.name').eq(i).attr('href')))				
// 				console.log("get over")
// 				count++
// 				write()
// 			}
// 		})
// 	}, (Math.floor(Math.random()*20+1)*1000) )
// })
// function write() {
// 	if(count == 120) {	
// 		setTimeout(function() {		
// 			console.log('write start')
// 			fs.writeFile(__dirname + '/data/upcoming-480.json', JSON.stringify({
// 				data: data
// 			}), function(err) {
// 				if(err) {
// 					console.log("write error")
// 					console.log(err)
// 					return err
// 				}
// 				console.log('write over')
// 			})
// 		}, 3000)
// 	}
// }