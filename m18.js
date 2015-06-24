
var api = 'http://lorem.themex.net/api/';

function ajax(url, callback, error) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true)

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            callback(request.responseText)
        } else {
            error()
        }
    }
    request.onerror = function() {
        error()
    }
    request.send()
}

function note(s) {
    var t,
        n = document.getElementById('note'), 
        p = document.querySelectorAll('#note p')[0];

    clearTimeout(t)
    n.classList.remove('active')

    p.innerHTML = s;
    n.classList.add('active')

    t = setTimeout(function() {
        n.classList.remove('active')
    }, 1500)
}

document.addEventListener('DOMContentLoaded', function() {

    var file = document.getElementById('file'),
        canvas = document.getElementById('canvas'),
        download = document.getElementById('download'),
        select = document.getElementById('select'),
        enter = document.getElementById('enter'),
        chinese = document.getElementById('chinese'),
        english = document.getElementById('english'),
        rand = document.getElementById('rand'),
        cover = document.getElementById('cover'),
        back = document.getElementById('back'),
        translate = document.getElementById('translate');

    var reader = new FileReader(),
        image = new Image(),
        fileData,
        context;

    rand.addEventListener('click', function() {
        ajax(api +'data.php?f=rand', function(data) {
            chinese.value = JSON.parse(data).hitokoto
        }, function() {
            note('出错了，请自己填写中文吧 :)')
        })
    }, false)

    translate.addEventListener('click', function() {
        var cn = chinese.value;
        if (cn.length <= 0) {
            note('没有要翻译的中文 :)')
            return
        }
        ajax(api +'data.php?f=translate&q='+ decodeURIComponent(cn), function(data) {
            data = JSON.parse(data);
            if (parseInt(data.errorCode) === 0) {
                english.value = data.translation[0]
            } else {
                note('有道翻译有问题，请检查下文字或者自行翻译 :)')
            }
        }, function() {
            note('请求有道翻译挂了，请自行翻译 :)')
        })
    }, false)

    select.addEventListener('click', function() {
        file.click()
    }, false)

    file.addEventListener('change', function(e) {
        fileData = e.target.files[0];
        select.innerHTML = '已选择：'+ fileData.name;
        select.classList.add('active')
    })

    enter.addEventListener('click', function() {
        var cn = chinese.value,
            en = english.value;

        if (!fileData) {
            note('请选择图片 :)')
            return
        }

        if (cn.length <= 0 || en.length <= 0) {
            note('中英文字幕没有填写完整 :)')
            return
        }

        reader.readAsDataURL(fileData)
        reader.onload = function(e) {
            image.src = e.target.result;
            image.onload = function() {
                // render image
                canvas.width = image.width;
                canvas.height = image.height;
                //canvas.style.width = image.width +'px';
                //canvas.style.height = image.height +'px';

                context = canvas.getContext('2d');
                context.drawImage(image, 0, 0)

                // render text
                context.shadowColor = 'black';
                context.shadowOffsetX = 1;
                context.shadowOffsetY = 1;
                context.shadowBlur = 3;
                context.fillStyle = 'white';

                // chinese
                context.beginPath()
                context.font = 'normal 20px Lucida Grande, Helvetica Neue, Helvetica, Arial';

                var cnArea = context.measureText(cn);
                context.fillText(cn, canvas.width / 2 - cnArea.width / 2, canvas.height - 20 - 20 * 1.5)

                // english
                context.beginPath()
                context.font = 'normal 14px Lucida Grande, Helvetica Neue, Helvetica, Arial';

                var enArea = context.measureText(en);
                context.fillText(en, canvas.width / 2 - enArea.width / 2, canvas.height - 5 - 14 * 1.5)

                // download link
                download.href = canvas.toDataURL();
                cover.classList.add('active')

            }
        }
    }, false)

    back.addEventListener('click', function(e) {
        cover.classList.remove('active')
    }, false)

    select.addEventListener('dragover', function(e) {
        e.preventDefault()
        this.classList.add('active')
    }, false)

    select.addEventListener('dragleave', function(e) {
        e.preventDefault()
        this.classList.remove('active')
    }, false)

    select.addEventListener('drop', function(e) {
        e.preventDefault()
        fileData = e.dataTransfer.files[0];
        this.innerHTML = '已选择：'+ fileData.name;
        this.classList.add('active')
    }, false)

})
