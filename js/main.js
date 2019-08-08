import "../sass/style.scss";
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();
/* This script I was writing in specific order.
At the beginning there are functions with their initializations.
At the end there are event listeners which launch each function.*/

/* I still work on this project */

// This is modal with newsletter popup

function popup () {
    const modal = document.querySelector("#modal"),
    modalClose = document.querySelector("#modalClose"),
    modalInput = document.querySelector("#modalInput"),
    newsletter = document.querySelector("#newsletter");
    function popupClose() {
        modal.classList.remove("modal--active");
        if (modalInput.value != 0){
            const securedMail = encodeURIComponent(modalInput.value);
           document.cookie = "Mail="+securedMail;
        } 
            else {
                let rezygnacja = "osoba odrzucająca newsletter";
                rezygnacja = encodeURIComponent(rezygnacja);
                document.cookie = "Mail="+rezygnacja;
            }
    };
    modalClose.addEventListener('click', popupClose);
    newsletter.addEventListener('submit', popupClose);

    // Veryfing if someone has chance to subscribe
    // Popup won't show again
    if (showCookie("Mail") != undefined){
        return
    } else {
    setTimeout(function() {
        modal.classList.add("modal--active");
    }, 1000);
   };
}

// Popup displaying after clic on the contact
function contactPopUp(){
    const modalContact = document.getElementById('contactModal'),
    contactClose = document.getElementById("contactModalClose"),
    form = document.getElementById('form');
    modalContact.classList.add("modal--active");
    form.addEventListener('submit', function(e){
        e.preventDefault();
        let name = document.getElementById('contactName').value,
        surName = document.getElementById('contactSurName').value,
        mail = document.getElementById('contactModalMail').value,
        content = document.getElementById('contactModalText').value,
        message = {};
        message.name = name;
        message.surName = surName;
        message.mail = mail;
        message.content = content;
        // Function which validate of inputs data correctness
        // It is based on regular expressions
        // It create cookie with object named "Wiadomość"
        // instead of sending message
        message.validate = function () {
            let regName = /^[a-zA-Z]{2,30}$/,
            regMail = /^\S+@\S+\.[A-Za-z]+$/;
            if (!(regName.test(this.name))) {
                alert("Wprowadź poprawnie swoje imie")
            } else if (!(regName.test(this.surName))) {
                alert("Wprowadź poprawnie swoje nazwisko")
            } else if (!(regMail.test(this.mail))) {
                alert ("Wprowadź poprawnie swój adres mailowy")
            } else if (this.content == 0) {
                alert("Wprowadź poprawnie treść wiadomości")
            } else {
                let messageToSend = encodeURIComponent(message);
                document.cookie = "Wiadomość="+messageToSend;
                modalContact.classList.remove('modal--active');
                alert("Wiadomość wysłano")
            }
        };
      message.validate();
    });
    contactClose.onclick = () => modalContact.classList.remove('modal--active');
};

// Changing header img when window inner width is bigger than 1024px
function headImgChanger () {
    if (window.innerWidth >= 1024) {
        document.getElementById('header').src = "./img/header-img-desktop.png";
        document.getElementById('logo').src = "./img/logo-desktop.png"
    } else {
        document.getElementById('header').src = "./img/header-img.png";
    };
};

// Displaying mobile menu when event occur
function toggle () {
const wrapper = document.getElementById('wrapper');
if (wrapper.classList.contains("nav__wrapper--active")) {
    slideEffect(); 
}
else {
    slideEffect();
}
}

// Generl function with listeners.
// I have prepared it in order to avoid globall variables
function listeners () {
    const menu = document.getElementById('hamburger'),
    contact = document.getElementById('contact');
    menu.addEventListener('click', toggle, true);
    contact.addEventListener('click', contactPopUp);
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

// Function to block scrolling during displaying mobile menu
function pageBlock() {
    const wrapper = document.getElementById('wrapper');
    if (wrapper.classList.contains("nav__wrapper--active")) {
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "auto";
    }
}

// Animation for mobile menu
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

//Function to changing colour of elipses
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

// Function which lets elipses for move oppsite to mouse movement
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

// Function fixed mobile menu animation
function navback() {
    if (window.innerWidth > 470) {
        document.getElementById("wrapper").classList.remove("nav__wrapper--active");
        document.getElementById("wrapper").style.right = "0";
    } else {
        return
    }
};

// Function setting cookie with elipses
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

// Function to showing cookies
function showCookie(name) {
    if (document.cookie != "" && document.cookie != undefined) {
        const cookies = document.cookie.split(/; */);

        for (let i=0; i<cookies.length-1; i++) {
            const cookieName = cookies[i].split("=")[0];
            const cookieVal = cookies[i].split("=")[1];
            if (cookieName === decodeURIComponent(name)) {
                return decodeURIComponent(cookieVal);
            }
        }
    }
}

//Event listeners
window.addEventListener('DOMContentLoaded', popup);
window.addEventListener('DOMContentLoaded', changingColours);
window.addEventListener('DOMContentLoaded', headImgChanger);
window.addEventListener('resize', navback);
window.addEventListener('resize', headImgChanger);
window.addEventListener('resize', listeners);
window.addEventListener('DOMContentLoaded', listeners);


