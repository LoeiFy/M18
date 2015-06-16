var cn = "太容易的路，可能根本不能带你去任何地方",
    en = "Too easy way, may simply can't take you anywhere";

var request = new XMLHttpRequest();
//request.open('GET', 'http://www/test.php?q='+ decodeURIComponent(cn), true)
request.open('GET', 'http://lorem.themex.net/api/data.php?f=rand', true)

request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        console.log(request.responseText)
    } else {
    }
}
request.send()

document.addEventListener('DOMContentLoaded', function() {

    var file = document.getElementById('file'),
        canvas = document.getElementById('canvas'),
        download = document.getElementById('download'),
        select = document.getElementById('select'),
        enter = document.getElementById('enter'),
        chinese = document.getElementById('chinese'),
        english = document.getElementById('english');

    var reader = new FileReader(),
        image = new Image(),
        fileData,
        context;

    select.addEventListener('click', function() {
        file.click()
    }, false)

    file.addEventListener('change', function(e) {
        fileData = e.target.files[0];
        select.innerHTML = fileData.name;
    })

    enter.addEventListener('click', function() {
        var cn = chinese.value,
            en = english.value;

        if (!fileData) {
            alert('please select an image')
            return
        }

        if (cn.length <= 0 || en.length <= 0) {
            alert('no subtitle')
            return
        }

        reader.readAsDataURL(fileData)
        reader.onload = function(e) {
            image.src = e.target.result;
            image.onload = function() {
                // render image
                canvas.width = image.width;
                canvas.height = image.height;

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
            }
        }
    }, false)

    select.addEventListener('dragover', function(e) {
        e.preventDefault()
        this.style.background = '#eee';
    }, false)

    select.addEventListener('dragleave', function(e) {
        e.preventDefault()
        this.style.background = '#fff';
    }, false)

    select.addEventListener('drop', function(e) {
        e.preventDefault()
        fileData = e.dataTransfer.files[0];
        this.innerHTML = fileData.name;
        this.style.background = '#fff';
    }, false)

})
