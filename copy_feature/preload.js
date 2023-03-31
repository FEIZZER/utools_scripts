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
    "pushcon": {
        mode: "none",
        args: {
            enter: (action) => {
                writeIntoFile(action.payload)
                window.utools.outPlugin()
                window.utools.hideMainWindow()
            }
        }
    },
    "pushImg":{
        mode: "none",
        args: {
            enter: (action) => {
                writeIntoImage(action.payload)
                window.utools.outPlugin()
                window.utools.hideMainWindow()
            }
        }
    },
    "getImg": {
        mode: "none",
        args: {
            enter: () => {
                buffer = readFromImage()
                utools.copyImage(buffer)
                console.log(buffer)
                window.utools.outPlugin()
                window.utools.hideMainWindow()
            }
        }
    }
 }


var fs = require('fs')

 var filePath = '//10.200.6.10/hillstonenet/yqluo/content.txt'
 function writeIntoFile(text) {
    fs.writeFileSync(filePath, text, 'utf8')
 }

 function readFromFile() {
    res = fs.readFileSync(filePath, 'utf8')
    return res
 }

 function readFromImage() {
    const buffer = fs.readFileSync(filePath, 'utf8')
    return buffer
 }

function writeIntoImage(buffer) {
    writeIntoFile(buffer)
}
