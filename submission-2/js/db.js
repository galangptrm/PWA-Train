let dbPromise = idb.open("football_db", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("tb_team")) {
        let teamDB = upgradeDb.createObjectStore("tb_team", {
                            keyPath:'team_id'
                        });

        teamDB.createIndex("team_id", "team_id", { unique: true });
        teamDB.createIndex("name", "name", { unique: false });
        teamDB.createIndex("area", "area", { unique: false });
        teamDB.createIndex("short_name", "short_name", { unique: false });
        teamDB.createIndex("logo", "logo", { unique: false });
        teamDB.createIndex("address", "address", { unique: false });
        teamDB.createIndex("phone", "phone", { unique: false });
        teamDB.createIndex("web", "web", { unique: false });
        teamDB.createIndex("email", "email", { unique: false });
        teamDB.createIndex("founded", "founded", { unique: false });
        teamDB.createIndex("venue", "venue", { unique: false });
        teamDB.createIndex("created", "created", { unique: false });

        let playerDB = upgradeDb.createObjectStore("tb_player", {
                            keyPath: 'player_id'
                        });

        playerDB.createIndex("player_id", "player_id", {unique:true});
        playerDB.createIndex("name", "name", {unique:false});
        playerDB.createIndex("position", "position", {unique:false});
        playerDB.createIndex("nationality", "nationality", {unique:false});
        playerDB.createIndex("shirt_number", "shirt_number", {unique:false});
        playerDB.createIndex("role", "role", {unique:false});
        playerDB.createIndex("created", "created", {unique:false});
    }
});

function addTimFavorit(data) {
    console.log(data);
    dbPromise.then((db)=>{
        let trans = db.transaction('tb_team', 'readwrite');
        let store = trans.objectStore('tb_team');
        let item = {
            team_id: data.id,
            name: data.name,
            area: data.area.name,
            address: data.address,
            short_name: data.short_name,
            logo: data.crestUrl,
            phone: data.phone,
            web: data.website,
            email: data.email,
            founded: data.founded,
            venue: data.venue,
            created: new Date().getTime()
        };
        store.add(item);
        return trans.complete;
    }).then(()=>{
        console.log("Database berhasil tersimpan");
    }).catch((e)=>{
        console.error(e.message);
    });
}


// dbPromise.then(function(db) {
//         let tx = db.transaction('buku', 'readwrite');
//         let store = tx.objectStore('buku');
//         let item = {
//             judul: 'Menjadi Android Developer Expert (MADE)',
//             isbn: 123456789,
//             description: 'Belajar pemrograman Android di Dicoding dengan modul online dan buku.',
//             created: new Date().getTime()
//         };
//         // mengambil primary key berdasarkan isbn
//         store.get(123456789);
//         store.add(item, 123456789); //menambahkan key "buku"
//         return tx.complete;
//     }).then(function() {
//         console.log('Buku berhasil disimpan.');
//     }).catch(function() {
//         console.log('Buku gagal disimpan.')
// });

// dbPromise.then(function(db) {
//         let tx = db.transaction('buku', 'readonly');
//         let store = tx.objectStore('buku');
//         return store.openCursor();
//     })
//     .then(function ambilBuku(cursor) {
//         if (!cursor) {
//             return;
//         }
//         console.log('Posisi cursos: ', cursor.key);
//         for (let field in cursor.value) {
//             console.log(cursor.value[field]);
//         }
//         return cursor.continue().then(ambilBuku);
//     })
//     .then(function() {
//     console.log('Tidak ada data lain.');
// });