// src/embeddedjs/file.ts
import Poco from "commodetto/Poco";
import Button from "pebble/button";
console.log("Hello, Watchface.");
var render = new Poco(screen);
var font = new render.Font("Gothic-Regular", 28);
//TODO: Make these colors configurable - There's a "Settings" button on the Pebble App Store app page.
//TODO: Can there be an in-app light-mode/dark-mode switch?
var backgroundColor = render.makeColor(0, 0, 0);
var textColor = render.makeColor(255, 255, 255);
//var highlightColor = render.makeColor(150, 90, 235);

var NATO_ALPHABET = [
    "Alpha",
    "Bravo",
    "Charlie",
    "Delta",
    "Echo",
    "Foxtrot",
    "Golf",
    "Hotel",
    "India",
    "Juliett",
    "Kilo",
    "Lima",
    "Mike",
    "November",
    "Oscar",
    "Papa",
    "Quebec",
    "Romeo",
    "Sierra",
    "Tango",
    "Uniform",
    "Victor",
    "Whiskey",
    "X-ray",
    "Yankee",
    "Zulu"
];
var currentTopIndex = 0;
var totalViewableCount = 0;
function showList(startIndex = 0) {
    if(startIndex < 0 || startIndex >= NATO_ALPHABET.length)
        return;
    render.begin();
    render.fillRectangle(backgroundColor, 0, 0, render.width, render.height);
    //TODO: Let's make it taller, so we only have 7 rows per screen.  Touch-friendly is a priority for stretch goals.
    const height = font.height;
    let currentHeight = 2;
    let columnIndex = 0;
    for(let i = startIndex; i < NATO_ALPHABET.length; i++) {
        const curr = NATO_ALPHABET[i];
        render.drawText(curr, font, textColor, columnIndex, currentHeight);
        currentHeight += height;
        if(currentHeight + height >= render.height) {
            if(columnIndex > 0) {
                //this means it is the bottom of column 2, so stop.
                if(totalViewableCount === 0) { //TODO: Calculate this up-front
                    totalViewableCount = i;
                }
                break;
            }
            columnIndex = render.width / 2;
            currentHeight = 2;
        }
    }
    currentTopIndex = startIndex;
    render.end();
}
new Button({
    types: ["up", "down"],
    onPush(down, type) {
        console.log(`Button ${type} is ${down}`);
        if(down) {
            let desiredDestination = 0;
            let actualDestination = 0;
            switch(type) {
                case "up":
                    desiredDestination = currentTopIndex - totalViewableCount;
                    actualDestination = Math.max(0, desiredDestination);
                    break;
                case "down":
                    desiredDestination = currentTopIndex + totalViewableCount;
                    actualDestination = Math.min(NATO_ALPHABET.length, desiredDestination);
                    break;
            }
            console.log("desiredDestination: " + desiredDestination);
            console.log("actualDestination: " + actualDestination);
            showList(actualDestination);
        }
    }
});
showList();