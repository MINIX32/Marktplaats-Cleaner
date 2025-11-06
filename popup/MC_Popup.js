const browserAPI = typeof browser !== 'undefined' ? browser : chrome;
let localSettings = {};

function getSettings() {
    const result = browserAPI.storage.sync.get("settings").then(result => {
        localSettings = result.settings || {};
        console.log("Loaded settings:", localSettings);
    }).then(updateCheckboxes);
}

function updateCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = localSettings[checkbox.id];
    });
}

getSettings();

document.addEventListener('change', (event) => {
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
        // Get the checkbox that was changed
        const checkbox = event.target;
        var cbname = checkbox.id;
        // Save the state of the checkbox
        localSettings[cbname] = checkbox.checked;
        browserAPI.storage.sync.set({ settings: localSettings });
        console.log(localSettings);
    }
});