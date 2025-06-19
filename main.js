document.addEventListener("DOMContentLoaded", () => {
    /* === sidebar Menu Modal === */
    window.open_modal = function () {
        document.getElementById("the-side-bar-menu").style.display = "block";
        document.getElementById("the-side-menu-overlay").style.display = "block";
    };

    window.close_modal = function () {
        document.getElementById("the-side-bar-menu").style.display = "none";
        document.getElementById("the-side-menu-overlay").style.display = "none";
    };
});
