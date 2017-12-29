const electron = require('electron')
var ipc = electron.ipcMain
const dialog = require('electron').dialog

//本地添加音乐文件监听
ipc.on('open-file-dialog', function(event){
    dialog.showOpenDialog({
        properties: ['openFile','multiSelections'],
        filter : [{ name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] }]
      }, function (files) {
        if (files) event.sender.send('selected-directory', files)
      })
})
