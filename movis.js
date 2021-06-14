

function reqestmovis(neme) {
    const pubkey = "51ae40158bbc267a3e277fbabf97ca78";
    const pvtkey = "9918c7f8f45a5917dc5be7cb63ee759e4b2166f9";
    const ts = new Date().getTime();

    const message = ts + pvtkey + pubkey;

    const hash = CryptoJS.MD5(message).toString();

    return `https://gateway.marvel.com:443/v1/public/characters?name=${neme}&ts=${ts}&apikey=${pvtkey}&hash=${hash}`;

}
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
    // const url = API_URL.replace("**", movisName);
    const url = reqestmovis(movisName)
    console.log("hello");
    console.log(url);
    $.get(url, (data) => {
        if (data?.Search) {

            movis = [...data.Search];
            console.log(movis);
            // sortByDate(movis);
            // movis.forEach(rendercard);
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




