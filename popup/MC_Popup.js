for (const checkbox of document.querySelectorAll('input[type="checkbox"]')) {
    // Load the saved state of each checkbox
    browser.storage.sync.get(checkbox.id).then((result) => {
        checkbox.checked = result[checkbox.id];
    });
}
document.addEventListener('change', (event) => {
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
        // Get the checkbox that was changed
        const checkbox = event.target;
        var cbname = checkbox.id;
        // Save the state of the checkbox
        browser.storage.sync.set({ [cbname]: checkbox.checked });
    }
});