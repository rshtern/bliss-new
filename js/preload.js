window.addEventListener('DOMContentLoaded', function() {
    "use strict";
    var ql = new QueryLoader2(document.querySelector("section.services"), {
        barColor: "#ee6e73",
        backgroundColor: "#122c45",
        percentage: false,
        barHeight: 2,
        onComplete: hidePreLoader,
        minimumTime: 200,
        fadeOutTime: 1000
    });
    //console.log(QueryLoader2);
});
function hidePreLoader() {
        $("#preloader").hide();
    }
