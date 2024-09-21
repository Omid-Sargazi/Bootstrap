
var modal = document.getElementById("myModal")
var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function()
{
    modal.style.display="block";
}

span.onclick = function()
{
    console.log("span");
    modal.style.display="none";
}

window.onclick = function(event)
{
    console.log("window")
    if(event.target==modal)
    {
        modal.style.display="none";
    }
}