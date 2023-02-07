function init(){
    const movieList=document.querySelector("#movie-list");
    const movieInfo=document.querySelector("#movie-info");
    const watchedButton=document.querySelector("#watched");
    const BASE_URL="http://localhost:3000";
    const END_POINT="/movies";
    let selectedMovie;
    console.log(selectedMovie);
    fetch(BASE_URL+END_POINT)
    .then(res=>res.json())
    .then(movies=>{
        console.log(movies);
        movies.forEach((movie,i)=>{
            createMovieElement(movie,i);
        });
    })
    .catch(e=>console.log(e));
    watchedButton.addEventListener("click",()=>{
        updateWatch();
    });
    document.querySelector("#blood-form").addEventListener("submit",e=>{
        e.preventDefault();
        updateNumOfDrops();
    })

    function updateWatch(){
        const watched=selectedMovie.watched;
        if(watched){
            selectedMovie.watched=false;
        }
        else{
            selectedMovie.watched=true
        }
        displayWatched();
        console.log(selectedMovie);
    }

    function displayWatched(){
        if(selectedMovie.watched){
            movieInfo.querySelector("#watched").textContent="watched";
        }
        else{
            movieInfo.querySelector("#watched").textContent="unwatched";
        }
    }

    function displaySelectedMovie(){
        movieInfo.querySelector("#detail-image").src=selectedMovie.image;
        movieInfo.querySelector("#title").textContent=selectedMovie.title;
        movieInfo.querySelector("#year-released").textContent=selectedMovie.yearReleased;
        movieInfo.querySelector("#description").textContent=selectedMovie.description;
        displayWatched();
        movieInfo.querySelector("#amount").textContent=selectedMovie.blood_amount;
    }

    function updateNumOfDrops(){
        const numOfAddedDrops=parseInt(document.querySelector("#blood-amount").value);
        selectedMovie.blood_amount+=numOfAddedDrops;
        movieInfo.querySelector("#amount").textContent=selectedMovie.blood_amount;
    }

    function createMovieElement(movie,i=0){
        const movieImg=document.createElement("img");
            movieImg.src=movie.image;
            movieImg.addEventListener("click",()=>{
                selectedMovie=movie;
                displaySelectedMovie();
            });
            movieList.append(movieImg);
            if(i==0){
                selectedMovie=movie;
            }
            displaySelectedMovie();
    }
}

init();