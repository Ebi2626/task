import "../sass/style.scss";
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

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
    window.removeEventListener('mousemove', paralaksa);
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
                console.log("środek ekranu");
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
    console.log("działa");
    let colour = [];
    document.querySelectorAll('.elipse').forEach(function(el){
        let klasa = document.getElementById(el.id).classList.value;
        colour.push(klasa);
       return colour;
    });
    console.log(colour);
    const cookieName = encodeURIComponent(name);
    const cookieVal = encodeURIComponent(colour);
    document.cookie = cookieName+"=" + cookieVal;
}
function setColours() {
    if (document.cookie.con)
    document.querySelectorAll('.elipse').forEach(function(e){
        let el = e.id;
        let classArray = showCookie('Elipsy', e).replace(",", " ");
        document.getElementById(el).className = classArray;
        console.log(e.classArray);
        console.log(showCookie('Elipsy', 0));
    })
}
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
                return decodeURIComponent(cookieVal[i]);
            }
        }
    }
}
window.addEventListener('DOMContentLoaded', setColours)
window.addEventListener('DOMContentLoaded', changingColours);
window.addEventListener('DOMContentLoaded', headImgChanger);
window.addEventListener('resize', navback);
window.addEventListener('resize', headImgChanger);
window.addEventListener('resize', listeners);
window.addEventListener('DOMContentLoaded', listeners);


