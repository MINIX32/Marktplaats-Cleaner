/**
 * Marktplaats Cleaner - Removes unwanted elements from the listings page.
    * This script is designed to enhance the user experience by removing ads, sponsored listings.
    * This is done by hiding elements that match specific criteria. Removing elements would break SPA.
 */

// Utility to remove all elements matching a selector

async function init() {
    await browser.storage.sync.get("init")
    .then((result) => {
        if (Object.values(result)[0] == true) {
            console.log("Marktplaats Cleaner already initialized.");
        }
        else {
            // Set default values for checkboxes
            browser.storage.sync.set({
                "init": true,
                "verkoperCheckbox": true,
                "topCheckbox": true,
                "dagtoppersCheckbox": true,
                "gesponsordCheckbox": true,
                "websiteCheckbox": true,
                "usedCheckbox": true,
                "catawikiCheckbox": true,
                "nlCheckbox": true,
                "wwwCheckbox": true,
                "adsCheckbox": true
            });
            console.log("Marktplaats Cleaner initialized with default settings.");
        }
    });
}

function removeAll(selector) {
    document.querySelectorAll(selector).forEach(el => el.style.display = 'none');
}

function removeAllWithText(selector, text) {
    document.querySelectorAll(selector).forEach(el => {
        if (el.textContent.includes(text)) {
            el.style.display = 'none';
        }
    });
}


async function cleanPage() {
    // Remove listings with specific seller info icon
    await browser.storage.sync.get("verkoperCheckbox")
    .then (result => {
        if (Object.values(result)[0]) {
            // Remove listings with seller info icon
            removeAll('li.hz-Listing:has(.hz-Listing-seller-name-container .hz-Icon--signalInfoDefault)');
        }
    });

    await browser.storage.sync.get("topCheckbox")
    .then (result => {
        if (Object.values(result)[0]) {
            // Remove listings with "Topadvertentie" text
            removeAllWithText('li.hz-Listing', 'Topadvertentie');
        }
    });

    await browser.storage.sync.get("dagtoppersCheckbox")
    .then (result => {
        if (Object.values(result)[0]) {
            // Remove listings with "Dagtopper" text
            removeAllWithText('li.hz-Listing', 'Dagtopper');
        }
    });

    await browser.storage.sync.get("gesponsordCheckbox")
    .then (result => {
        if (Object.values(result)[0]) {
            // Remove listings with "Gesponsord" text
            removeAllWithText('li.hz-Listing', 'Gesponsord');
        }
    });

    await browser.storage.sync.get("websiteCheckbox")
    .then (result => {
        if (Object.values(result)[0]) {
            // Remove listings with naar website link
            removeAll('li.hz-Listing:has(.hz-Listing-seller-external-link)');

        }
    });

    // Remove listings from "Used Products"
    await browser.storage.sync.get("usedCheckbox")
    .then (result => {
        if (Object.values(result)[0]) {
            removeAllWithText('li.hz-Listing', 'Used Products');
        }
    });

    // Remove listings from Catawiki
    await browser.storage.sync.get("catawikiCheckbox")
    .then (result => {
        if (Object.values(result)[0]) {
            removeAllWithText('li.hz-Listing', 'Catawiki');
        }
    });

    // Remove listings with .nl
    await browser.storage.sync.get("nlCheckbox")
    .then (result => {
        if (Object.values(result)[0]) {
            removeAllWithText('li.hz-Listing', '.nl');
        }
    });

    // Remove listings with www
    await browser.storage.sync.get("wwwCheckbox")
    .then (result => {
        if (Object.values(result)[0]) {
            removeAllWithText('li.hz-Listing', 'www');
        }
    });

    // Remove ads and banners
    await browser.storage.sync.get("adsCheckbox")
    .then (result => {
        if (Object.values(result)[0]) {
            removeAll('.hz-Listings__container--cas');
            removeAll('#banner-top-dt');
            removeAll('#banner-rubrieks-dt');
            removeAll('.bannerContainerLoading');
            removeAll('#banner-right-container');
            removeAll('#adsense-container');
            removeAll('.hz-Banner');
            removeAll('#adsense-container-top-lazy');
        }
    });
}

init(); // Initialize the cleaner settings
cleanPage(); //First run to clean the page
setTimeout(cleanPage, 5000); // Run again after 5 seconds to ensure all elements are cleaned
new MutationObserver(() => {
    cleanPage(); // Run on every mutation to ensure the page stays clean
}).observe(document.body, {
    childList: true,
    subtree: true
});