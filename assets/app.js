// lav alt html som form og knapper som brugeren kan interagerer med
// brug objekt orienteret programmering til at lave en klasse der hedder kontakt
// kontakt skal indeholde navn, telefonnummer og email
// der skal laves et array som hver kontakt kan gemmes i
// gem form, input og knapperne i variabler
// lav en eventlistener på formen der tilføjer en ny konntakt til arrayet
// lav en funktion der sortere i arrayet efter kontakterne. efter navn, telefonnummer og email
// lav en funktion til at slette en kontakt

// variabler
let contactArray = [];

// Dom elementer
const form = document.querySelector(".contactForm");
const ul = document.querySelector(".contactList");
const select = document.getElementById("sort");
const navn = document.querySelector(".name");
const telefonummer = document.querySelector(".phone");
const email = document.querySelector(".mail");

// Kontakt class
class Kontakt {
    navn;
    telefonummer;
    email;

    constructor(navn, telefonummer, email){
        this.navn = navn;
        this.telefonummer = telefonummer;
        this.email = email;
    }

    show(){
        return `Navn: ${this.navn} Telefonnummer: ${this.telefonummer} E-mail: ${this.email}`;
    }
}

// Eventlisteners
form.addEventListener("submit", function (event){
    event.preventDefault();

    let newContact = new Kontakt(navn.value, telefonummer.value, email.value);
    contactArray.push(newContact);
    form.reset();
    showList();
})

// funktioner
function deleteContact(){
    const deleteContact = Number(this.id);
    contactArray.splice(deleteContact,1);
    showList();
}

function showList(){
    ul.innerHTML = "";
    
    for(let i = 0; i < contactArray.length; i++){
        const p = document.createElement("p");
        const span = document.createElement("span");

        span.innerHTML ="&#x1F5D1;"; 
        span.id = i;
        span.addEventListener("click", deleteContact);

        p.textContent = contactArray[i].show();
        p.appendChild(span);
        ul.appendChild(p);
    }
}

function sortAlfabetic(x){
    contactArray.sort((a,b) =>{
        const ap = a[x].toLowerCase();
        const bp = b[x].toLowerCase();
        if (ap > bp) return 1;
        if(ap < bp) return -1;
        return 0;
    })
}

document.querySelector(".sortName").addEventListener("click", function(){
    sortAlfabetic("navn");
    showList()
})

document.querySelector(".sortMail").addEventListener("click", function(){
    sortAlfabetic("email");
    showList()
})

document.querySelector(".sortPhone").addEventListener("click", function(){
    contactArray.sort((a,b) => a.telefonummer - b.telefonummer);
    showList()
})