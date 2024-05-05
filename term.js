export function Term(selector, settings) {
    const termSettings = {
        outputClass: "output",
    }
    if (settings) {

        if (settings.outputClass) {
            termSettings.outputClass = settings.outputClass;
        }
    }

    function addOutputContainer() {
        const id = "output";
        const output = document.createElement("span");
        output.id = id;
        output.classList.add(termSettings.outputClass);
        selector.appendChild(output);
        return output;
    }

    const output = addOutputContainer();
    function print(text, cssClass) {
        const printElement =  document.createElement("pre");
        printElement.innerText = text;
        if (cssClass) {
            printElement.classList.add(cssClass);
        }
        output.appendChild(printElement);
    }

    return {
        print: print,
    };
}
