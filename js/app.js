//https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
//const urlAPI = 'http://www.omdbapi.com/?apikey=&s='+ searchText;
// // Replace ./data.json with your JSON feed
// fetch(url).then(response => {
//   return response.json();
// }).then(data => {
//   // Work with JSON data here
//   console.log(data);
// }).catch(err => {
//   // Do something for an error here
//   console.log(err);
// });

$(document).ready(()=>{
  $('#searchForm').on('submit',(e) =>{
    let searchText = $('#searchText').val();
    getMovies(searchText);
    
    e.preventDefault(); //stops submition of the form to the file
  });
});

//request to API
function getMovies(searchText){
  axios.get('http://www.omdbapi.com/?apikey=&s='+ searchText)
  .then((response)=>{
    console.log(response);
    let movies = response.data.Search; //get object that is returned based on search param;
    let output = '';
    //itterate through each movie on the movies array
    $.each(movies,(index, movie)=>{
      output +=`
        <div class="col-md-3">
          <div class="card-deck">
            <div class="card-body text-center">
              <img src="${movie.Poster}"> 
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        </div>
      `;
    });
    $('#movies').html(output);
  })
  .catch((err) =>{
    console.log(err);
  });
}
//create a sessionStorage name movieID that will hold ID of the movie we need to open in separete page
function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false; 
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com/?apikey=&i='+ movieId)
  .then((response)=>{
    console.log(response);
    let movie = response.data;

    let output =`
      <div class="row mt-4 mb-4">
        <div class="col-md-4">
          <img src="${movie.Poster}" class="thumbnail">
        </div>
        <div class="col-md-8">
          <h2>${movie.Title}</h2>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>          
          </ul>
        </div>
      </div>
      <div class="row">
      <div class="col-lg-12">
        <h3 class="">Plot</h3>
        <p>${movie.Plot}<p>
        <hr>
        </div>
      </div>
      <div class="row float-right mt-4">
      <a href="http://imdb.com/title/${movie.imdbID}" targer="_blank" class="btn btn-primary mr-2">View IMDB</a>
        <a href="index.html" class="btn btn-secondary mr-3">Go back to search</a>
      </div>
    `;

    $('#movie').html(output);
  })
  .catch((err) =>{
    console.log(err);
  });
}