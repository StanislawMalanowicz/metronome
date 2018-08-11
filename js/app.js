
const start = $(".play");
const stop = $(".stop");
var speedoMeter = $(".slider")
var count = 0

var screen = $(".bpmScreen")
var volumeSlider = document.querySelector(".volumeSlider")
var counterVal = $('.counter').text() 

var soundID = "click";
var hiHat = "hihat"
let playedSong = null;
var mute = $(".mute");

var shouldPlay = false;
var soundChange = $(".soundChange")
var currentVolume = 1;

const plus = $("#plus")
const minus = $("#minus")

var metrum = $(".metrum")

function loadClickSound () {   
    createjs.Sound.registerSound("audio/click2.wav", soundID)
  }
loadClickSound()

function loadHihatSound(){
    createjs.Sound.registerSound("audio/hihat.wav", soundID);
}
function loadKickSound(){
    createjs.Sound.registerSound("audio/kick.wav", soundID)
}
function loadClapSound(){
    createjs.Sound.registerSound("audio/clap.wav", soundID)
}
function loadBeepSound(){
    createjs.Sound.registerSound("audio/beep.wav", soundID)
}
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
            count ++
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
        count++
        $('.counter').text(count)
        playedSong = createjs.Sound.play(soundID);
        playedSong.volume = currentVolume;       
        light.toggleClass('blue');   
        console.log(metrum)
        if(value === "1/4"){
            accentsFour()
        }
        metrum.on('change', function(){
            console.log(this.value)
            if(this.value === "4/4"){
                accentsFour()
            }
        })
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
       
        count ++
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
    console.log(this.value)
    if(this.value === "hihat"){ loadHihatSound()
    }else if(this.value === "click"){ loadClickSound()}
    else if(this.value === "kick"){ loadKickSound()}
    else if(this.value === "clap"){ loadClapSound()}
    else if(this.value === "beep"){ loadBeepSound()}
   
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
// metrum.on('change', function(){
//     console.log(this.value)
    
// })
//p5.js fun:
// document.querySelector(".soundTest").addEventListener("click", function(){
//     console.log("bedzie dobrze ;)")
//     createSlider(0, 1, 0.5, 0.01)
// })

