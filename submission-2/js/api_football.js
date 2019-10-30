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
                        <a href="./tim.html?tim_id=${tabel.team.id}&limit=10">
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

function get_team(id_tim) {
    let url = BASE_URL+'teams/'+id_tim;
    
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

        // Menyusun komponen card artikel secara dinamis
        let teamBanner = `
                <div class="container">
                    <div class="col s2">
                    <h5>
                        <img class="circle responsive-img" src="${data.crestUrl}" 
                        alt="${data.shortName}">
                    </h5>
                    </div>
                    <div class="col s10">
                        <h5>${data.name}</h5>
                        ${data.area.name}
                    </div>
                </div>
            `;

        let teamDetailHTML = `
            <div class="container">
                <table class="striped">
                    <tbody>
                        <tr>
                            <td><b>Alamat</b></td>
                            <td>${data.address}</td>
                        </tr>
                        <tr>
                            <td><b>Telpon</b></td>
                            <td>${data.phone}</td>
                        </tr>
                        <tr>
                            <td><b>Website</b></td>
                            <td><a href="${data.website}" target="_blank">${data.website}</a></td>
                        </tr>
                        <tr>
                            <td><b>Email</b></td>
                            <td>${data.email}</td>
                        </tr>
                        <tr>
                            <td><b>Berdiri</b></td>
                            <td>${data.founded}</td>
                        </tr>
                        <tr>
                            <td><b>Markas</b></td>
                            <td>${data.venue}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            `;

        let teamPlayersHTML = `
            <table class="striped">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Posisi</th>
                        <th>Kewarganegaraan</th>
                    </tr>
                </thead>
                <tbody>
        `;
        let index = 0;
        data.squad.forEach((p)=>{
            index++;
            teamPlayersHTML += `
                <tr>
                    <td>${index}</td>
                    <td>${p.name} (${p.shirtNumber})</td>
                    <td>${p.position}<br><small>${p.role}</small></td>
                    <td>${p.nationality}</td>
                </tr>
            `;
        });
        teamPlayersHTML += `
                </tbody>    
            </table>    
            `;

        document.getElementById('tim-banner').innerHTML = "";
        document.getElementById('tim-banner').innerHTML = teamBanner;

        document.getElementById('tim-info-list').innerHTML = "";
        document.getElementById('tim-info-list').innerHTML = teamDetailHTML;

        document.getElementById('tim-players-list').innerHTML = "";
        document.getElementById('tim-players-list').innerHTML = teamPlayersHTML;
    });
}

function get_team_matches(id_tim, limit) {
    let url = BASE_URL+'teams/'+id_tim+'/matches?limit='+limit;
    
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

        // Menyusun komponen card artikel secara dinamis
        let teamMatchesHTML = `
            <div class="row">
        `;

        data.matches.forEach((m)=>{
            teamMatchesHTML += `
            <div class="col s12">
                <div class="card-panel grey lighten-5 z-depth-1">
                    <div class="row">
                        <div class="col s3"></div>
                        <div class="col s6 center"><b>${m.competition.name}</b></div>
                        <div class="col s3"></div>
                    </div>
                    <div class="row">
                        <div class="col s5">
                            <span class="black-text">
                                ${m.homeTeam.name}
                            </span>
                        </div>
                        <div class="col s2">
                            <span class="black-text">
                                <b>${m.score.fullTime.homeTeam}</b>
                                <b>-</b>
                                <b>${m.score.fullTime.awayTeam}</b>
                            </span>
                        </div>
                        <div class="col s5">
                            <span class="black-text">
                                ${m.awayTeam.name}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });
        teamMatchesHTML += `</div>`;

        document.getElementById('tim-matches-list').innerHTML = "";
        document.getElementById('tim-matches-list').innerHTML = teamMatchesHTML;
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