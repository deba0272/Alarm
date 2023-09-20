/* this code is used to show the current time on the web page */
//Dom to select Day-Day Element 
const CurrentDayDate = document.querySelector('.day-date');
// Dom to select Curr-time Element 
const CurrentTime = document.querySelector('.curr-time');

//Represent all 7 days in the array
const Days = ['Sunday','Monday','Tuesday','Thrusday','Friday','Saturday'];
//Represent all 12 months in the array
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//Represent current date and time
const currTime = new Date();
//Represent current date and time , and calculate time until mid night
const TimeUntilMidNight = new Date(currTime);

//set hour to mid night and other second and millisecond to 0
TimeUntilMidNight.setHours(24,0,0,0);

//calculate remaning time until midnight in millisecond
const remaningTime = TimeUntilMidNight.getTime() - currTime.getTime();

//Used to print atleast once to day and date on web page
const objDate = new Date();
CurrentDayDate.textContent = `${Days[objDate.getDay()]}, ${objDate.getDate()} ${months[objDate.getMonth()]} ${objDate.getFullYear()}`;

//SetTimeOut execute when at mid night 12:00 AM 
setTimeout( 
    // then after every 24 hour new day and date execute
    setInterval(()=>{
    const objDate = new Date();
    CurrentDayDate.textContent = `${Days[objDate.getDay()]}, ${objDate.getDate()} ${months[objDate.getMonth()]} ${objDate.getFullYear()}`;
    },86400000)
,remaningTime)

//used to repersent time and update time every in 1 second due to change in second
setInterval(()=>{
const objDate = new Date();
const CurrHour = objDate.getHours() % 12 || 12 ;
const AmPm = objDate.getHours() < 12 ? 'AM' : 'PM';
CurrentTime.textContent = `${String(CurrHour).padStart(2, '0')} : ${ String(objDate.getMinutes()).padStart(2,'0')} : ${ String(objDate.getSeconds()).padStart(2,'0')} ${AmPm}`;
},1000);

/* From here the actual Alarm clock code start*/
const time = document.querySelector('#time');
const btn = document.querySelector('.btn');
const alertBox = document.querySelector('.alert-box');
const stpAlarmBtn = document.querySelector('.stp-alarm');
const delAlarmBtn = document.querySelector('.del-alarm');
 
//store alarms in the browsers local storage
let Alarms = JSON.parse(localStorage.getItem('alarms')) || [];
let isTriggred = false;

//audio element
const audio = new Audio('./Audio/audio.mp3');

//Set the Alarm or Add the alarm
let setAlarm = ()=>{
    if(time.value === new Date().toLocaleTimeString('en-US',{hour12:false, hour:'2-digit',minute:'2-digit'})){
        alert('You can not set alarm of current time');
    }
    else 
    if(!Alarms.includes(time.value) && time.value !== ''){
     Alarms.push(time.value);
     localStorage.setItem('alarms', JSON.stringify(Alarms));
     alert(`Alarm set Successfully at ${time.value}`);
    }
    else if(time.value == ''){
        alert('You not set any of Alarm! Please set the Alarm');
    }
    else {
        alert('This Alarm is already Set');
    }
    time.value = '';
}

btn.addEventListener('click',setAlarm);

//stopAlarm Sound
const stopAlarmSound = ()=>{
    audio.pause();
    alertBox.style.display = 'none';
    isTriggred = true;
}

//playAlarm Sound
const playAlarmSound = ()=>{
    audio.play().then(()=>{
        alertBox.style.display = 'flex';

        isTriggred = true;
    }).catch(error => {
        console.error('Error playing audio:',error);
    })
}

//playAlarm fun is used to check if any of alarm elemnt present alarm
//Match with cuurent time them Alarm triggered  
let playAlarm = ()=>{
    const ActualTime = new Date().toLocaleTimeString('en-US',{hour12:false,hour:'2-digit',minute:'2-digit'});
   
    // console.log("Alarms",Alarms);
    
    //Retrive data from local storage
    Alarms = JSON.parse(localStorage.getItem('alarms')) || [];

    //if current time match with stored alarm time then alarm play
    if(Alarms.includes(ActualTime)){
        if(!isTriggred){
           playAlarmSound();
        }
    } 
}
//playAlarm check in every second
setInterval(playAlarm,1000);

//audio sound complete then again play the audio sound
audio.addEventListener('ended',()=>{
    audio.play()});

//if delete alarm button is clicked then alarm is deleted from the local storage  
delAlarmBtn.addEventListener('click',()=>{
    const ActualTime = new Date().toLocaleTimeString('en-US',{hour12:false, hour:'2-digit',minute:'2-digit'});
    Alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    Alarms.splice(Alarms.indexOf(ActualTime),1);
    localStorage.setItem('alarms',JSON.stringify(Alarms));
    stopAlarmSound();
    isTriggred = false;
})

//if stop alarm button is clicked then alarm is stop, but not removed from the storage 
stpAlarmBtn.addEventListener('click',stopAlarmSound);

