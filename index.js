import {Term} from "./term.js";

const settings = {
    promptClass: "custom-prompt",
    promptInputClass: "custom-input"
};
const selector = document.getElementById("terminal");
const term = Term(selector, settings);
term.print("Hello World");
term.print("Custom Styled Text", "success");
term.drawPrompt();
function inputCallback(event) {
    if (event.key === 'Enter') {
        term.print(`You entered: ${event.text}`)
        term.drawPrompt(true);
    }
}
term.registerInputCallback(inputCallback);
