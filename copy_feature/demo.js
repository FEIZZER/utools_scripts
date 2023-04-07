/*
 * @Author: feizzer
 * @Date: 2022-10-02 21:32:39
 * @LastEditors: feizzer
 * @LastEditTime: 2022-10-04 21:27:43
 * @Description: 
 */
var dns = require('dns')

dns.lookup("github.com", function(error, address) {
    if (error) {

    } else {
        console.log(address)
    }
})

var reg = new RegExp("^data\:image\/.+\;base64,.+")
res = reg.test("data:image/y;base64,22")
console.log(res)