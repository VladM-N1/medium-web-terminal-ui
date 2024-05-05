import {Term} from "./term.js";

const settings = {
    promptClass: "custom-prompt",
    promptInputClass: "custom-input"
};
const selector = document.getElementById("terminal");
const term = Term(selector, settings);
term.print("Hello World");
term.print("Custom Styled Text", "success");
const elements = [
    {
        text: "folder1",
        type: "span",
        classList: ["red"]
    },
    {
        text: "folder2",
        type: "span",
        classList: ["green"]
    }
];
term.printStyled({
    classList: ["folder-list"],
    elements: elements
});
term.drawPrompt(true);
function inputCallback(event) {
    if (event.key === "Enter") {
        term.print(`You entered: ${event.text}`);
        term.clearInput();
        term.drawPrompt(true);
    }
}
term.registerInputCallback(inputCallback);
