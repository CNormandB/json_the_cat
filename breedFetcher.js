const request = require('request');


const fetchBreedDescription = function(breed, callback) {
  // This is the path to the API itself
  const apiPath = "https://api.thecatapi.com/v1/breeds/search";
  // It takes a parameter called q, which stands for query. In the full request it looks like ?q=siberian (siberian being the breed to search for)
  const searchParam = "?q=";

  // make a request to the API with the search parameter, and add our breed the user wants
  // console.log(apiPath + searchParam + breed)
  request(apiPath
    + searchParam + breed, function(error, response, body) {
    // Convert the data received from string (how we receive it) to an Object (because it's JSON we can do that!)
    const data = JSON.parse(body);

    // Double check we actually have an item in the response array (it's [] if there was no result for our search!)
    // If we try to do data[0] with an empty array we get an error!
    // If we do have something, double check that it has a key called 'description' so we don't get an error trying to get that key!
    if (data.length > 0 && 'description' in data[0]) {
      // We have everything we need, we can call the callback with our data
      // Note that if there's no error given by the request function, it will contain null, so we can pass that straight in to our callback safely!
      // The page said to send null in the data column if there's an error, so we use ternary here to shorthand that instead of doing an if-else
      callback(error, error ? null : data[0].description);
    } else {
      // Oh no, one of our conditions wasn't met. Let's give the user a message to know we couldn't get them their info!
      // If there's no error, we can just give a generic one
      callback(error ? error : "Could not find any info on that breed!", null);
    }
  });
};

module.exports = { fetchBreedDescription };
