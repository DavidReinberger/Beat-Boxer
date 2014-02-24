$(window).resize(function() {
  // This will execute whenever the window is resized
  var winHeight = $(window).height(); // New height
  $('body').css("height",winHeight);
  
});

$(window).resize(function() {
    var imgWidth = $("#central-img").width();
    $("#central-img").css("height",imgWidth);
});

$('#track-table').scrollLeft(300);

window.ondragover = function(){DragAndDrop();};

$('#track-table').on('click', 'tr', function() {
    //load data
    var path  = $(this).attr("path"),
        rawMeta = $(this).attr("metas"),
        meta = rawMeta.split("|");
    
        $( "#info-track-title" ).html(meta[1]); //track name
        $( "#info-track-artist" ).html(meta[0]); //track artist
        $( "#info-track-album" ).html(meta[2]); //album name
        $( "#info-track-genre" ).html(meta[3]); //track genre
        $( "#central-img" ).attr("src",meta[4]); //track cover

    searchBeatport(meta[0], meta[1]);
});