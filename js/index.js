//init speech synthesis api
const synth = window.speechSynthesis;

//dom elements
const textForm = document.querySelector('.form'),
textInput = document.querySelector('#text-input'),
voiceSelect = document.querySelector('#voice-select'),
rate = document.querySelector('#rate'),
rateValue = document.querySelector('#rate-value'),
pitch = document.querySelector('#pitch'),
pitchValue = document.querySelector('#pitch-value'),
body = document.querySelector('body')

//init voices array
let voices=[];
const getVoices= () => {
    //you cant get your voices like this, it will give you an empty array.the really method is below, this is explanation
    voices = synth.getVoices();
    // console.log(voices);

    //loop through voices and create an option for each one
    voices.forEach(voice =>{
        //create option element
        const option = document.createElement('option')
        //fill option with voice and language
        option.textContent =`${voice.name} (${voice.lang})`

        //set neeeded option attribute
        option.setAttribute('data-lang', voice.lang)
        option.setAttribute('data-name', voice.name)

        voiceSelect.appendChild(option)
    })
}

getVoices();

if(synth.onvoiceschanged !== undefined){
synth.onvoiceschanged = getVoices
}

//speak
const speak = () => {
   
    //check if speaking
if(synth.speaking){
console.error('speaking already...')
return;
}
if(textInput.value !== ''){
     //add background animation
     body.style.background ="#141414 url(../img/wave.gif)";
     body.style.backgroundRepeat ='repeat-x'
     body.style.backgroundSize="100% 100%"
//get speak text
const speakText = new SpeechSynthesisUtterance(textInput.value);
//speak end i.e when it is done speaking
speakText.onend = e =>{
    bosy.style.background="#141414"
}

//speak error
speakText.onerror = e => {
    console.error('something went wrong');
}

//selected voice
//all this is doing is getting the attritube of what we clicked and not from the api
const selectedVoice= voiceSelect.selectedOptions[0].getAttribute('data-name'); 

//loop through voices
voices.forEach(voice =>{
    if( voice.name === selectedVoice){
        speakText.voice = voice;
    }
})
//set pitch and rate
speakText.rate = rate.value;
speakText.pitch = pitch.value

//speak
synth.speak(speakText);
}
};

//EVENT LISTENERS

//EVENT LISTENER ON FORM
textForm.addEventListener('submit', e =>{
e.preventDefault();
speak;
textInput.blur()

})
//rate value change
rate.addEventListener('change', e => {rateValue.textContent = rate.value});

//pitch value change
pitch.addEventListener('change', e => {pitchValue.textContent = pitch.value})

//voice select change
voiceSelect.addEventListener('change', e => speak())