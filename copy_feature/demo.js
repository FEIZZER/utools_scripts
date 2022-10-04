/*
 * @Author: feizzer
 * @Date: 2022-10-02 21:32:39
 * @LastEditors: feizzer
 * @LastEditTime: 2022-10-02 22:48:21
 * @Description: 
 */

var fs = require('fs')
// var ws = fs.createWriteStream("c:/test.txt",{flags:"w"})
// ws.write("text")
// ws.close()


var rs = fs.createReadStream('d:/test.txt', {'flag': "r"})
rs.on('data', (data) => {
    // console.log(data.toString())
})
res = fs.readFile('d:/test.txt', function(err, data) {
    // console.log(data.toString())
})
// console.log(res)



