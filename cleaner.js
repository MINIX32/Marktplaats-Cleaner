/**
 * Marktplaats Cleaner - Removes unwanted elements from the listings page.
 * This script enhances user experience by removing ads and sponsored listings.
 */
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;
let settings = {};

async function init() {
    try {
        // Get both init flag and settings in one call
        const result = await browserAPI.storage.sync.get(["init", "settings"]);

        if (!result.init) {
            // Set default values if not initialized
            const defaultSettings = {
                verkoperCheckbox: true,
                topCheckbox: true,
                dagtoppersCheckbox: true,
                gesponsordCheckbox: true,
                websiteCheckbox: true,
                usedCheckbox: true,
                catawikiCheckbox: true,
                nlCheckbox: true,
                wwwCheckbox: true,
                adsCheckbox: true,
                load100Checkbox: true
            };

            await browserAPI.storage.sync.set({
                init: true,
                settings: defaultSettings
            });

            settings = defaultSettings;
            console.log("Initialized with default settings");
        } else {
            settings = result.settings || {};
            console.log("Loaded existing settings", settings);
        }

        cleanPage();
        load100(); // Load 100 listings if the setting is enabled
        sortbyDistance(); // Ensure the "Afstand" option is available in the dropdown 

        new MutationObserver(() => {
            cleanPage(); // Run on every mutation to ensure the page stays clean
            load100(); // Check if we need to load 100 listings on every mutation
            sortbyDistance(); // Ensure the "Afstand" option is available in the dropdown on every mutation
        }).observe(document.body, {
            childList: true,
            subtree: true
        });

    } catch (error) {
        console.error("Initialization error:", error);
    }
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
    if (settings["verkoperCheckbox"])
        removeAll('li.hz-Listing:has(.hz-Listing-seller-name-container .hz-Icon--signalInfoDefault)');

    // Remove listings with "Topadvertentie" text
    if (settings.topCheckbox) {
        removeAllWithText('li.hz-Listing', 'Topadvertentie');
    }

    // Remove listings with "Dagtopper" text
    if (settings.dagtoppersCheckbox)
        removeAllWithText('li.hz-Listing', 'Dagtopper');

    // Remove listings with "Gesponsord" text
    if (settings.gesponsordCheckbox)
        removeAllWithText('li.hz-Listing', 'Gesponsord');

    // Remove listings with naar website link
    if (settings.websiteCheckbox)
        removeAll('li.hz-Listing:has(.hz-Listing-seller-external-link)');

    // Remove listings from "Used Products"
    if (settings.usedCheckbox)
        removeAllWithText('li.hz-Listing', 'Used Products');

    // Remove listings from Catawiki
    if (settings.catawikiCheckbox)
        removeAllWithText('li.hz-Listing', 'Catawiki');

    // Remove listings with .nl
    if (settings.nlCheckbox)
        removeAllWithText('li.hz-Listing', '.nl');


    // Remove listings with www
    if (settings.wwwCheckbox)
        removeAllWithText('li.hz-Listing', 'www');

    // Remove ads and banners
    if (settings.adsCheckbox)
        removeAll('.hz-Listings__container--cas');
    removeAll('#banner-top-dt');
    removeAll('#banner-rubrieks-dt');
    removeAll('.bannerContainerLoading');
    removeAll('#banner-right-container');
    removeAll('#adsense-container');
    removeAll('.hz-Banner');
    removeAll('#adsense-container-top-lazy');
}

function load100() {
    let currentUrl = window.location.href;
    if (settings.load100Checkbox == false) return; // Do not load 100 listings if the setting is disabled
    if (currentUrl.includes("limit:100")) {
        return; // Already loaded
    }
    if (currentUrl.includes("#")) {
        currentUrl = currentUrl + "|limit:100";
    }
    else {
        currentUrl = currentUrl + "#limit:100";
    }
    window.location.href = currentUrl;
    console.log("Loaded 100 listings");
}

function sortbyDistance() {

    if (!window.location.href.includes('postcode')) return; // Do not add "Afstand" option if postcode is not present in the URL

    const sortByDistanceDropdown = document.querySelector('select#Dropdown-sorteerOp');

    // Check if the "Afstand" option exists, if not, add it
    let afstandOption = Array.from(sortByDistanceDropdown.options).find(
        opt => opt.textContent.trim() === "Afstand"
    );
    if (!afstandOption) {
        afstandOption = document.createElement("option");
        afstandOption.value = '{"sortBy":"LOCATION","sortOrder":"INCREASING"}';
        afstandOption.textContent = "Afstand";
        sortByDistanceDropdown.appendChild(afstandOption);
    }
}

init(); // Initialize the cleaner settings