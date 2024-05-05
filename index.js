import {Term} from "./term.js";

const settings = {};
const selector = document.getElementById("terminal");
const term = Term(selector, settings);
term.print("Hello World");
term.print("Custom Styled Text", "success");
