/*
 * @Author: feizzer
 * @Date: 2022-04-30 14:46:57
 * @LastEditors: feizzer
 * @LastEditTime: 2022-10-04 21:15:00
 * @Description: 
 */
window.exports = {
    "pushcon": { // 注意：键对应的是 plugin.json 中的 features.code
       mode: "none",  // 用于无需 UI 显示，执行一些简单的代码
       args: {
          // 进入插件应用时调用
          enter: (action) => {
            var fs = require('fs')
             var inputRes = window.utools.setSubInput((text) => {

                window.document.onkeydown = function(event) {
                    if (event.key == 'Enter') {
                        writeIntoFile(text.text)
                        console.log(text)
                        window.utools.outPlugin()
                        window.utools.hideMainWindow()
                    }
                }
             }, "text you content", true)

             console.log(inputRes)
          }  
       } 
    },
    "getcon": {
        mode: "none",
        args: {
            enter: (action) => {
                res = readFromFile()
                utools.copyText(res)
                window.utools.outPlugin()
                window.utools.hideMainWindow()
            }
        }
    },
    "pushcon2": {
        mode: "none",
        args: {
            enter: (action) => {
                writeIntoFile(action.payload)
                window.utools.outPlugin()
                window.utools.hideMainWindow()
            }
        }
    }
 }

 var filePath = '//10.200.6.10/hillstonenet/yongjianwu/content.txt'
 function writeIntoFile(text) {
    var fs = require('fs')
    fs.writeFileSync(filePath, text, 'utf8')
 }

 function readFromFile() {
    var fs = require('fs')
    res = fs.readFileSync(filePath, 'utf8')
    return res
 }


