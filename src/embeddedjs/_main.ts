// src/embeddedjs/file.ts
import Poco from "commodetto/Poco";
import Button from "pebble/button";
import Message from "pebble/message";

import { DEFAULT_BACKGROUND_COLOR, DEFAULT_TEXT_COLOR } from "./consts";


console.log("Hello, Watchface.");
var render = new Poco(screen);

var font = new render.Font("Gothic-Regular", 28);

var backgroundColor = DEFAULT_BACKGROUND_COLOR;
var textColor = DEFAULT_TEXT_COLOR;
var isDarkMode = true;

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

new Button({
    types: ["select"],
    onPush(down, type) {
        console.log(`Button ${type} is ${down}`);
        if(down){
            if(isDarkMode) {
                backgroundColor = render.makeColor(255, 255, 255);
                textColor = render.makeColor(0,0,0);
            }
            else{
                backgroundColor = render.makeColor(0,0,0);
                textColor = render.makeColor(255, 255, 255);
            }
            showList(currentTopIndex);
            isDarkMode = !isDarkMode;
        }
    }
});

const message = new Message({
    keys: ["BackgroundColor", "ForegroundColor"],
    onReadable() {
        console.log("Received message from phone.");
        var messages = message.read();
        messages.forEach((value, key) => {
            console.log(`Received message with key: ${key} and value: ${value}`);
            console.log("Current background color: " + backgroundColor);
            console.log("Current text color: " + textColor);
            var num = Number(value); 
          
            //The example below are for color white 0xFFFFFF, but it works for any color.

            // Doing something like >> 16 moves the bits to the left getting just the first 8 of a 24 bit string.
            // so for example, the color white is 0xFFFFFF, in bynary that is 11111111 11111111 11111111. 
            // If we do >> 16, we get 00000000 00000000 11111111, which is just the red value.
            // BUT, we don't trust the user to gives a 24 bit number ALL the time.
            // so what we do is a bit-AND on 256, which gives us 00000000 00000000 11111111, which is just the red value,
            //  even if the user gives us a number with more than 24 bits.

            // same goes to get the green value, but we do >> 8,
            // which gives us 00000000 11111111 11111111, and then we can just take the last 8 bits to get the value.
            // do do that a bit-AND, on 256, 0's the bits that come before the last 8, and leaves the last 8 bits as they are.
            // So we get 00000000 00000000 11111111, which is just the green value.

            //Last but not least the blue value. 
            // to do that, we just blank 00 the bits before the last 8, 
            // and leave the last 8 bits as they are, which gives us 00000000 00000000 11111111, which is just the blue value.

            // if this is to confusing for you, you can do:
            // const numInString = num.toString(2).padStart(24, '0').substring(0, 24); // Convert to string and pad with zeros if necessary
            // console.log("numInString: " + numInString);
            // const r = parseInt(numInString.substring(0, 8),2); //get first 8 digits.
            // const g = parseInt(numInString.substring(8, 16),2); //get middle 8 digits.
            // const b = parseInt(numInString.substring(16, 24),2); //get last 8 digits.


            const r = (num >> 16) & 0xFF; 
            const g = (num >> 8) & 0xFF; 
            const b = num & 0xFF;
            switch(key) {
                case "BackgroundColor":
                    backgroundColor = render.makeColor(r, g, b);
                    break;
                case "ForegroundColor":
                    textColor = render.makeColor(r, g, b);
                    break;
            }
            console.log("Updated background color: " + backgroundColor);
            console.log("Updated text color: " + textColor);
        });

        localStorage.setItem("BackgroundColor", backgroundColor);
        localStorage.setItem("ForegroundColor", textColor);

        showList(currentTopIndex);
    },
});

console.log(watch.light);
var backColor = localStorage.getItem("BackgroundColor");
var foreColor = localStorage.getItem("ForegroundColor");
if(backColor) {
    backgroundColor = backColor;
}
else{
    backgroundColor = DEFAULT_BACKGROUND_COLOR;
}
if(foreColor) {
    textColor = foreColor;
}
else{
    textColor = DEFAULT_TEXT_COLOR;
}


showList();