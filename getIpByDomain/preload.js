window.exports = {
    "domainIP": { // 注意：键对应的是 plugin.json 中的 features.code
       mode: "none",  // 用于无需 UI 显示，执行一些简单的代码
       args: {
          // 进入插件应用时调用
            enter: (action) => {
                var dns = require('dns')
                dns.lookup(text.text, function(err, address) {
                    if (err) {
                        
                    } else {
                        utools.copyText(address)
                    }
                })
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
    }
 }