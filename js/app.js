const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const moviebox=document.querySelector('#movie-box');

//fetch data from api:
const getMovie= async(url)=>{
    try {
        const response = await fetch(url);
        const data= await response.json();
        showMovie(data);
        console.log(data.results); 
    } catch (error) {
        console.log('error occoured ', error);
    }
}
getMovie(APIURL);

const showMovie= (data)=>{
    moviebox.innerHTML="";
    data.results.forEach(
        (result)=>{
            const imagePath = result.poster_path === null ? "img/image-missing.png" : IMGPATH + result.poster_path;
            // console.log(imagePath);
            
            const box= document.createElement('div');
            box.classList.add('box');
            box.innerHTML=`
            <img src="${imagePath}" alt="" />
            <div class="overlay">
              <h2>${result.original_title
              }</h2>
              <span>${result.vote_average}</span>
              <h3>Overview</h3>
              <p>${result.overview}</p>
            </div>`
            moviebox.appendChild(box);
        }
    )
}


document.querySelector('#search').addEventListener('keyup',
(event)=>{
    if(event.target.value != ""){
        getMovie(SEARCHAPI+ event.target.value);

    }else{
        getMovie(APIURL);
    }

})
//initial call: