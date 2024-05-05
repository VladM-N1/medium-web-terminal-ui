import {Term} from "./term.js";
const settings = {
    promptClass: "custom-prompt",
    promptInputClass: "custom-input"
};
const selector = document.getElementById("terminal");
const term = Term(selector, settings);
const commands = [
    'help -- call help command',
    'ls -- list files',
    'art -- print ascii art',
    'clear -- clear input',
]

function print_commands() {
    for (const cmd of commands) {
        term.print(cmd);
    }
}

function art() {
    term.clear();
    term.print(
        `\n
        /$$      /$$           /$$             /$$$$$$$$                                /$$                     /$$        /$$$$$$  /$$   /$$ /$$$$$$
        | $$  /$ | $$          | $$            |__  $$__/                               |__/                    | $$       /$$__  $$| $$  | $$|_  $$_/
        | $$ /$$$| $$  /$$$$$$ | $$$$$$$          | $$  /$$$$$$   /$$$$$$  /$$$$$$/$$$$  /$$ /$$$$$$$   /$$$$$$ | $$      | $$  \\__/| $$  | $$  | $$  
        | $$/$$ $$ $$ /$$__  $$| $$__  $$         | $$ /$$__  $$ /$$__  $$| $$_  $$_  $$| $$| $$__  $$ |____  $$| $$      | $$ /$$$$| $$  | $$  | $$  
        | $$$$_  $$$$| $$$$$$$$| $$  \\ $$         | $$| $$$$$$$$| $$  \\__/| $$ \\ $$ \\ $$| $$| $$  \\ $$  /$$$$$$$| $$      | $$|_  $$| $$  | $$  | $$  
        | $$$/ \\  $$$| $$_____/| $$  | $$         | $$| $$_____/| $$      | $$ | $$ | $$| $$| $$  | $$ /$$__  $$| $$      | $$  \\ $$| $$  | $$  | $$  
        | $$/   \\  $$|  $$$$$$$| $$$$$$$/         | $$|  $$$$$$$| $$      | $$ | $$ | $$| $$| $$  | $$|  $$$$$$$| $$      |  $$$$$$/|  $$$$$$/ /$$$$$$
        |__/     \\__/ \\_______/|_______/          |__/ \\_______/|__/      |__/ |__/ |__/|__/|__/  |__/ \\_______/|__/       \\______/  \\______/ |______/
        \n`, "ascii");
    term.print("");
}

art();
term.print("Welcome to Web Terminal Playground");
term.print("Type help to start");
term.drawPrompt(true);
function ls() {
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
    ]
    term.printStyled({
        classList: ["folder-list"],
        elements: elements
    });
}
function inputCallback(event) {
    if (event.key === 'Enter') {

        switch (event.text) {
            case 'help': {
                print_commands();
                break;
            }
            case 'art': {
                art();
                break;
            }
            case 'ls': {
                ls();
                break;
            }
            case 'clear': {
                term.clear()
                break;
            }
            default: {
                term.print("command not found: " + event.text, "red");
                break;
            }
        }
        term.clearInput();
        term.drawPrompt(true);
    }
}
term.registerInputCallback(inputCallback);
