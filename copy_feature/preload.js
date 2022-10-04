/*
 * @Author: feizzer
 * @Date: 2022-04-30 14:46:57
 * @LastEditors: feizzer
 * @LastEditTime: 2022-10-04 19:52:44
 * @Description: 
 */
window.exports = {
    "push": { // 注意：键对应的是 plugin.json 中的 features.code
       mode: "none",  // 用于无需 UI 显示，执行一些简单的代码
       args: {
          // 进入插件应用时调用
          enter: (action) => {
            var fs = require('fs')
             console.log("进入插件", action)
             var inputRes = window.utools.setSubInput((text) => {

                window.document.onkeydown = function(event) {
                    if (event.key == 'Enter') {
                        writeIntoFile(text.text)
                        window.utools.outPlugin()
                        window.utools.hideMainWindow()
                    }
                }
             }, "text you content", true)

             console.log(inputRes)
          }  
       } 
    },
    "copy": {
        mode: "none",
        args: {
            enter: (action) => {
                var fs = require('fs')
                var rs = fs.createReadStream(filePath)
            
                var res = ""
                rs.on('data', (data) => {
                    utools.copyText(data.toString())
                    window.utools.outPlugin()
                    window.utools.hideMainWindow()
                    
                })
            }
        }
    }
 }

 var filePath = 'd:/test.txt'
 function writeIntoFile(text) {
    var fs = require('fs')
    var ws = fs.createWriteStream(filePath,{flags:"w"})
    ws.write(text)
    ws.close()
 }

 function readFromFile() {
    var fs = require('fs')
    var rs = fs.createReadStream(filePath)

    var res = ""
    rs.on('data', (data) => {
        res = res + data.toString()
    })
    return res
 }


