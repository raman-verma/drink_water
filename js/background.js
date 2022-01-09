// chrome.alarms.onAlarm.addListener(function(alarm) {
//     alert("Beep");
// });
console.log(document.domain); //It outputs id of extension to console

var counter = 0
    // // listener listen to the chrome.alarms.create
chrome.alarms.onAlarm.addListener((alarm) => {
    console.log("in background")
    counter += 1
    if (alarm.name === "myAlarm") {
        chrome.notifications.create('', {
            title: 'Just wanted to notify you',
            message: 'How great it is!',
            iconUrl: 'images/get_started16.png',
            type: 'basic'
        });
    }
});

// getting message from runtime
chrome.runtime.onMessage.addListener(data => {
    // if (data.type === 'notification') {
    //     chrome.notifications.create('', data.options);
    // }
    if (data.data === 'reload') {
        chrome.runtime.reload();
        alert("reload");
    }

    // test condition to get call from pop <==> background
    if (data.data == "Handshake") {
        chrome.runtime.sendMessage({ data: "check" }, function(response) {});
    }
});

chrome.runtime.onInstalled.addListener((_reason) => {
    chrome.tabs.create({
        url: 'pages/welcomepage.html'
    });
});

// listener: Whenever anything changes in storage
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value was "${oldValue}", new value is "${newValue}".`
        );
    }
});