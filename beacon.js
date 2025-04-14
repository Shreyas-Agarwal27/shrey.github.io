document.addEventListener("DOMContentLoaded", function () {
    sendEventData("view", "Page Load");

    document.body.addEventListener("click", function (event) {
        let target = event.target;
        let objectType = getElementType(target);
        sendEventData("click", objectType);
    });
});

function getElementType(element) {
    if (element.closest("a")) return "Link";
    if (element.closest("button")) return "Button";
    if (element.closest("img")) return "Image";
    if (element.closest("input")) return "Input Field";
    if (element.closest("textarea")) return "Text Area";
    return "Text/Other";
}

function sendEventData(eventType, objectType) {
    let timestamp = new Date().toISOString();
    
    let data = `${timestamp}, ${eventType}, ${objectType}`;
    console.log(data);
}
