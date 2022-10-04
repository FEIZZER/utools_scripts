/*
 * @Author: feizzer
 * @Date: 2022-10-04 16:26:12
 * @LastEditors: feizzer
 * @LastEditTime: 2022-10-04 16:26:12
 * @Description: 
 */
const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16 | 0
    let v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
  utools.copyText(uuid)
  utools.simulateKeyboardTap('v', utools.isMacOs() ? 'command' : 'ctrl')
