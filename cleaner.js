/**
 * Marktplaats Cleaner - Removes unwanted elements from the listings page.
    * This script is designed to enhance the user experience by removing ads, sponsored listings.
    * This is done by hiding elements that match specific criteria. Removing elements would break SPA.
 */

// Utility to remove all elements matching a selector
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

function cleanPage() {
    // Remove listings with specific seller info icon
    removeAll('li.hz-Listing:has(.hz-Listing-seller-name-container .hz-Icon--signalInfoDefault)');

    // Remove "Topadvertentie" listings
    removeAllWithText('li.hz-Listing', 'Topadvertentie');

    // Remove "Dagtopper" listings
    removeAllWithText('li.hz-Listing', 'Dagtopper');

    // Remove "Gesponsord" listings
    removeAllWithText('li.hz-Listing', 'Gesponsord');

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

    // Remove specific ad containers
    removeAll('#adsense-container');
    removeAll('.hz-Banner');
}

setTimeout(() => {
    // Initial cleanup
    cleanPage();
}, 1000);