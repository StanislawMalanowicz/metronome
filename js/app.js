
const start = $(".play");
const stop = $(".stop");
var speedoMeter = $(".slider")
var count = 0

var screen = $(".bpmScreen")
var volumeSlider = $(".volumeSlider");
var counterVal = $('.counter').text() 

var currentSoundId = "click";
var currentMetrumValue = "1/4";
var hiHat = "hihat"
let playedSong = null;
var mute = $(".mute");

var shouldPlay = false;
var soundChange = $(".soundChange")
var currentVolume = .5;

const plus = $("#plus")
const minus = $("#minus")

var metrum = $(".metrum")

createjs.Sound.registerSound("audio/click2.wav", "click");
createjs.Sound.registerSound("audio/hihat.wav", "hihat");
createjs.Sound.registerSound("audio/kick.wav", "kick");
createjs.Sound.registerSound("audio/clap.wav", "clap");
createjs.Sound.registerSound("audio/beep.wav", "beep");

const light = $(".light");

//speed slider:
speedoMeter.on("change", function(){
    screen.val(speedoMeter.val())
    
    var val = screen.val()
    var tempo = 1000 * 60 / val;
   
    if (shouldPlay) {
        playSound(tempo);
    }
});

//limiter
const limiter = input => {
    if (input.value < 30) input.value = 30;
    if (input.value > 450) input.value = 450;
 }

//stop and play:
let letsPlay;
start.on("click", () => {
    var val = $(".bpmScreen").val()
    
    stop.css("display", "inline");
    start.css("display", "none")
    
    var tempo = 1000 * 60 / val;
    playSound(tempo);
    
    shouldPlay = true;
})

stop.on("click", () => {
    clearInterval(letsPlay)
    stop.css("display", "none");
    start.css("display", "inline")
    shouldPlay = false;
})

//speed plus&minus:
plus.on("click", () => {
    var num = +$(".bpmScreen").val() + 21;
    if(num > 450) {
        num = 450
    }

    $(".bpmScreen").val(num)
    $("#myRange").val(num);
    var tempo = 1000 * 60 / num;
    
    if (shouldPlay) {
        playSound(tempo);
    }
});

minus.on("click", () => {
    var num = +$(".bpmScreen").val() - 21;
    if(num < 30){
        num = 30;
    }
    $(".bpmScreen").val(num)
    $("#myRange").val(num);

    var tempo = 1000 * 60 / num;
    if (shouldPlay) {
        playSound(tempo);
    }
});

// volume:
volumeSlider.on("mousemove",function (){
    currentVolume = this.value / 100;
    // console.log(this.value)
})
//mute:
mute.on("click", function(){
    console.log(mute);
    currentVolume = 0;
    volumeSlider.val(currentVolume)
})

//sound changing:
soundChange.on("change", function (){
    currentSoundId = this.value;
});

metrum.on('change', function() {
    currentMetrumValue = this.value;
})

//counter & reset:
$(".reset").on('click', ()=>{
    $(".counter").text(0)
    count=0;
})

//  accents:
function playSound(tempo) {
    clearInterval(letsPlay);
    shouldPlay = true;
    letsPlay = setInterval(() => {
        count++;
        $('.counter').text(count);
        
        if (currentMetrumValue === '2/4' && count % 2 === 0) {
            playedSong = createjs.Sound.play('beep');
            playedSong.volume = currentVolume;  
            light.toggleClass('blue');
            return;
        }
        else if  (currentMetrumValue === '3/4' && count % 3 === 0) {
            playedSong = createjs.Sound.play('beep');
            playedSong.volume = currentVolume;  
            light.toggleClass('blue');
            return;
        }
        else if  (currentMetrumValue === '4/4' && count % 4 === 0) {
            playedSong = createjs.Sound.play('beep');
            playedSong.volume = currentVolume;  
            light.toggleClass('blue');
            return;
        }

        playedSong = createjs.Sound.play(currentSoundId);
        playedSong.volume = currentVolume;       
        light.toggleClass('blue');
    }, tempo);
}