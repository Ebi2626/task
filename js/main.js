import "../sass/style.scss";
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

function headImgChanger () {
    if (window.innerWidth >= 1024) {
        document.getElementById('header').src = "/img/header-img-desktop.png";
    } else {
        document.getElementById('header').src = "/img/header-img.png";
    };
};

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
    const menuItem = document.querySelectorAll(".nav__link");
    if (window.innerWidth < 470){
    menuItem.forEach(function (e) {
        e.addEventListener('click', toggle);
        console.log(e);
    });
} else {
    return
};
};

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
    if (window.innerWidth < 476) {
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
    } else {
        return
    }
};
function changingColours() {
    let elipse = document.querySelectorAll(".elipse");
    setInterval(function(){
        for (let i = 0, max = elipse.length; i < max; i++){
            let name = elipse[i].id,
             item = document.getElementById(name),
             x = item.classList.contains("azure"),
             y = item.classList.contains("lime"),
             z = item.classList.contains("navyBlue");
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
   let screenx = window.innerWidth,
    screeny = window.innerHeight;


        window.addEventListener('mousemove', function(e) {
            let x = e.clientX,
             y= e.clientY,
             poziom = x / screenx,
             pion = y / screeny,
             x0 = screenx/2,
             y0 = screeny/2,
             right = x - x0,
             left = x0 - x,
             moveX,
             moveY;
             if (poziom > .5) {
                moveX = right/x0;
                document.querySelectorAll(".elipse").forEach(function(el){
                    el = el.id;
                    document.getElementById(el).style.transform = "translateX("+Math.round(moveX*10)+"px)";
                })
            } else {
                moveX = left/x0;
                document.querySelectorAll(".elipse").forEach(function(el){
                    el = el.id;
                    document.getElementById(el).style.transform = "translateX("+Math.round(-moveX*10)+"px)";
                });
            };
            });
};

function navback() {
    if (window.innerWidth > 470) {
        document.getElementById("wrapper").classList.remove("nav__wrapper--active");
        document.getElementById("wrapper").style.right = "0";
    } else {
        return
    }
};




window.addEventListener('DOMContentLoaded', changingColours);
window.addEventListener('DOMContentLoaded', headImgChanger);
window.addEventListener('mousemove', mouseParallax);
window.addEventListener('resize', navback);
window.addEventListener('resize', headImgChanger);
window.addEventListener('resize', listeners);
window.addEventListener('DOMContentLoaded', listeners);