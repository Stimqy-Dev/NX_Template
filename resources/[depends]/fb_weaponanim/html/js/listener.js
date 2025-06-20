$(document).ready(function () {
    // Hide/show UI function
    function display(bool) {
        if (bool) {
            $("#overlay").show();
        } else {
            $("#overlay").hide();
        }
    }

    display(false);

    window.addEventListener("message", function (event) {
        // Open UI based on message
        var item = event.data;
        if (item.type === "open") {
            display(item.status);
        }
    });

    // Click handlers for animations

    // Listener pour les nouvelles animations
    $("#DefaultAim").click(function () {
        $.post('https://fb_weaponanim/1', JSON.stringify({}));
        return;
    });
    
    $("#GangsterAim").click(function () {
        $.post('https://fb_weaponanim/2', JSON.stringify({}));
        return;
    });
    
    $("#HillBillyAim").click(function () {
        $.post('https://fb_weaponanim/3', JSON.stringify({}));
        return;
    });

    $("#DefaultHolster").click(function () {
        $.post("https://fb_weaponanim/4", JSON.stringify({}));
    });

    $("#BackHolster").click(function () {
        $.post("https://fb_weaponanim/5", JSON.stringify({}));
    });

    $("#CopHolster").click(function () {
        $.post("https://fb_weaponanim/6", JSON.stringify({}));
    });

    $("#FrontHolster").click(function () {
        $.post("https://fb_weaponanim/7", JSON.stringify({}));
    });

    $("#FrontAgressiveHolster").click(function () {
        $.post("https://fb_weaponanim/8", JSON.stringify({}));
    });

    $("#LegHolster").click(function () {
        $.post("https://fb_weaponanim/9", JSON.stringify({}));
    });

    // Listener pour les animations radio
    $("#RadioDefault").click(function () {
        $.post('https://fb_weaponanim/10', JSON.stringify({}));
        return;
    });
    
    $("#RadioPolice").click(function () {
        $.post('https://fb_weaponanim/11', JSON.stringify({}));
        return;
    });

    $("#RadioBras").click(function () {
        $.post('https://fb_weaponanim/12', JSON.stringify({}));
        return;
    });


    // Close UI when ESC is pressed
    document.onkeyup = function (data) {
        if (data.which == 27) {
            $.post("https://fb_weaponanim/close", JSON.stringify({}));
        }
    };
});
