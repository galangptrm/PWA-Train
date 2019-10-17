document.addEventListener("DOMContentLoaded", function () {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            let footer_container = document.querySelector("#footer-content");
            if (this.status == 200) {
                footer_container.innerHTML = xhttp.responseText;
            } else if (this.status == 404) {
                footer_container.innerHTML = "<p>404 <br> Halaman tidak ditemukan.</p>";
            } else {
                footer_container.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    }
    xhttp.open("GET", "footer.html", true);
    xhttp.send();
});