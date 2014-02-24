function DragAndDrop () {
    // prevent default behavior from changing page on dropped file
    var holder = document.getElementById('holder');
    window.ondragover = function(e) { e.preventDefault();
                                     var isHidden = $('#holder').hasClass("hidden");
                                    if(isHidden){
                                        window.ondragover = function () { $('#holder').removeClass("hidden"); $('#track-table').addClass("hidden"); return false;};
                                    }};
    window.ondrop = function(e) { e.preventDefault(); return false ;};
    
    holder.ondragover = function () { this.className = 'hover'; return false; };
    holder.ondragleave = function() {$('#holder').addClass("hidden"); $('#track-table').removeClass("hidden"); return false; };
    holder.ondragend = function () { this.className = ''; return false; };
    holder.ondrop = function (e) {
      e.preventDefault();

      CreateTrackTable(e, e.dataTransfer.files.length);
          
      $('#holder').addClass("hidden");
      $('#track-table').removeClass("hidden");
      
      return false;
    };
}

function CreateTrackTable (data, length) {
    
    var fs = require('fs'),
        mm = require('musicmetadata'),
        i  = 0;
    
    for (i; i < length; ++i) { 
        
        var mimeType = data.dataTransfer.files[i].type;
        
        if (mimeType == "audio/mp3" || mimeType == "audio/x-m4a"){
        
            var FilePath = data.dataTransfer.files[i].path,
                parser   = mm(fs.createReadStream(FilePath));
    
            parser.on('metadata', function (result) {
                    
                if (result.picture.length == 0) {
                    $("#track-table").append('<tr path="' + FilePath + '" metas="' + result.artist + '|' + result.title + '|' + result.album + '|' + result.genre + '|"><td><div class="table-artwork"><span class="glyphicon glyphicon-music"></span></div><div class="table-track-info"><strong>' + result.title + '</strong><br>' + result.artist + '</div></td></tr>');
                }else{
                    var picture = base64ArrayBuffer(result.picture[0].data);
                    $("#track-table").append('<tr path="' + FilePath + '" metas="' + result.artist + '|' + result.title + '|' + result.album + '|' + result.genre + '|' + 'data: image/' + result.picture[0].format + '; base64, ' + picture + '"><td><div class="table-artwork"><img src="data: image/' + result.picture[0].format + '; base64, ' + picture +'"/></div><div class="table-track-info"><strong>' + result.title + '</strong><br>' + result.artist + '</div></td></tr>');     
                }
            });
            
        }
    }
}



// Converts an ArrayBuffer directly to base64, without any intermediate 'convert to string then
// use window.btoa' step. According to my tests, this appears to be a faster approach:
// http://jsperf.com/encoding-xhr-image-data/5
 
function base64ArrayBuffer(arrayBuffer) {
  var base64    = ''
  var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
 
  var bytes         = new Uint8Array(arrayBuffer)
  var byteLength    = bytes.byteLength
  var byteRemainder = byteLength % 3
  var mainLength    = byteLength - byteRemainder
 
  var a, b, c, d
  var chunk
 
  // Main loop deals with bytes in chunks of 3
  for (var i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]
 
    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
    c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
    d = chunk & 63               // 63       = 2^6 - 1
 
    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
  }
 
  // Deal with the remaining bytes and padding
  if (byteRemainder == 1) {
    chunk = bytes[mainLength]
 
    a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2
 
    // Set the 4 least significant bits to zero
    b = (chunk & 3)   << 4 // 3   = 2^2 - 1
 
    base64 += encodings[a] + encodings[b] + '=='
  } else if (byteRemainder == 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]
 
    a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4
 
    // Set the 2 least significant bits to zero
    c = (chunk & 15)    <<  2 // 15    = 2^4 - 1
 
    base64 += encodings[a] + encodings[b] + encodings[c] + '='
  }
  
  return base64
}