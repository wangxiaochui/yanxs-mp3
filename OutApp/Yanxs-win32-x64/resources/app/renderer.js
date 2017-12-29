// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var fs = require('fs')
var settings = require('./setting')
const ipc =  require('electron').ipcRenderer;

var renderer = {
    loadFile : function(){
        //调用dialog是主进程模块，需要与主进程通信
        ipc.send('open-file-dialog')
    
      
    },
    loadPage : function(id){

       $('.main-right').load('./sections/'+id+'.html')
    }
};

ipc.on('selected-directory', function(event, path){
    console.log(path);
    path.forEach(function(v, index) {
        let fileName=v.substr(v.lastIndexOf('\\')+1);  
        //console.log(v)
        $('#list').find('ul').prepend("<li data-path='"+path+"' data-id='"+index+"' data-name='"+fileName+"'><img class='yc dh' src='./static/tb.gif'> &nbsp;"+fileName.substring(fileName.indexOf('.'),0,fileName.length)+"</li>")
        
    });
})

module.exports =  renderer;