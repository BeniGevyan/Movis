

function reqestmovis(neme) {
    const pubkey = "51ae40158bbc267a3e277fbabf97ca78";
    const pvtkey = "9918c7f8f45a5917dc5be7cb63ee759e4b2166f9";
    const ts = new Date().getTime();

    const message = ts + pvtkey + pubkey;

    const hash = CryptoJS.MD5(message).toString();

    return `https://gateway.marvel.com:443/v1/public/characters?&ts=${ts}&apikey=${pubkey}&hash=${hash}&nameStartsWith=${neme}`;

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

        fromEl.reset();
    })
}




function sendrequst(movisName) {

    let movis = {}

    const url = reqestmovis(movisName)
    console.log("hello");
    console.log(url);
    $.get(url, (data) => {
        movis = [...data.data.results];
        console.log(movis);
        movis.forEach(element => {

            rendercard(element);
        });

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
    <a href="${movis.urls[0].url}">
    <img class="img" src="${movis.thumbnail.path}/portrait_xlarge.jpg">
    </a>
    <h3>${movis.name}</h3>
    <p class = 'text'> ${movis.description}</p>
    <P >comics : ${movis.comics.available}</P>
    
    `;

    el.classList.add('Character')
    document.querySelector("#results").appendChild(el)
};




