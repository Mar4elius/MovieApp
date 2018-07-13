//https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
const url = 'http://www.omdbapi.com/?apikey=9fd2928&s=Godfather';
// Replace ./data.json with your JSON feed
fetch(url).then(response => {
  return response.json();
}).then(data => {
  // Work with JSON data here
  console.log(data);
}).catch(err => {
  // Do something for an error here
  console.log(err);
});