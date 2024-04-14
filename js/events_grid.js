var baseUrl = "https://raw.githubusercontent.com/sm650rb/events/main/";

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

var getDate = function getDate(param) {
    var d = new Date(param.split("/").join("-"));
    var dd = d.getDate();
    var mm = d.toLocaleDateString('en-GB', {
        month: 'long'
    }).replace(/ /g, '-');
    var yy = d.getFullYear();
    return dd + ' ' + mm + ', ' + yy;
}

$(document).ready(function () {
    if ($('#events-grid').length) {
        $.getJSON(baseUrl + 'events.json', function (data) {
            var events = data.events;
            var past = events.past;
            $("#loading").empty();
            past.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
            $.each(past, function (i, evt) {
                var evtDiv = $("<div/>", {
                    class: 'col-lg-4 col-md-6',
                    style: 'margin-bottom: 30px'
                }).append(
                    $("<a/>", {
                        href: "event.html?date=" + evt.date,
                    }).append($("<img/>", {
                        class: 'img-fluid',
                        src: evt.cover_picture,
                        alt: evt.name
                    }),
                        $("<div/>", {
                            class: 'details'
                        }).append(
                            $("<h3/>", {
                                class: 'card-title',
                                text: evt.name
                            }),
                            $("<p/>", {
                                class: 'card-text',
                                text: getDate(evt.date)
                            })
                        )
                    ));
                $("#events-grid").append(evtDiv);
            });
        }).error(function (jqXHR, textStatus, errorThrown) {
            console.log("error " + textStatus);
            console.log("incoming Text " + jqXHR.responseText);
        });
        return
    } else if ($('#event-detail').length) {
        var date = getUrlParameter('date');
        $.getJSON(baseUrl + "past/" + date + '.json', function (data) {
            $("#loading").empty();
            console.log(data);
            $("#event-detail")
                .append($("<h2/>", {}).text(data.name))
                .append($("<p/>", {}).text(getDate(data.date)));
            $("#event-desc").html("<p>" + data.description + "</p>");
            $.each(data.gallery, function (i, image) {
                $('#event-images').trigger('add.owl.carousel', ["<a href='" + image + "' class='venobox' data-gall='gallery-carousel'><img src=" + image + " alt=''></a>"]);
            });
            $("#event-images").trigger('refresh.owl.carousel')
        });
    }
});