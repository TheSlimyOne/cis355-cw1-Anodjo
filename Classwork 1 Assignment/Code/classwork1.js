/*
    Contact
    ---------------------------
    Jordan Anodjo
    jjanodjo@svsu.edu

    Description
    ---------------------------
    Convert ip to its country equivalent
    Record the amount of occurrences
    Print results

*/
// Imports
const geoip = require('geoip-lite'); // Import geoip-lite module
const fs = require('fs'); // Import file system module

// Retrieve file data
let data = fs.readFileSync('ipAddresses.txt');

// Split the list of ip address by the new line and carriage return
let ipAddresses = data.toString().split("\r\n");

// Declare the varaible that will be holding the objects
const countries = [];

// Check each ip Address in the ip Addresses array
for (let ipAddress of ipAddresses) {
    // Convert the ip into its country abbrievation
    let country = geoip.lookup(ipAddress).country;

    // If the country matches any key in the countries list
    // Search for the index of that object that contains that country
    // And increment the count member by 1
    if (countries.some((x) => x.country === country)) {
        let index = countries.findIndex(item => item.country === country);
        countries[index].count += 1
    } else {
        // Otherwise create a new object for that country to starting with 1
        countries.push({ 'country': country, 'count': 1 });
    }

}
// Sort the countries list by count
countries.sort((a, b) => a.count - b.count)

console.log(countries); // Output
