window.addEventListener('DOMContentLoaded', function() {
    "use strict";
    var ql = new QueryLoader2(document.querySelector("section.hero"), {
        barColor: "#ee6e73",
        backgroundColor: "#122c45",
        percentage: false,
        barHeight: 1,
        minimumTime: 200,
        fadeOutTime: 1000
    });
});
