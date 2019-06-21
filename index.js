// Include Express Framework
const express = require('express')
// Create WebApp Server
const app = express()
var http = require('http').createServer(app);
const Jimp = require('jimp')
const path = require('path')
const port = process.env.PORT || 4000;
const execSync = require('child_process').execSync;
const exec = require('child_process').exec;
const spawn  = require('child_process').spawn;

const server = http.listen(port, () => {
    console.log('Server listening on port: ' + port);
});


const grid = [
    [10, 50, 300, 300],
    [350, 50, 300, 300],
    [720, 50, 300, 300],
    [1100, 50, 300, 300],

    [20, 410, 300, 300],
    [370, 410, 300, 300],
    [725, 410, 300, 300],
    [1090, 410, 300, 300],

    [60, 750, 300, 300],
    [390, 750, 300, 300],
    [725, 750, 300, 300],
    [1060, 750, 300, 300],

    [60, 1065, 300, 300],
    [390, 1065, 300, 300],
    [725, 1065, 300, 300],
    [1060, 1065, 300, 300],
]

app.get('/shake', function (req, res, next) {
imageRecognize()
    exec('python /home/pi/wordcosmos-server/shaker.py', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    })

    setTimeout(function () {
        console.log('capture image')

        exec('sudo raspistill -o /home/pi/wordcosmos/img_capture/capture.jpg', (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                sliceImage()
                return;
            }
            console.log(stdout);

            sliceImage()
        })


    }, 25000);

});

function sliceImage() {
    Jimp.read('./img_capture/capture.jpg', (err, image) => {
        if (err) throw err;
        image
            .rotate(72)
            .crop(830, 950, 1450, 1400)
            .write('./img_rotate/capture.jpg')

        dice(0, 'capture.jpg')

    })
}


var dice = function (x, img) {
    if (grid.length > x) {

        Jimp.read('./img_rotate/' + img)
            .then(image => {
                imageName = img
                imageSliceName = imageName.substring(0, imageName.indexOf('.'))
                image.crop(grid[x][0], grid[x][1], grid[x][2], grid[x][3])
                    .write('./img_slice/' + imageSliceName + '_' + x + '.jpg', function () {
                        x += 1
                        console.log('/img_slice/' + imageSliceName + '_' + x + '.jpg')
                        dice(x, img)
                    })
            })
    }

    else{
        imageRecognize()
    }
}

var imageRecognize = function () {
    
   
    execSync('python label_image.py', (err, stdout, stderr, status) => {

       
        if (err) {
            console.error(err);
            return;
        }
        if(stderr){
            console.error(stderr)
        }
        console.log(stdout);
        console.log(status);
    })


    // const pyProg = spawn('python', ['./label_image.py']);

    // pyProg.stdout.on('data', function(data) {

    //     console.log(data.toString());
    //     res.write(data);
    //     res.end('end');
    // });

    console.log('IMAGE RECOGNITION')
}