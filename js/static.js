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
    
        $( "#info-track-title" ).html(meta[0]);
        $( "#info-track-artist" ).html(meta[1]);
        $( "#info-track-album" ).html(meta[2]);
        $( "#info-track-genre" ).html(meta[3]);
        $( "#central-img" ).attr("src",meta[4]);
});