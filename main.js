//target all elements to save to constants
const buttons = document.querySelectorAll("nav ul li button");
var allpages=document.querySelectorAll(".page");
//select all subtopic pages
function hideall(){ //function to hide all pages
    for(let onepage of allpages){ //go through all subtopic pages
        onepage.classList.remove("active");
        setTimeout(() => {
            onepage.style.display = "none";
        }, 500)
}
}
function show(pgno){ //function to show selected page no
    hideall();
    //select the page based on the parameter passed in
    let onepage=document.querySelector("#page"+pgno);
   setTimeout(() => {
        onepage.style.display = "block";
        onepage.offsetHeight;
        onepage.classList.add("active");
    }, 500);
    //onepage.style.display="block"; //show the page
}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
buttons.forEach(button => {
    button.addEventListener("click", function(){
        hideall();
        buttons.forEach(btn => btn.classList.remove("active"));

        // Add active class to the clicked button
        button.classList.add("active");
        const page = button.id.replace("btn", "").replace("page", "");
        show(page);
    })
});
show(1)
document.querySelector("#page1btn").classList.add("active");