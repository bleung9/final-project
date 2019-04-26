const kijiji = require("kijiji-scraper");
 
let options = {
    maxResults: 10
};
 
let params = {
    locationId: 1700273, // from node_modules/kijiji-scraper/lib/locations.js
    categoryId: 37, // from node_modules/kijiji-scraper/lib/categories.js
    sortByName: "dateDesc"  // Show the cheapest listings first
};
 
// Scrape using returned promise
kijiji.search(params, options).then(function(ads) {
    // Use the ads array
    for (let i = 0; i < ads.length; ++i) {
        console.log(ads[i].title, ads[i].attributes.price, ads[i].attributes.location.latitude, ads[i].attributes.location.longitude);
        console.log('-------------------------------------------------')
    }
}).catch(console.error);