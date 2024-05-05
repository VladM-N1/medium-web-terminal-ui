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
