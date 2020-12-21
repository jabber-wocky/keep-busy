const robot = require('robotjs');
const ioHook = require('iohook');

ioHook.on('keydown', (event) => {
    if (event.keycode == 1) {
        process.exit();
    }
});
ioHook.start();

robot.setMouseDelay(2);

var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) -10;
var width = screenSize.width;

function doSetTimeout() {
    setTimeout(function() {
        for (var x=0; x < width; x=x+10) {
            y = height * Math.sin((twoPI * x) / width) + height;
            robot.moveMouse(x,y);
        }
        openNotepad();
        robot.typeString("The quick brown fox jumped over the lazy dog.");
        closeNotepad();

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

function closeNotepad() {
    robot.keyToggle("alt", "down");
    robot.keyTap("f4");
    robot.keyToggle("alt", "up");
    robot.keyToggle("alt", "down");
    robot.keyTap("n");
    robot.keyToggle("alt", "up");
}

doSetTimeout();