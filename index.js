const robot = require('robotjs');
const iohook = require('iohook');

robot.setMouseDelay(2);

var mouseMovement = 50;

function doSetTimeout() {
    setTimeout(function() {
        var mouse = robot.getMousePos();
        mouseMovement = mouseMovement * -1;
        robot.moveMouse(mouse.x - mouseMovement, mouse.y);

        robot.typeString("Hi there");
        robot.keyTap("enter");
        robot.keyToggle("shift", "down");
        robot.keyTap("up");
        robot.keyToggle("shift", "up");
        robot.keyTap("backspace");

        doSetTimeout();
    }, 15000);
}

function openNotepad() {
    robot.keyToggle("command", "down");
    robot.keyTap("r");
    robot.keyToggle("command", "up");
    robot.typeString("notepad");
    robot.keyTap("enter");    
}

iohook.on("keypress", event => {
    if (event.rawcode == 27) {
        process.exit();
    }
});
iohook.start();

openNotepad();
doSetTimeout();