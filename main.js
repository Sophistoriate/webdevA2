//show&hide pages
//from lecture notes
const buttons = document.querySelectorAll("nav ul li button");
var allpages = document.querySelectorAll(".page");

function hideall() {
    allpages.forEach(function (onepage) {
        onepage.classList.remove("active");

        setTimeout(function () {
            onepage.style.display = "none";
        }, 500);
    });
}

function show(pgno) {
    hideall();

    let onepage = document.querySelector("#page" + pgno);

    setTimeout(function () {
        if (onepage.id == "page1") {
            onepage.style.display = "grid";
        } else {
            onepage.style.display = "block";
        }
        onepage.classList.add("active");
    }, 500);
}

buttons.forEach(function (button) {
    button.addEventListener("click", function () {

        hideall();

        buttons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const page = button.id.replace("btn", "").replace("page", "");
        show(page);
    });
});

//shows page when the user loads the pages
show(1);
document.querySelector("#page1btn").classList.add("active");

//qns for quiz. taken from practical 12 javascript

//these are sounds going to be used for both quiz and minigame
const correctSound = new Audio("audio/correct.mp3");
const wrongSound = new Audio("audio/wrong.mp3");

correctSound.volume = 0.3;
wrongSound.volume = 0.3;

const qns = {
    "What is the safest way to prevent the spread of germs while preparing food?": {
        ans: "Wash your hands with soap and water",
        otherans: [
            "Wear gloves all day",
            "Rinse your hands with water only",
            "Wipe your hands on a towel"
        ]
    },

    "Why should raw meat be kept separate from cooked food?": {
        ans: "To prevent cross-contamination",
        otherans: [
            "To keep the meat warm",
            "To make food taste better",
            "To save refrigerator space"
        ]
    },

    "Which temperature is safest for storing perishable food in a refrigerator?": {
        ans: "4°C or below",
        otherans: [
            "10°C",
            "15°C",
            "20°C"
        ]
    },

    "Why is it important to cook chicken thoroughly?": {
        ans: "To kill harmful bacteria",
        otherans: [
            "To make it more colourful",
            "To reduce its weight",
            "To make it easier to chew"
        ]
    },

    "What should you do before using fruits and vegetables?": {
        ans: "Wash them under clean running water",
        otherans: [
            "Dry them with a towel only",
            "Soak them in soft drinks",
            "Leave them as they are"
        ]
    },

    "Which of these is an example of cross-contamination?": {
        ans: "Using the same cutting board for raw chicken and salad",
        otherans: [
            "Using different knives for meat and vegetables",
            "Cooking chicken before eating it",
            "Washing your hands before cooking"
        ]
    },

    "What should you do if food has passed its expiry date?": {
        ans: "Throw it away",
        otherans: [
            "Taste it first",
            "Cook it longer",
            "Smell it and eat it if it seems fine"
        ]
    },

    "How long should cooked food be left at room temperature?": {
        ans: "No more than 2 hours",
        otherans: [
            "Up to 6 hours",
            "All day",
            "Until it feels cold"
        ]
    },

    "Which of these is the cleanest way to dry your hands?": {
        ans: "Use a clean paper towel",
        otherans: [
            "Wipe them on your clothes",
            "Use the same kitchen cloth repeatedly",
            "Do not dry them"
        ]
    },

    "What is the first thing you should do before preparing food?": {
        ans: "Wash your hands",
        otherans: [
            "Taste the ingredients",
            "Turn on the oven",
            "Prepare the serving plates"
        ]
    }
};

let currentAnswer = "";

GenerateQuestion();

const submit_button = document.getElementById("submit-button");

function GenerateQuestion() {
    const entries = Object.entries(qns);
    const random = entries[Math.floor(Math.random() * entries.length)];

    const question = random[0];
    const value = random[1];

    currentAnswer = value.ans;

    let options = [value.ans].concat(value.otherans);
    options.sort(function () {
        return Math.random() - 0.5;
    });

    let html = "<h2>" + question + "</h2>";
    html += '<form id="quizForm">';

    options.forEach(function(option) {
        html += '<label class="option">' +
        '<input type="radio" name="answer" value="' + option + '">' +
        '<span>' + option + '</span>' +
        '</label>';
    });

    document.querySelector(".quiz-questions").innerHTML = html;
}

submit_button.addEventListener("click", function () {

    const selected = document.querySelector('input[name="answer"]:checked');
    const result = document.getElementById("result");

    if (!selected) {
        result.textContent = "Please select an answer.";
        result.style.color = "#e8c872";
        return;
    }

    if (selected.value === currentAnswer) {
        result.textContent = "Correct!";
        result.style.color = "#5bdf6b";
        correctSound.play();
    } else {
        result.textContent = 'Wrong! The correct answer was "' + currentAnswer + '".';
        result.style.color = "#f06969";
        wrongSound.play();
    }

    document.querySelectorAll('input[name="answer"]').forEach(function(radio) {
        radio.disabled = true;
    });

    submit_button.disabled = true;

    setTimeout(function() {
        submit_button.disabled = false;
        result.textContent = "";
        GenerateQuestion();
    }, 1500);
});

// minigame

const orders = [
{
    order:["🍔","🍟","🥤"]
},
{
    order:["🍗","🍟","🥤"]
},
{
    order:["🍔","🥤"]
},
{
    order:["🌮","🥤"]
},
{
    order:["🍕","🥤"]
}
];

const allItems=[
"🍔",
"🍟",
"🥤",
"🍗",
"🌮",
"🍕",
"🍦",
"🥗"
];

const orderDiv=document.getElementById("order");
const itemsDiv=document.getElementById("items");
const minigame_result=document.getElementById("minigame-result");
const scoreText=document.getElementById("score");
const minigame_submit = document.getElementById("minigame-submit");

let currentOrder=[];
let selected=[];
let score=0;

GenerateGame();

function GenerateGame(){

    selected=[];

    itemsDiv.innerHTML="";
    orderDiv.innerHTML="";
    minigame_result.textContent="";

    const random=orders[Math.floor(Math.random()*orders.length)];
    currentOrder = random.order.slice();

    currentOrder.forEach(function(food){
        const div=document.createElement("div");
        div.className="food";
        div.textContent=food;
        orderDiv.appendChild(div);
    });

    const displayItems = allItems.slice();

    displayItems.sort(function () {
        return Math.random() - 0.5;
    });

    displayItems.forEach(function(food){
        const div=document.createElement("div");
        div.className="food";
        div.textContent=food;
        itemsDiv.appendChild(div);
    });
}
// EVENT DELEGATION
itemsDiv.addEventListener("click", function (event) {
    const div = event.target;

    if (!div.classList.contains("food")) {
        return;
    }

    const food = div.textContent;

    if (div.classList.contains("selected")) {
        div.classList.remove("selected");

        selected = selected.filter(function (item) {
            return item !== food;
        });
    }
    else {
        div.classList.add("selected");
        selected.push(food);
    }
});

minigame_submit.onclick=function(){

    if(selected.length!==currentOrder.length){
        minigame_result.textContent="Wrong number of items!";
        return;
    }

    const a = selected.slice().sort();
    const b = currentOrder.slice().sort();

    let correct=true;

    for(let i=0;i<a.length;i++){
        if(a[i]!==b[i]){
            correct=false;
            break;
        }
    }

    if(correct){
        score++;
        minigame_result.textContent="Correct!";
        correctSound.play();
    }
    else{
        minigame_result.textContent="Incorrect Order!";
        wrongSound.play();
    }

    scoreText.textContent=score;

    minigame_submit.disabled = true;

    setTimeout(function(){
        GenerateGame();
        minigame_submit.disabled = false;
    }, 1200);
};