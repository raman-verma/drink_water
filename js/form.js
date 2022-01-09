var alertstate = {

    // remove any specific alert from list
    removeData: function(key) {
        chrome.storage.sync.remove([key], function() {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
            }
        });
    },

    // get any specific alert
    getData: function(key) {
        console.log("Get Store Alert is working")
        chrome.storage.sync.get([key], function(result) {
            if (!chrome.runtime.error) {
                console.log('Value currently is ' + result[key]);
            }
        });
    },

    // store new alert
    setData: function(jsondata) {
        console.log("Store ALert is working")
        chrome.storage.sync.set(jsondata, function() {
            if (!chrome.runtime.error) {
                console.log('Value is set');
            }
        });
    },

    // update the alert
    updateData: function() {
        console.log("update data");
    },

    clearStorage: function(e) {
        console.log("Clean sync Storage Area")
        chrome.storage.sync.clear();
    }
}

const form = document.querySelector("#createAlert");

// listener: submit the form for add alert item in list
form.addEventListener("submit", function(event) {
    // stop form submission
    event.preventDefault();

    let alert_name = form.elements["inputAlertName"].value;
    let alert_msg = form.elements["inputAlertMessage"].value;
    let alert_period = form.elements["inputAlertPeriod"].value;
    let alert_time = form.elements["inputPickTime"].value;
    // console.log(alert_name, alert_msg);

    // prepae key, value for saving alert json
    var key = alert_name
    value = JSON.stringify({
        "alert_msg": alert_msg,
        "alert_period": alert_period,
        "alert_time": alert_time
    });
    var jsonfile = {};
    jsonfile[key] = value;
    console.log("=> " + jsonfile[key])
    alertstate.setData(jsonfile);
    alertstate.getData(key);

});

form.addEventListener("reset", function(event) {
    // stop form submission
    event.preventDefault();
    alertstate.clearStorage();
});

// // after loading the DOM, call setup to check which button clicked
// document.addEventListener('DOMContentLoaded', function() {
//     console.log("form html")
// });