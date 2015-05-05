var story = "Once upon a time there was a dear little girl who was loved by everyone who looked at her, but most of all by her grandmother, and there was nothing that she would not have given to the child. Once she gave her a little riding hood of red velvet, which suited her so well that she would never wear anything else; so she was always called 'Little Red Riding Hood. One day her mother said to her: 'Come, Little Red Riding Hood, here is a piece of cake and a bottle of wine; take them to your grandmother, she is ill and weak, and they will do her good. Set out before it gets hot, and when you are going, walk nicely and quietly and do not run off the path, or you may fall and break the bottle, and then your grandmother will get nothing; and when you go into her room, don't forget to sayOnce upon a time there was a dear little girl who was loved by everyone who looked at her, but most of all by her grandmother, and there was nothing that she would not have given to the child. Once she gave her a little riding hood of red velvet, which suited her so well that she would never wear anything else; so she was always called 'Little Red Riding Hood. One day her mother said to her: 'Come, Little Red Riding Hood, here is a piece of cake and a bottle of wine; take them to your grandmother, she is ill and weak, and they will do her good. Set out before it gets hot, and when you are going, walk nicely and quietly and do not run off the path, or you may fall and break the bottle, and then your grandmother will get nothing; and when you go into her room, don't forget to sayOnce upon a time there was a dear little girl who was loved by everyone who looked at her, but most of all by her grandmother, and there was nothing that she would not have given to the child. Once she gave her a little riding hood of red velvet, which suited her so well that she would never wear anything else; so she was always called 'Little Red Riding Hood. One day her mother said to her: 'Come, Little Red Riding Hood, here is a piece of cake and a bottle of wine; take them to your grandmother, she is ill and weak, and they will do her good. Set out before it gets hot, and when you are going, walk nicely and quietly and do not run off the path, or you may fall and break the bottle, and then your grandmother will get nothing; and when you go into her room, don't forget to sayOnce upon a time there was a dear little girl who was loved by everyone who looked at her, but most of all by her grandmother, and there was nothing that she would not have given to the child. Once she gave her a little riding hood of red velvet, which suited her so well that she would never wear anything else; so she was always called 'Little Red Riding Hood. One day her mother said to her: 'Come, Little Red Riding Hood, here is a piece of cake and a bottle of wine; take them to your grandmother, she is ill and weak, and they will do her good. Set out before it gets hot, and when you are going, walk nicely and quietly and do not run off the path, or you may fall and break the bottle, and then your grandmother will get nothing; and when you go into her room, don't forget to say";

var split_story = story.replace("'", '').split(' ');
var length = split_story.length;
var text_box = $('#inner-text');
var c = 0;

for(var i = 0; i < length; i++) {
  var one_word = split_story[i];
  text_box.append('<span data-index="'+ i +'">' + one_word + '</span> ');
}

text_box.find('span:first').addClass('highlight');
var space_counter = 0;
var error = false;
var k = null;

$('#text-input').on('keydown', function(e){
    var w = e.keyCode || e.charCode;
    var key = $(this).val().trim();
    var this_word = $('span.highlight');
    var q = this_word.text().substring(0, key.length);

    if(key !== q) {
      this_word.addClass('missed');
      error = true;
    }

    if(w == 32) {
      setNextWord(q, key);
      send(this_word.data('index'));
    }
    
    scrollDown();
});

//set next highlight word
var setNextWord = function(q, key){
    var text_box = $('#inner-text');
    var this_word = $('span.highlight');
    
    if((error === false || (q === key)) && (this_word.text() === key)) {
        this_word.addClass('passed');
    } else {
        this_word.addClass('missed');
        this_word.prop('title', 'You typed "' + key + '" which was incorrect. The correct word was "'+ this_word.text() +'"');
    }
    
    var nextWord = this_word.next('span');
    nextWord.addClass('highlight');

    
    this_word.removeClass('highlight');

    $('#text-input').val('');
    error = false;
}

//scroll down
var scrollDown = function(){
    var lineheight = parseInt($('#inner-text').css('line-height'), 10);
    var lineNumber = Math.floor($('span.highlight').position().top / lineheight);
    var scrollTo = (lineheight * lineNumber);

    $('#inner-text').scrollTop( (lineheight * lineNumber) + $('#inner-text').scrollTop());
}

//Peer connections
var conn;
var peer = new Peer({
    key: 'lwjd5qra8257b9'
});

peer.on('open', function(id) {
   $('#my-peer-id').text(id); 
});

// Await connections from others
peer.on('connection', connect);

var send = function(idx) {
    conn.send(idx);
}

function connect(c) {
    conn = c;
    
    conn.on('data', function(data){
        var idx = data + 1;
        var activeSpan = $("span[data-index='"+ idx +"']");
        $('#inner-text span').removeClass('user');
        activeSpan.addClass('user');
    });
}

$('#connect-to').on('click', function(e){
    e.preventDefault();
    var requestedPeer = $('#peer-id').val();

    var c = peer.connect(requestedPeer);
    c.on('open', function(){
        connect(c);
    });
    
    c.on('error', function(err){
        alert(err);
    });
});
