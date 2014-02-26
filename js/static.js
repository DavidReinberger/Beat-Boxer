$(window).resize(function() {
  // This will execute whenever the window is resized
  var winHeight = $(window).height() - 20; // New height
  $('body').css("height",winHeight);
  
});

$(window).resize(function() {
    var imgWidth = $("#central-img").width();
    $("#central-img").css("height",imgWidth);
});

$('#track-table').scrollLeft(300);
$('#beatport-table').scrollLeft(300);

window.ondragover = function(){DragAndDrop();};

$('#track-table').on('click', 'tr', function() {
    
    $("*").removeClass('active-track');
    $(this).addClass('active-track');
    
    //load data
    var path  = $(this).attr("path"),
        rawMeta = $(this).attr("metas"),
        meta = rawMeta.split("|");
    
        $( "#info-track-title" ).html(meta[1]); //track name
        $( "#info-track-artist" ).html(meta[0]); //track artist
        $( "#info-track-album" ).html(meta[2]); //album name
        $( "#info-track-genre" ).html(meta[3]); //track genre
        $( "#central-img" ).attr("src",meta[4]);//track cover
        $( "#artist" ).val(meta[0]);
        $( "#title" ).val(meta[1]);
        
        //see if there is already some track data - if is delete it
        var resetTable = $( "#beatport-table" ).children();
        $(resetTable).remove();
    
        searchBeatport(meta[0], meta[1]);
});

$('#beatport-table').on('click', 'tr', function() {

    $("*").removeClass('selected-track');
    $(this).addClass('selected-track');
    $("#confirm-btn").removeAttr("disabled");

});