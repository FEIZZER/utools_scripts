/*
 * @Author: feizzer
 * @Date: 2022-10-04 19:42:26
 * @LastEditors: feizzer
 * @LastEditTime: 2022-10-04 19:43:41
 * @Description: 
 */
if (ENTER.type === 'files') {
    if (!utools.copyImage(ENTER.payload[0].path)) return
  }
  utools.ubrowser.goto('https://www.remove.bg/zh/upload')
    .paste(ENTER.type === 'img' && ENTER.payload)
    .run({ width: 830, height: 680 })
