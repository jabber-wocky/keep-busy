const robot = require('robotjs');

robot.setMouseDelay(2);

var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) -10;
var width = screenSize.width;

function doSetTimeout() {
    setTimeout(function() {
        for (var x=0; x < width; x++) {
            y = height * Math.sin((twoPI * x) / width) + height;
            robot.moveMouse(x,y);
        }

        robot.typeString("The quick brown fox jumped over the lazy dog.");
        robot.keyTap("enter");
        robot.keyToggle("shift", "down");
        robot.keyTap("up");
        robot.keyToggle("shift", "up");
        robot.keyTap("backspace");

        doSetTimeout();
    }, 60000);
}

robot.keyToggle("command", "down");
robot.keyTap("r");
robot.keyToggle("command", "up");
robot.typeString("notepad");
robot.keyTap("enter");

doSetTimeout();