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

function doSetTimeout() {
    setTimeout(function() {
        var mouse = robot.getMousePos();
        mouseMovement = mouseMovement * -1;
        robot.moveMouse(mouse.x - mouseMovement,mouse.y);
                
        doSetTimeout();
    }, 60000);
}
doSetTimeout();