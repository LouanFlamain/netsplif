const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "e0e404ffb5a8f7f879ec7cb0814078dc";
const IMAGES_URL = "https://image.tmdb.org/t/p/w500";
const IMAGES_NOT_FOUND = "src/assets/img/image-na.jpeg";
let $form = document.querySelector("#form");
let $input = document.querySelector("#search");
let $main = document.querySelector("#main");
let $count = document.querySelector(".count");
let $loader = document.querySelector(".loader");
let $btnPage = document.querySelector(".btn_page");
let $player = document.querySelector(".player");
let $playerTitle = document.querySelector(".player-title");
let $playerSynopsis = document.querySelector(".player-synopsis");
let $playerImage = document.querySelector(".player-image");
let $playerLanguage = document.querySelector(".player-language");
let $playerReleaseDate = document.querySelector(".player-release-date");
let $btnPlayerClose = document.querySelector(".btn-player-close");
let $value = "";
let $netsplifLogo = document.querySelector(".Netsplif-logo");
let $btnPrev = document.querySelector("#prev");
let $btnSkip = document.querySelector("#skip");
let page = 1;
let $lastVisiblePage;
let $currentPage = document.querySelector(".current_page");
let $lastPage = document.querySelector(".last_page");
function getMovies(query) {
    fetch(API_URL + "/search/movie?api_key=" + API_KEY + "&query=" + query + "&page=" + page).then((response)=>response.json()
    ).then((response)=>showMovies(response)
    );
}
function getMovieDetails(movie) {
    fetch(API_URL + "/movie/" + movie.id + "?api_key=" + API_KEY).then((response)=>response.json()
    ).then((response)=>showMovieDetails(response)
    );
}
function showMovies(movies) {
    $loader.classList.remove("is-active");
    $main.innerHTML = "";
    if (movies.total_results === 0) $count.innerText = "pas de résultats";
    else $count.innerText = movies.total_results + " résultats";
    for(i = 0; i < movies.results.length; i++){
        let Allmovies = movies.results[i];
        let $mainContainer = document.createElement("div");
        let $movieTitle = document.createElement("h2");
        let $movieImage = document.createElement("img");
        let $movieText = document.createElement("p");
        //let $movieMoreInfo = document.createElement("button");
        $mainContainer.classList.add("main-container");
        $movieImage.classList.add("main-container-image");
        $movieText.classList.add("main-container-text");
        //$movieMoreInfo.classList.add("btn-more-information");
        $main.appendChild($mainContainer);
        $mainContainer.appendChild($movieTitle);
        $mainContainer.appendChild($movieImage);
        $mainContainer.appendChild($movieText);
        //$mainContainer.appendChild($movieMoreInfo);
        $movieTitle.textContent = Allmovies.title;
        $movieImage.setAttribute("src", IMAGES_URL + Allmovies.poster_path);
        /*if (Allmovies.poster_path === "null") {
      $movieImage.setAttribute("src", IMAGES_NOT_FOUND);
    } else {
      $movieImage.setAttribute("src", IMAGES_URL + Allmovies.poster_path);
    }*/ $movieText.textContent = Allmovies.overview;
        //$movieMoreInfo.innerText = "More information";
        $movieImage.addEventListener("click", function() {
            $player.classList.add("player-is-active");
            $playerTitle.innerText = Allmovies.title;
            $playerSynopsis.innerText = Allmovies.overview;
            $playerImage.setAttribute("src", IMAGES_URL + Allmovies.poster_path);
            $playerLanguage.innerText = "langue d'origine : " + Allmovies.original_language;
            $playerReleaseDate.innerText = "date de sortie : " + Allmovies.release_date;
        });
    }
    $lastVisiblePage = movies.total_pages;
    $counterPage();
    $returnTopPage();
}
let $counterPage = function() {
    $currentPage.innerHTML = page;
    $lastPage.innerHTML = $lastVisiblePage;
};
$form.addEventListener("submit", function(event) {
    $loader.classList.add("is-active");
    page = 1;
    event.preventDefault();
    getMovies($input.value);
    $value = $input.value;
    $input.value = "";
    $btnPage.classList.remove("is-hidden");
});
let $returnTopPage = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};
$btnPrev.addEventListener("click", function() {
    $loader.classList.add("is-active");
    if (page == 1) page = 1;
    else page -= 1;
    getMovies($value);
});
$btnSkip.addEventListener("click", function() {
    $loader.classList.add("is-active");
    if (page < $lastVisiblePage) page += 1;
    getMovies($value);
});
let $number_value = 0;
do {
    $loader.classList.add("is-active");
    getMovies("naruto");
    $number_value++;
}while ($number_value < 1)
$netsplifLogo.addEventListener("click", function() {
    $loader.classList.add("is-active");
    $btnPage.classList.add("is-hidden");
    page = 1;
    getMovies("naruto");
});
$btnPlayerClose.addEventListener("click", function() {
    $player.classList.remove("player-is-active");
});

//# sourceMappingURL=index.f85ccfd0.js.map
