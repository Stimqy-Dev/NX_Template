(function () {
    let status = [];

    let renderStatus = function () {
        $('#status_list').html('');

        for (let i = 0; i < status.length; i++) {

            if (!status[i].visible) {
                continue;
            }

            let percentage = Math.round((status[i].val / 1000000) * 100); 

            let statusDiv = $(
                '<div class="status_container" style="font-family: Montserrat, sans-serif;">' +
                    '<div class="status">' +
                        '<div class="status_inner">' +
                            '<div class="status_val"></div>' +
                            '<div class="status_percentage" style="font-family: Montserrat, sans-serif;">' + percentage + '%</div>' +
                            '<div class="status_ari"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>');

            statusDiv.find('.status_ari')
                .css({
                    'background-color': status[i].color,
                });

            statusDiv.find('.status_val')
                .css({
                    'background-color': status[i].color,
                    'width': (status[i].val / 10000) + '%',
                });

            $('#status_list').append(statusDiv);
        }
    };

    window.onData = function (data) {
        if (data.update) {
            status.length = 0;

            for (let i = 0; i < data.status.length; i++) {
                status.push(data.status[i]);
            }

            renderStatus();
        }
    };

    window.onload = function (e) {
        window.addEventListener('message', function (event) {
            onData(event.data);
        });
    };

})();
