
function copyTextToClipboard(text) {

    var myText = text;
    var successText = "In Zwischenablage kopiert";
    var errorText = "Konnte nicht kopiert werden: ";

    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(myText);
        return;
    }
    navigator.clipboard.writeText(myText).then(
        function () {
            M.toast({html: successText })
        },
        function (err) {
            var msg = errorText + err;
            console.error(msg);
            M.toast({html: msg, classes: 'red'});
        }
    );

    // -- inner function

    function fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand("copy");
            var msg = successful ? "successful" : "unsuccessful";
            showToast({ html: successText });
        } catch (err) {
            var msg = errorText + err;
            console.error(msg);
            showErrorToast(msg);
        }

        document.body.removeChild(textArea);
    }
}