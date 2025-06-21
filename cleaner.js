/**
 * Marktplaats Cleaner - Removes unwanted elements from the listings page.
 * To use: inject this script as a content script or run in the browser console.
 */

// Utility to remove all elements matching a selector
function removeAll(selector) {
    document.querySelectorAll(selector).forEach(el => el.remove());
}

function removeAllWithText(selector, text) {
    document.querySelectorAll(selector).forEach(el => {
        if (el.textContent.includes(text)) {
            el.remove();
        }
    });
}

// Remove listings with specific seller info icon
removeAll('li.hz-Listing:has(.hz-Listing-seller-name-container .hz-Icon--signalInfoDefault)');

// Remove "Topadvertentie" listings
removeAllWithText('li.hz-Listing', 'Topadvertentie');

// Remove "Dagtopper" listings
removeAllWithText('li.hz-Listing', 'Dagtopper');

// Remove "Naar website" (Bezoek website) listings
removeAll('li.hz-Listing:has(.hz-Listing-seller-external-link)');

// Remove listings containing "Used Products", "Catawiki", ".nl", or "www"
removeAllWithText('li.hz-Listing', 'Used Products');
removeAllWithText('li.hz-Listing', 'Catawiki');
removeAllWithText('li.hz-Listing', '.nl');
removeAllWithText('li.hz-Listing', 'www');

// Remove empty ad containers and banners
removeAll('.hz-Listings__container--cas');
removeAll('#banner-top-dt');
removeAll('#banner-rubrieks-dt');
removeAll('.bannerContainerLoading');
removeAll('#banner-right-container');

// Remove listings with external seller link
removeAll('.hz-Listing:has(.hz-Listing-seller-external-link)');