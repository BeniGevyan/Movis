const API_URL = `http://www.omdbapi.com/?apikey=4d6e20f8&s=`
const ELEMNT = {
    $from: $(`#movisSearch`),
    $results: $('#results')

};

start();


function start() {
    aadevent();


};

function aadevent() {

    ELEMNT.$from.on(`submit`, (event) => {
        event.preventDefault();
        const fromEl = event.target
        const movis = {
            taitel: fromEl.movisName.value
        }
        sendrequst(movis.taitel);
    })

}




function sendrequst(movisName) {

    let movis = []
    const url = API_URL + movisName

    $.get(url, (data) => {
        if (data?.Search) {

            movis = [...data.Search];

            sortByDate(movis);
            movis.forEach(rendercard);
        }
    });



}

function sortByDate(movis) {
    movis.sort((yers1, yers2) => {
        const yersOfmovis1 = +yers1.Year;
        const yersOfmovis2 = +yers2.Year;
        if (yersOfmovis1 < yersOfmovis2) {
            return -1;
        }
        if (yersOfmovis2 < yersOfmovis1) {
            return 1;
        }
        return 0;
    });
}

const rendercard = (movis) => {
    const el = document.createElement("div");

    el.innerHTML = `
    <img src="${movis.Poster}">
    <h3>${movis.Title}</h3>
    <p> ${movis.Year}</p>
      `;
    document.querySelector("#results").appendChild(el)
};




