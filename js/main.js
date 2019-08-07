import "../sass/style.scss";
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();
/* This script I was writing in specific order.
At the beginning there are functions with their initializations.
At the end there are event listeners which launch each function.
I didn't prepare much comments, because I have been trying to use such names for function
that they should speak for their own */

/* I still work on this project */


function headImgChanger () {
    if (window.innerWidth >= 1024) {
        document.getElementById('header').src = "/img/header-img-desktop.png";
        document.getElementById('logo').src = "/img/logo-desktop.png"
    } else {
        document.getElementById('header').src = "/img/header-img.png";
    };
};
function toggle () {
const wrapper = document.getElementById('wrapper');
if (wrapper.classList.contains("nav__wrapper--active")) {
    slideEffect(); 
}
else {
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
    });
} else if (window.innerWidth >= 1024) {
    window.addEventListener('mousemove', mouseParallax);
} else {
    window.removeEventListener('mousemove', mouseParallax);
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
        cookie('Elipsy');  
    }, 2500);   
}
function mouseParallax() {
   let screenx = window.innerWidth,
   screeny = window.innerHeight;
    window.onresize = function() {
        screenx = window.innerWidth;
        return screenx
    };
    if (screenx < 1024){
        window.removeEventListener('mousemove', paralaksa);
    } else {
        window.addEventListener('mousemove', function paralaksa(e) {
            let x = e.clientX,
             y = e.clientY,
             poziom = x / screenx,
             pion = y / screeny,
             x0 = screenx/2,
             y0 = screeny/2,
             right = x - x0,
             left = x0 - x,
             top = y - y0,
             bottom = y0 - y,
             moveX,
             moveY;
             /* Mouse on right side */
             if ((poziom > .5) && (pion > .5)) {
                moveX = -(right/x0);
                moveY = -(top/y0);
                document.querySelectorAll(".elipse").forEach(function(el){
                    el = el.id;
                    document.getElementById(el).style.transform = "translate("+Math.round(moveX*10)+"px, "+Math.round(moveY*10)+"px)";
                });
            } else if ((poziom > .5) && (pion < .5)) {
                moveX = -(right/x0);
                moveY = bottom/y0;
                document.querySelectorAll(".elipse").forEach(function(el){
                    el = el.id;
                    document.getElementById(el).style.transform = "translate("+Math.round(moveX*10)+"px, "+Math.round(moveY*10)+"px)";
                });
            /* Mouse on left side */
            } else if ((poziom < .5) && (pion < .5)) {
                moveX = left/x0;
                moveY = bottom/y0;
                document.querySelectorAll(".elipse").forEach(function(el){
                    el = el.id;
                    document.getElementById(el).style.transform = "translate("+Math.round(moveX*10)+"px, "+Math.round(moveY*10)+"px)";
                });
            } else if ((poziom < .5) && (pion > .5)) {
                moveX = left/x0;
                moveY = -(top/y0);
                document.querySelectorAll(".elipse").forEach(function(el){
                    el = el.id;
                    document.getElementById(el).style.transform = "translate("+Math.round(moveX*10)+"px, "+Math.round(moveY*10)+"px)";
                });
            } else {
                return
            }
        });
    };
};
function navback() {
    if (window.innerWidth > 470) {
        document.getElementById("wrapper").classList.remove("nav__wrapper--active");
        document.getElementById("wrapper").style.right = "0";
    } else {
        return
    }
};
function cookie (name) {
    let colour = [];
    document.querySelectorAll('.elipse').forEach(function(el){
        let klasa = document.getElementById(el.id).classList.value;
        colour.push(klasa);
       return colour;
    });
    const cookieName = encodeURIComponent(name);
    const cookieVal = encodeURIComponent(colour);
    document.cookie = cookieName+"=" + cookieVal;
}
/* Script to fixed
function setColours() {
    let counting = 0;

    if (document.cookie.indexOf('cookie_name=') == -1){
        let classArray = showCookie('Elipsy');
        classArray = classArray.split(/,|;/g);
        let newValue = [];
    document.querySelectorAll('.elipse').forEach(function(e){
        counting;
        let el = e.id;
        newValue[counting] = classArray[counting];
        document.getElementById(el).className = newValue[counting];
        counting++;
    });
} else {
    return
};
};
*/
function deleteCookie(name) {
    const cookieName = encodeURIComponent(name);
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function showCookie(name) {
    if (document.cookie != "") {
        const cookies = document.cookie.split(/; */);

        for (let i=0; i<cookies.length; i++) {
            const cookieName = cookies[i].split("=")[0];
            const cookieVal = cookies[i].split("=")[1];
            if (cookieName === decodeURIComponent(name)) {
                return decodeURIComponent(cookieVal);
            }
        }
    }
}
/* This unlucky script still waiting for his great day*/
/*window.addEventListener('DOMContentLoaded', setColours)*/
window.addEventListener('DOMContentLoaded', changingColours);
window.addEventListener('DOMContentLoaded', headImgChanger);
window.addEventListener('resize', navback);
window.addEventListener('resize', headImgChanger);
window.addEventListener('resize', listeners);
window.addEventListener('DOMContentLoaded', listeners);


