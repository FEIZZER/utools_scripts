window.exports = {
   "gitpush": { // 注意：键对应的是 plugin.json 中的 features.code
      mode: "list",  // 用于无需 UI 显示，执行一些简单的代码
      args: {
         // 进入插件应用时调用（可选）
         enter: (action, callbackSetList) => {
            // 如果进入插件应用就要显示列表数据
            var projects = getProjectFromDBAll()
            var list = []
            projects.forEach(element => {
               list.push({
                  title: element._id,
                  description: element.uri,
                  icon: ''
               })
            });
            callbackSetList(list)
         },
         // 子输入框内容变化时被调用 可选 (未设置则无搜索)
         search: (action, searchWord, callbackSetList) => {
            var proejcts = getProjectFromDBAll()
            callbackSetList([
               {
                  title: '这是标题2',
                  description: '这是描述',
                  icon: '', // 图标
                  url: 'https://yuanliao.info'
               }
            ])
         },
         // 用户选择列表中某个条目时被调用
         select: (action, itemData, callbackSetList) => {
            var err = addCommitPushProject(itemData.description)
            if (err != "") {
               utools.showNotification(err)
            } else {
               utools.showNotification(`项目${itemData.title}已提交`)
            }
            // window.utools.hideMainWindow()
            // window.utools.outPlugin()
         },
         // 子输入框为空时的占位符，默认为字符串"搜索"
         placeholder: "搜索"
      }
   },
   "gitsetproject": {
      mode: "none",
      args: {
         enter: (action) => {
            var projectNamePlaceHolderStr = "输入新项目的项目名， 不可重复"
            window.utools.setSubInput((text) => {
               window.document.onkeydown = function (event) {
                  if (event.key == 'Enter') {
                     var res = getProjectFromDBByName(text.text)
                     if (res != null) {
                        window.utools.setSubInputValue("项目名已经存在了")
                        window.utools.subInputSelect()
                     } else {
                        var directories = utools.showOpenDialog({ 
                           properties: ['openDirectory'] 
                        })
                        if (directories == null) {
                           return
                        }
                        if (directories.length != 1) {
                           window.utools.setSubInputValue("选择了太多路径")
                           window.utools.subInputSelect()
                        } else {
                           setProjectToDB(text.text, directories[0])
                        }
                     }
                  }
               }
            }, projectNamePlaceHolderStr, true)
         }
      }
   }
}

function setProjectToDB(projectName, projectURI) {
   utools.db.put({
      _id: "gitProject_" + projectName,
      uri: projectURI
   })
}

function getProjectFromDBAll() {
   var res = utools.db.allDocs("gitProject_")
   return res
}

function getProjectFromDBByName(projectName) {
   var res = utools.db.get("gitProject_" + projectName)
   return res
}

function addCommitPushProject(dir) {
   var child_process = require('child_process')
   var info = getGitStatus(dir)
   if (info.needCommit) {
      var err = child_process.execSync('git add .', {cwd: dir})
      if (err.toString() != "") {
         return err.toString()
      }
      var timeStr = formatDateTime(new Date()) + ":pencil:"
      err = child_process.execSync(`git commit -m \" ${timeStr} \"`, {cwd: dir})
      if (err.toString.indexOf(timeStr) !== -1) {
         return err.toString()
      }
   }
   if (info.needPush || info.needCommit) {
      err = child_process.execSync(`git push`, {cwd: dir})
      return err.toString()
   }
   return ""
 
}
function getGitStatus(dir) {
   var child_process = require('child_process')
   var err = child_process.execSync('git status', {cwd: dir})
   var info = err.toString()
   console.log("git status", info)
   return {
      needCommit: info.indexOf("nothing to commit") === -1,
      needPush:   info.indexOf("Your branch is up to date with") === -1,
   }
}


var formatDateTime = function (date) {
   var y = date.getFullYear(); 
   var m = date.getMonth() + 1;  
   m = m < 10 ? ('0' + m) : m;  
   var d = date.getDate();  
   d = d < 10 ? ('0' + d) : d;  
   var h = date.getHours();  
   h=h < 10 ? ('0' + h) : h;  
   var minute = date.getMinutes();  
   minute = minute < 10 ? ('0' + minute) : minute;  
   var second=date.getSeconds();  
   second=second < 10 ? ('0' + second) : second;  
   return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second; 
}