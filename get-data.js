const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')

let list = fs.readFileSync(__dirname + '/data/all-href.json',"utf-8")
let getList = JSON.parse(list).data.slice(1000,2000)

let itemCount = 0

let data = []
let errordata = []

function replaceText(text){
    return text.replace(/\n/g, "").replace(/\s/g, "");
}

getList.forEach(function(item, index, arr) {
	setTimeout(function() {				
		superagent
		.get(item)
		.end(function(error, response) {
			if(error) {
				console.log("get error: " + itemCount)
				// console.log(error)
				errordata.push(itemCount)
				itemCount++
				if(itemCount == 6693 || itemCount % 1000 == 0) {
					write(itemCount, data)
					writeError(itemCount, errordata)
					data = []
					errordata = []
				}		
				return
			}
			let $ = cheerio.load(response.text)
			console.log("get item" + itemCount)
			let testObj = {}
			testObj.project = replaceText($('#move').text())
			testObj.initiator = replaceText($('.txt2').text())
			testObj.support = replaceText($('.xqDetailData').eq(0).find('.ftP').text())
			testObj.funds = replaceText($('.xqDetailData').eq(1).find('.ftP').text())
			testObj.progress = replaceText($('.xqRatioOuterBox').eq(0).find('.ftP').text())
			testObj.goal = replaceText($('.xqRatioText .rightSpan b').text())
			let label = []
			$('.siteIlB_box .siteIlB_item a').each(function() {
				label.push(replaceText($(this).text()))
			})
			testObj.label = label
			testObj.dedication = $('.wszc_h3').find('b').text()
			let statistics = []
			$('.zcje_ItemBox .zcje_h3').each(function() {
				let itemObj = {}
				itemObj.count = replaceText($(this).find('b').text())
				itemObj.number = replaceText($(this).html()).match(/\<\/b\>(.+)\&/)[1]
				statistics.push(itemObj)
			})
			testObj.statistics = statistics
			testObj.video = $('.xqMainLeft_vedioA').length || 0
			testObj.img = $('#xmxqBox img').length || 0
			testObj.heart = replaceText($('.heart-shaped').text())
			testObj.update = $('.xqTabNav_ul li').eq(1).find('b').text()
			testObj.comment = $('.xqTabNav_ul li').eq(2).find('b').text()
			data.push(testObj)
			itemCount++	
			if(itemCount == 6693 || itemCount % 1000 == 0) {
				write(itemCount, data)
				writeError(itemCount, errordata)
				data = []
				errordata = []
			}		
		})
	}, 2000*index)
})

function write(num, itemData) {	
	console.log('write start')
	fs.writeFile(__dirname + '/data/index-list-' + num + '.json', JSON.stringify({
		data: itemData
	}), function(err) {
		if(err) {
			console.log("write error")
			console.log(err)
			return err
		}
		console.log('write over')
	})
}
function writeError(num, itemData) {	
	console.log('write error start')
	fs.writeFile(__dirname + '/data/error-' + num + '.json', JSON.stringify({
		data: itemData
	}), function(err) {
		if(err) {
			console.log("write error error")
			console.log(err)
			return err
		}
		console.log('write error over')
	})
}