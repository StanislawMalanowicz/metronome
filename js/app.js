
const start = $(".play");
const stop = $(".stop");
var speedoMeter = $(".slider")
var count = 0

var screen = $(".bpmScreen")
var volumeSlider = document.querySelector(".volumeSlider")
var counterVal = $('.counter').text() 

var currentSoundId = "click";
var currentMetrumValue = "1/4";
var hiHat = "hihat"
let playedSong = null;
var mute = $(".mute");

var shouldPlay = false;
var soundChange = $(".soundChange")
var currentVolume = 1;

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
    clearInterval(letsPlay)
    
    var val = screen.val()
    var tempo = 1000 * 60 / val
   
    //zabezpieczenie
    if (shouldPlay === true) {
        letsPlay = setInterval(() => {
                        
            // console.log(this)         
            playedSong = createjs.Sound.play(soundID);
            playedSong.volume = currentVolume;
            // soundID.volume=0.2;
            light.toggleClass('blue');
            count++
            $('.counter').text(count)
        }, tempo) 
    }
    
})
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
    
    var tempo = 1000 * 60 / val
    console.log("fromstart " + metrum)
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
    
    }, tempo)
    
    shouldPlay = true;

})
stop.on("click", () => {
    clearInterval(letsPlay)
    stop.css("display", "none");
    start.css("display", "inline")
    shouldPlay = false;
       
})

//speed plus&minus:
plus.on("click", ()=>{  
    speedRefresh()
    playedSong.volume = currentVolume;
    console.log(volumeSlider.value)
    // console.log("plus: " +  screen.val())
   var num = +$(".bpmScreen").val() +21;
   $(".bpmScreen").val(num)
   var num = +$("#myRange").val() +21;
   $("#myRange").val(num)

})

minus.on("click", ()=>{
    // console.log("minus")
    var num = +$(".bpmScreen").val() -21;
    $(".bpmScreen").val(num)
    var num = +$("#myRange").val() -21;
   $("#myRange").val(num)
   speedRefresh()
})

function speedRefresh(){
    
    screen.val(speedoMeter.val())
    
    clearInterval(letsPlay)

    var val = screen.val()
    var tempo = 1000 * 60 / val

    //zabezpieczenie
    if (shouldPlay === true) {
        letsPlay = setInterval(() => {

        // console.log(this)
        createjs.Sound.play(soundID);
        playedSong.volume = currentVolume;

        // soundID.volume=0.2;
        light.toggleClass('blue');
       
        count++
        $('.counter').text(count)
        }, tempo) 
    }
}
// volume:
volumeSlider.addEventListener("mousemove",function (){
    currentVolume = this.value / 100;
    // console.log(this.value)
})
//mute:
mute.on("click", function(){
    console.log(mute);
    currentVolume = 0;
    volumeSlider.value = currentVolume;
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

//accents:
function accentsFour(){
    if(count % 4 === 0){
        // alert("dziala")
        console.log(count % 4)
        loadBeepSound()
       
    }else{
        loadClickSound()
    }
    
}
