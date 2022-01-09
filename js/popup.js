//  cases to generate alerts/notification
var alarmClock = {
    onHandler: function(e) {
        chrome.alarms.create("myAlarm", {
            delayInMinutes: 0.1,
            periodInMinutes: 0.2,
        });
        window.close();
    },

    offHandler: function(e) {
        let liItem = e.target.parentElement;
        console.log(liItem.id);
        chrome.alarms.clear("myAlarm");
        // window.close();
    },
};

function createTemplate() {
    id = genUniqueID();
    const template = `
<article id="${id}" class="mainboard__alert">
    <div class="mainboard__counter">
        <object data="images/number.svg" type="image/svg+xml"></object>
        <span id="${id}-counter">0</span>
    </div>
    <span id="${id}-name" class="mainboard__name">Water</span>
    <button id="${id}-btn" class="mainboard__btn btn alarmOff" type="button"></button>
</article>
    `;

    return { id, template };
}

// TODO: demo function for saving DOM state
function saveStateLocally(key, state) {
    return true;
}

// cases to maipultate DOM of Alert_List
var alertList = {
    getItem: function(e) {
        list_items = document.getElementsByClassName("mainboard__name");
        list_items_count = list_items.length;

        for (let i of list_items) {
            console.log(i.innerText);
        }
    },

    createItem: function() {
        console.log("create");
    },

    deleteItem: function() {
        console.log("delete");
    },

    updateItem: function() {
        console.log("update");
    },

    setup: function(e) {
        console.log("create list of alert setup is ready");
    },
};

// create the list on DOM by fetching data from storage
function addListEntry() {
    var callformbtn = document.getElementById("pop-add-alert-btn");
    callformbtn.addEventListener("click", () => {
        alertList.getItem();
        // TODO: un-comment the below function
        // window.open("pages/form.html");

        let template_struct = createTemplate();
        $("#alert-list-items").append(template_struct.template);

        // todo: take this function out, to re-bind the button with "offHandler"
        // eventListener on all  alarmOff button
        document
            .getElementById(template_struct.id + "-btn")
            .addEventListener("click", alarmClock.offHandler.bind(this));

    });
}

//* reload extension
//TODO: move button to option page
var reload = document.querySelector("#reload-button");
reload.addEventListener("click", () => {
    chrome.runtime.sendMessage({ data: "reload" });
    delete localStorage["display"];
});

// get all keys from sync storage
document.getElementById("get-all-alert").addEventListener("click", function() {
    chrome.storage.sync.get(null, function(items) {
        var allKeys = Object.keys(items);
        console.log(allKeys);
    });
});

//* generate Unique ID for each article in main
function genUniqueID() {
    const unique = Date.now();
    if (!isNaN(unique)) {
        return unique;
    } else {
        const unique = Math.floor(Math.random() * 1000000000);
    }
    return unique;
}

//* MutationObserver: to check the change event in any element
const onChangeElement = (qSelector, cb) => {
    const targetNode = document.querySelector(qSelector);
    if (targetNode) {
        const config = { attributes: true, childList: true, subtree: true };
        const callback = function(mutationsList, observer) {
            cb($(qSelector))
        };
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    } else {
        console.error("onChangeElement: Invalid Selector")
    }
}

//* Observed is set on "#alert-list-items"
onChangeElement('#alert-list-items', function(jqueryElement) {
    localStorage.setItem('display', $state.html());
})

//* after loading the DOM
document.addEventListener("DOMContentLoaded", function() {
    $state = $('#alert-list-items');
    var block = localStorage.getItem('display');
    // console.log(block);
    if (block !== null) {
        $state.html(block).show()

        $state.find('article').each(function() {
            var innerDivId = $(this).attr('id');
            // console.log(innerDivId);
            document
                .getElementById(innerDivId + "-btn")
                .addEventListener("click", alarmClock.offHandler.bind(this));
        });
    }
    addListEntry();
});

//! delete it: test of handshake between background and popup.js
chrome.runtime.sendMessage({ data: "Handshake" });
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    str = JSON.stringify(message.msg);
    console.log("check is happed");
});

// TODO: activities
// 1. un-comment the open window for form
// 2. save form entries into sync storage
// 3. create persistent list using sync storage
// 4. finalise atleat Water alert