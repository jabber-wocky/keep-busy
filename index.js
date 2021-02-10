const robot = require('robotjs');
const ioHook = require('iohook');

ioHook.on('keydown', (event) => {
    if (event.keycode == 1) {
        process.exit();
    }
});
ioHook.start();

robot.setMouseDelay(2);
var mouseMovement = 25;
var lastMouse = null;

function checkMousePosition() {
    var mouse = robot.getMousePos();
    if (mouse.x == lastMouse.x && mouse.y == lastMouse.y){
        moveMouse();
        return;
    }
    lastMouse = mouse;
    process.stdout.write(`${getTime()} Move detected - skipping for 5 minutes.                      \r`);
    setTimeout(checkMousePosition, 300000);
}


function moveMouse() {
    var mouse = robot.getMousePos();
    mouseMovement = mouseMovement * -1;
    robot.moveMouse(mouse.x - mouseMovement,mouse.y);
    process.stdout.write(`${getTime()} moved mouse to  (${mouse.x - mouseMovement},${mouse.y})       \r`);
    lastMouse = robot.getMousePos();
    setTimeout(checkMousePosition, 5000);
}

function getTime() {
    var currentdate = new Date(); 
    return `[${("0" + currentdate.getHours()).slice(-2)}:${("0" + currentdate.getMinutes()).slice(-2)}:${("0" + currentdate.getSeconds()).slice(-2)}]`;
}

console.log("Starting...");
moveMouse()
