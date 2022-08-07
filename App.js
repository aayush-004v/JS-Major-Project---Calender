var dt = new Date();
function RenderDate() {
    dt.setDate(1);
    var day = dt.getDay();
    var today = new Date();
    var endDate = new Date(
        dt.getFullYear(),
        dt.getMonth() + 1,
        0
    ).getDate();

    var prevDate = new Date(
        dt.getFullYear(),
        dt.getMonth(),
        0
    ).getDate();
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
    document.getElementById("month").innerHTML = months[dt.getMonth()];
    document.getElementById("month-date").innerHTML = dt.toDateString();
    var cells = "";
    for (x = day; x > 0; x--) {
        cells += "<div class='prev_date iterator'>" + (prevDate - x + 1) + "</div>";
    }
    // console.log(day);
    for (i = 1; i <= endDate; i++) {
        if (i == today.getDate() && dt.getMonth() == today.getMonth()) {
            cells += "<div class='today iterator'>" + i + "</div>";
        } else {
            cells += "<div class='iterator'>" + i + "</div>";
        }
    }
    document.getElementsByClassName("days")[0].innerHTML = cells;

}

function moveDate(para) {
    if (para == 'prev') {
        dt.setMonth(dt.getMonth() - 1);
    } else if (para == 'next') {
        dt.setMonth(dt.getMonth() + 1);
    }
    RenderDate();
}







function getLocalStrgArrData() {
    return JSON.parse(localStorage.getItem('events'));
}

function setLocalStrgArrData(arr) {
    localStorage.setItem('events', JSON.stringify(arr));
}

function deleteEvent(delId) {
    let arr = getLocalStrgArrData();
    arr.splice(delId, 1);
    setLocalStrgArrData(arr);
    showEvents();
}
function confirmation(delId) {

    if (confirm("Are you sure want to delete this event...?") == true) {
        deleteEvent(delId);
    }
}
function showEvents() {

    let arr = getLocalStrgArrData();
    // console.log(arr + " no");
    if (arr != null) {
        let evList = "";
        let sno = 1;
        for (let i in arr) {

            evList += `
            <li >${arr[i]} &nbsp;&nbsp;<button onclick="confirmation(${i})">x</button></li>`;
        }
        document.getElementById('evList').innerHTML = evList;
    }
}


const addEvent = (cdate) => {

    let inputEvent = prompt("Add your event below....");

    id = "";
    if (inputEvent) { // promt true
        if (inputEvent.length > 2) {

            if (id == '') { // Addition

                dt.setDate(cdate);
                let eventDate = dt.getDate();
                let eventMonth = dt.getMonth();
                let eventYear = dt.getFullYear();
                let eventVal = eventDate + "-" + eventMonth + "-" + eventYear + "     => " + inputEvent;

                let arr = getLocalStrgArrData();
                if (arr == null) {
                    let data = [eventVal];
                    setLocalStrgArrData(data);
                } else {
                    arr.push(eventVal);
                    setLocalStrgArrData(arr);
                }

                alert("Event saved Successfully...");
            } else { // Updation/Edit

            }

        } else {
            alert('please enter word more than length 3');
        }
    } else { // prompt false
        console.log(inputEvent);
    }
    showEvents();
}
showEvents();


let calDates = document.querySelectorAll('.days');
for (calDate of calDates) {
    calDate.addEventListener('click', (e) => {
        calDateText = e.target.innerText;
        let intVal = parseInt(calDateText);
        addEvent(intVal);
    })
    break;
}

let liLength = getLocalStrgArrData();
if (liLength.length < 1) {
    document.getElementById('evList').innerHTML = "<h4>No event added yet...</h4>";
}
