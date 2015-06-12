var cn = "太容易的路，可能根本不能带你去任何地方",
    en = "Too easy way, may simply can't take you anywhere";

/*
var request = new XMLHttpRequest();
request.open('GET', 'http://www/test.php?q='+ decodeURIComponent(cn), true)

request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        console.log(request.responseText)
    } else {
    }
}
request.send()
*/
document.addEventListener('DOMContentLoaded', function() {

    var reader = new FileReader(),
        image = new Image(),
        file = document.getElementById('file'),
        canvas = document.getElementById('canvas'),
        download = document.getElementById('download'),
        select = document.getElementById('select'),
        chinese = document.getElementById('chinese'),
        english = document.getElementById('english');

    select.addEventListener('click', function() {
        file.click()
    }, false)        

})

/*
document.getElementById('image').addEventListener('change', function(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0])

    reader.onload = function(o) {
        var image = new Image();
        image.src = o.target.result;

        image.onload = function() {
            var canvas = document.getElementById('canvas');
            canvas.width = image.width;
            canvas.height = image.height;

            var context = canvas.getContext('2d');
            context.drawImage(image, 0, 0)

            context.shadowColor = "black";
            context.shadowOffsetX = 1;
            context.shadowOffsetY = 1;
            context.shadowBlur = 3;

            context.beginPath()
            context.font = 'normal 20px Lucida Grande, Helvetica Neue, Helvetica, Arial';
            context.fillStyle = 'white';
            var cnwh = context.measureText(cn);
            if (cnwh.width >= canvas.width) console.log('too wide');
            context.fillText(cn, canvas.width / 2 - cnwh.width / 2, canvas.height - 20 - 20 * 1.5)

            context.beginPath()
            context.font = 'normal 14px Lucida Grande, Helvetica Neue, Helvetica, Arial';
            context.fillStyle = 'white';
            var enwh = context.measureText(en);
            if (enwh.width >= canvas.width) console.log('too wide');
            context.fillText(en, canvas.width / 2 - enwh.width / 2, canvas.height - 5 - 14 * 1.5)

            var dataURL = canvas.toDataURL();
            document.getElementById('download').href = dataURL;
        }
    } 
}, false)
*/
