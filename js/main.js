import "../sass/style.scss";

function toggle () {
const wrapper = document.getElementById('wrapper');
if (wrapper.classList.contains("nav__wrapper--active")) {
    slideEffect(); 
}
else {;
    slideEffect();
}
}
function listeners () {
    const menu = document.getElementById('hamburger');
    menu.addEventListener('click', toggle, true);
}

function pageBlock() {
    const wrapper = document.getElementById('wrapper');
    if (wrapper.classList.contains("nav__wrapper--active")) {
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "auto";
    }
}
function slideEffect() {
    const wrapper = document.getElementById('wrapper');
    if (wrapper.style.right === "-100vw" || !(wrapper.classList.contains('nav__wrapper--active'))){
        wrapper.classList.add("nav__wrapper--active");
       setTimeout(function() {
        wrapper.style.right = "0px";
       }, 301);
      setTimeout(pageBlock, 302);
      
    } else {
            wrapper.style.right = "-100vw";
           setTimeout(function() {
           wrapper.classList.remove("nav__wrapper--active");
           }, 301);
           setTimeout(pageBlock, 302);
    }
}
function changingColours() {
    let elipse = document.querySelectorAll(".elipse");
    setInterval(function(){
        for (let i = 0, max = elipse.length; i < max; i++){
            let name = elipse[i].id;
            let item = document.getElementById(name);
            let x = item.classList.contains("azure");
            let y = item.classList.contains("lime");
            let z = item.classList.contains("navyBlue");
            if (x) {
                item.classList.remove("azure");
                item.classList.add("lime");
            } else if (y) {
                item.classList.remove("lime");
                item.classList.add("navyBlue");
            } else if (z) {
                item.classList.remove("navyBlue");
                item.classList.add("azure");
            } else {
                return
            }
        };   
    }, 2500);   
}



function mouseParallax() {
    window.addEventListener('mousemove', function(e) {
    let x = e.pageX,
     y= e.pageY,
     screenx = window.innerWidth,
     screeny = window.innerHeight,
     x0 = screenx/2,
     y0 = screeny/2;
     window.onclick = function() {
         console.log("x: " + x + ", y: " + y + ", screenx: " + screenx + ", screeny: " + screeny + ", x0: " + x0+ ", y0: " + y0);
     }

    });
};

function navback() {
    if (window.innerWidth > 470) {
        document.getElementById("wrapper").style.right = "0"
    } else {
        return
    }
};




window.addEventListener('DOMContentLoaded', listeners);
window.addEventListener('DOMContentLoaded', changingColours);
window.addEventListener('mousemove', mouseParallax);
window.addEventListener('resize', navback);
