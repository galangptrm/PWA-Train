const BASE_URL = "https://api.football-data.org/v2/";
const TOKEN = "78fdf28ebc864284b61dd70ee83b5242";

function get_competitions() {
    let url = BASE_URL+'competitions/2021/standings';
    
    fetch(url, {
        method : "GET",
        headers : {
            'X-Auth-Token' : TOKEN
        }
    })
    .then(status)
    .then(json)
    .then((data)=>{
        console.log(data);
        
        let ligaHTML = "";
        data.standings[0].table.forEach(function (tabel) {
            ligaHTML += `
            <li class="collection-item avatar">
                <div class="row">
                    <div class="col s1 m1 l1 xl1">
                        <img src="${tabel.team.crestUrl}" alt="" class="circle img-responsive">
                    </div>
                    <div class="col s1 m1 l1 xl1">
                        <p class="title"><b>${tabel.position}</b></p>
                    </div>
                    <div class="col s5 m5 l5 xl5">
                        <a href="./tim.html?id=${tabel.team.id}">
                            <span class="title">${tabel.team.name}</span>
                        </a>
                    </div>
                    <div class="col s1 m1 l1 xl1 center">
                        <b>MP</b> <br> ${tabel.playedGames}
                    </div>
                    <div class="col s1 m1 l1 xl1 center">
                        <b>W</b> <br> ${tabel.won}
                    </div>
                    <div class="col s1 m1 l1 xl1 center">
                        <b>D</b> <br> ${tabel.draw}
                    </div>
                    <div class="col s1 m1 l1 xl1 center">
                        <b>L</b> <br> ${tabel.lost}
                    </div>
                    <div class="col s1 m1 l1 xl1 center">
                        <b>Pts</b> <br> ${tabel.points}
                    </div>
                </div>
            </li>
            `;
        });
        document.getElementById('liga-list').innerHTML = "";
        document.getElementById('liga-list').innerHTML = ligaHTML;
    });
}
    
// Common Function
function status (response) {
    if (response.status !== 200) {
        console.log('Error : ' + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}
function json (response) {
    // Mengembalikan sebuah Promise berupa objek/array JavaScript
    // yang diubah dari teks JSON. 
    return response.json();
}
function error (error) {
    // Parameter error berasal dari Promise.reject() 
    console.log('Error : ' + error);
}