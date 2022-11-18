

let alarms = [];
let snCount =  3;
let days = [];
let deleter = (attr) => {
    alarms.splice(attr,1)
    days.splice(attr,1)
    renderList()
    snCount = 3
}
let audio = new Audio('sound.wav')

let snoozer = (audio) => {
    if(snCount>0){
        snCount--;
    audio.src ="";
    alert(`only ${snCount} snoozes remaining`)
    }
    else{
        alert(`cant snooze anymore`)
        audio.src =  "sound.wav"
    }
}

let checkAlarm = () => {
    var today = new Date();
    let hour = today.getHours();
    let mins = today.getMinutes();
    let now = `${hour}:${mins}`
    for(let i=0; i<alarms.length; i++){
        console.log(alarms[i],today.getDay())
        if(alarms[i]== now && days[i]==today.getDay()){
            document.getElementById('hides').innerHTML =`
            <button class="btn col-8 mx-auto btn-outline-success m-1" id="snooze" onclick="snoozer(audio)"> Snooze</button>
            <button class="btn col-8 mx-auto btn-outline-success" id="stoper" onclick="deleter(${i})"> Stop</button>`
            audio.play();
            setTimeout(clearInterval,1)
        }
        else{
            document.getElementById('hides').innerHTML =``
        }
    }
}

let updateTime = () => {
    var today = new Date();
    let hour = today.getHours();
    let mins = today.getMinutes();

    document.getElementById("time").textContent = `${hour}:${mins}:${today.getSeconds()}`;
    console.log(`${hour}:${mins}`);

    checkAlarm()
}
let daysName = ["","monday", "tuesday" , "wednesday" ,"thursday","friday","saturday","sunday"]
setInterval(updateTime,1000)





let   renderList = () => {
    document.getElementById("alarm-list").innerHTML = ""
    for(let i=0; i<alarms.length; i++){

        document.getElementById("alarm-list").innerHTML += ` 
        <div class="alert alert-primary col-11 m-2 justify-content-between d-flex align-items-center" role="alert"  onclick="deleter(${i})">
            Set To Ring at ${alarms[i]} on ${daysName[days[i]]}
            <button class="btn btn-outline-dark " id="del">X</button>
        </div>`
    }
}
document.getElementById('setClick').addEventListener('click',()=>{
    alarms.push(document.getElementById('alertTime').value)
    days.push(document.getElementById('day').value)
    console.log(alarms.length,days.length)
    renderList()
})
