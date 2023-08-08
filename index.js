const { fetchBreedDescription } = require('./breedFetcher.js');

// argv[0] : node
// argv[1] : breedFetcher.js
// argv[2] : The breed of cat to search for

// Check that we have the right number of parameters needed for our program to run properly
// Technically more parameters would still let it run, but they're useless!
// Not enough though and we'd get an error trying to access our cat breed argument!
if (process.argv.length !== 3) {
  // The user didn't give us the right number of parameters so let's let them know how to use our program!
  console.log(`${process.argv[0]} ${process.argv[1]} <cat breed to search>`);
  // Then exit so we don't get some errors for trying with incorrect data
  return;
}


const breedName = process.argv[2];

fetchBreedDescription(breedName, (error, desc) => {
  if (error) {
    console.log('Error fetch details:', error);
  } else {
    console.log(desc);
  }
});