
allGame = []
function displayData() {
    let box = ``
    for (let i = 0; i < allGame.length; i++) {
        box += `<div class=" col-md-6 col-lg-4 col-xl-3">
            <div class=" h-100 bg-transparent card rounded-2">
                <div class=" card-body small">
                        <img onclick="getDetail(${allGame[i].id}) " class="card-img-top object-fit-cover w-100 h-200" src="${allGame[i].thumbnail
            }" alt="">
                    <div class="fig-cap border-bottom small">
                        <div class="fig d-flex justify-content-between text-white mt-2">
                            <h3 class="h5">${allGame[i].title}</h3>
                            <span class="">Free</span>
                        </div>
                        <p class=" text-white text-center  p-2 opacity-25" >${allGame[i].short_description
            }</p>
                    </div>
                    <div class="footer justify-content-between d-flex h5   mt-4 " >
                        <span class="badge badge-color border small p-1">${allGame[i].genre}
                            </span>
                        <span class="badge badge-color border small p-1">${allGame[i].platform}</span>
                    </div>

                </div>
            </div>

        </div>`
    }
    rowData.innerHTML = box
}
// ------------------------------------------------------

async function getGame(game) {
    const loading = document.querySelector('.loading');
    loading.classList.remove('d-none');

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bf40a77c24mshd67c38aaeeae394p128436jsn7d0c60cc19c0',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    let api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${game}`, options)
    let response = await api.json();
    // console.log(response)
    allGame = response
    displayData()
    loading.classList.add('d-none')

}
getGame('MMORPG')

document.querySelectorAll('.menu li').forEach((link) => {
    link.addEventListener('click', (e) => {
        document.querySelector('.menu .active').classList.remove('active');
        e.target.classList.add('active');
    })
})

// =========================================================================
// details
let detail = ''

async function getDetail(id) {
    const loading = document.querySelector('.loading');
    loading.classList.remove('d-none');
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bf40a77c24mshd67c38aaeeae394p128436jsn7d0c60cc19c0',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    let apiDet = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options)
    let response = await apiDet.json();
    console.log(response)
    detail = response;
    displayDetails(detail)
    startEv()
    closeB()
    loading.classList.add('d-none')
}
// -------------------------------------------------------
function displayDetails(detail) {
    let det = ``

    det += `   <div class="  col-xs-12 col-s-6 col-md-4">
    <img class="w-100" src="${detail.thumbnail}" alt="">
</div>
<div class=" col-xs-12 col-s-6 col-md-8 text-white">
    <h2>Title : ${detail.title}</h2>
    <p class="h5"> "Category" : <span class="text-bg-info p-1 h6rounded">${detail.genre}</span></p>
    <p class="h5"> "Platform" : <span class="text-bg-info p-1 h6 rounded">${detail.platform}</span></p>
    <p class="h5"> "Status" : <span class="text-bg-info p-1 h6 rounded">Live</span></p>
    <p class="small">${detail.description}</p>
    <a  target="_blank" class="btn btn-light border" href="${detail.game_url}">view source</a>

</div>`

    rowDet.innerHTML = det

}
// -----------------------------------------------------
function startEv() {
    document.querySelectorAll('.card').forEach((item) => {
        item.addEventListener('click', () => {
            const id = item.dataset.id;
            showDetail(id)
        })
    })
}
// ====================
function showDetail(id) {
    document.querySelector('.main').classList.add('d-none')
    document.querySelector('.detail-sec').classList.remove('d-none')
    document.querySelector('#closeBtn').classList.remove('d-none')
}
// ===========close button
function closeB() {
    const clo = document.getElementById('closeBtn');
    clo.addEventListener('click', () => {
        clo.classList.add('d-none');
        document.querySelector('.detail-sec').classList.add('d-none');
        document.querySelector('.main').classList.remove('d-none')
    })
}

