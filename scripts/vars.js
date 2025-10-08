function set_default(name, val) {
    // 1. Get the item using the variable 'name' as the key.
    chrome.storage.local.get([name], function (result) {
        // 2. Access the result using the same key 'name'
        if (result[name] === undefined) { 
            // If the value is not set, set it.
            chrome.storage.local.set({[name]: val}, function () {
                console.log(`Default set for ${name}: ${val}`);
            });
        } else {
            console.log(`Setting ${name} already exists: ${result[name]}`);
        }
    })
}

async function get_val(name){
    return new Promise(async function (res, rej) {
      chrome.storage.local.get([name], async function (result) {
          var userLocal = result[name];
          res(userLocal);
      });
    });
}

set_default("role_exp_val", true);

async function set_updater(name, id) {
    var checkbox = document.getElementById(id);
    checkbox.checked = await get_val(name);
    checkbox.addEventListener("click", async () => {
        val = checkbox.checked;
        chrome.storage.local.set({[name]: val}, function() {
            // Confirmation that the value has been saved
            console.log(`Setting ${name} updated and saved as: ${val}`);
        });
        console.log(val)
    })
}

set_updater("role_exp_val", "role_exp_val")
