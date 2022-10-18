/*
 * @Author: feizzer
 * @Date: 2022-04-30 14:46:57
 * @LastEditors: feizzer
 * @LastEditTime: 2022-10-04 21:15:00
 * @Description: 
 */
window.exports = {
    "getTime": { // 注意：键对应的是 plugin.json 中的 features.code
       mode: "none",  // 用于无需 UI 显示，执行一些简单的代码
       args: {
          // 进入插件应用时调用
          enter: (action) => {
            timeNow = time.now()
          }  
       } 
    },
 }

