/**
 * Created by yanxs on 2017/10/18.
 */
var dir = "D:/music";
var j = 0;
var active = '';
var path = require('path')

//打开本地文件
$('#btn-local').on('click',function(){
    render.loadFile()
})

//点击左边菜单触发
$('.menu-list').on('click', function(){
    $('.menu-active').removeClass('menu-active');
    $(this).find('span').addClass('menu-active')
    let flag = $(this).attr('data-flag');
    render.loadPage(flag);
})

//获取本地文件列表
fs.readdir(dir,function(err,files){
    for(i in files){
        var fileName = files[i];
        $('#list').find('ul').append("<li data-id='"+i+"' data-name='"+fileName+"'><img class='yc dh' src='./static/tb.gif'> &nbsp;"+fileName.substring(fileName.indexOf('.'),0,fileName.length)+"</li>")
    }
    fs.exists(dir+'/'+files[0],function(exists){
        if(exists){
            $('#media').attr('src',dir+'/'+files[0]);
            $('#list').find('li').eq(0).trigger('click');
        }
    })

    //playAudio(j);
})


var media = $("#media");
var audioTimer = null;
var curTime = null;

//var progressLeft = $('#progress').offset().left;


//监听音频时长
$('#media').on('canplay', function(){
    audioTimer = media.duration
})

//进度条与当前时间显示
var interval = setInterval(function(){
    var widthline =   Math.round(media.currentTime)/Math.round(audioTimer) * 100;

    var formatCur =  Math.round(media.currentTime)
    var formatTotal = Math.round(audioTimer);


    $('.is-play').css('width',widthline+'%')
    $('.total-time').html(Math.floor(formatTotal/60)+":"+(formatTotal%60/100).toFixed(2).slice(-2))
    $('.cur-time').html(Math.floor(formatCur/60)+":"+(formatCur%60/100).toFixed(2).slice(-2));

    //当前项结束
    if(media.ended){
        //console.log('ended')
        var js = $('.active').attr('data-id');

        $('.active').next().trigger('click');
    }
},1000)

//播放指定点的内容
$('.progress').on('click',function(e){
    //console.log('hahah')
    var clickLeft = parseFloat(e.offsetX) ;
    var totalWidth = parseFloat($('.progress').width());

    //var progressWidth = clickLeft - progressLeft;
    console.log(clickLeft/totalWidth)
    $('.is-play').css('width',clickLeft/totalWidth*100+'%');

    //计算当前时间
    var cur = Math.round(audioTimer) *(clickLeft/totalWidth);
    $('.cur-time').html(Math.floor(cur/60)+":"+(cur%60/100).toFixed(2).slice(-2))
    media.currentTime = cur
})

//上一首 下一首控制
$('.crtl-left').on('click', function(){
    $('.active').prev().trigger('click');
})

$('.crtl-right').on('click', function(){
    $('.active').next().trigger('click');
})



//绑定点击条目事件
$('#list').delegate('li','click',function(){
    console.log('aaa')
    $('li').removeClass('active');
    $('.dh').removeClass('show');
    $(this).addClass('active')
    $(this).find('.dh').addClass('show')
    if(typeof ($(this).attr('data-path')) != 'undefined'){
        $('#media').attr('src',$(this).attr('data-path'))
    }else{
        $('#media').attr('src',dir+'/'+$(this).attr('data-name'))
    }

    media = document.getElementById("media");


    playAudio(j);
})
//绑定播放暂停控制
$('.crtl-center').bind('click', function() {
    playAudio();
});

//播放暂停切换
function playAudio(i) {

    if(media.paused) {
        play();
    } else {
        pause();
    }
}

//播放
function play() {
    media.play();
    // $('#play').html('Pause');
    $('.crtl-center').attr('src','./static/play.png')
}

//暂停
function pause() {
    media.pause();
    //$('#play').html('Play');
    $('.crtl-center').attr('src','./static/pause.png')
}


$('#btn-net').click(function(){
//七牛云资源
    var qn = require('./qn')
    var bucket = "yanxs"
    var options = {
        limit: 10
    };
    qn.bucketManager().listPrefix(bucket,options,function(err, respBody, respInfo){
        var url = 'http://7xqm5v.com1.z0.glb.clouddn.com';
        if (err) {
            console.log(err);
            throw err;
        }
        if (respInfo.statusCode == 200) {
            //如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
            //指定options里面的marker为这个值
            var nextMarker = respBody.marker;
            var commonPrefixes = respBody.commonPrefixes;
            var items = respBody.items;
            items.forEach(function(item,index) {
                var path = url+'/'+item.key;
                console.log(item.key);
                $('#list').find('ul').prepend("<li data-path='"+path+"' data-id='"+index+"' data-name='"+item.key+"'><img class='yc dh' src='./static/tb.gif'> &nbsp;"+item.key.substring(item.key.indexOf('.'),0,item.key.length)+"</li>")

            });
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    })
})
