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

}


// funktioner
function deleteContact(){
    const deleteContact = Number(this.id);
    contactArray.splice(deleteContact,1);
    showList();
}

function showList(){
    ul.innerHTML = "";
    
    for(let i = 0; i < contactArray.length; i++){
        const row = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.textContent = contactArray[i].navn;

    const phoneTd = document.createElement("td");
    phoneTd.textContent = contactArray[i].telefonummer;

    const mailTd = document.createElement("td");
    mailTd.textContent = contactArray[i].email;

    const actionTd = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "&#x1F5D1;";
    deleteBtn.id = i;
    deleteBtn.addEventListener("click", deleteContact);
    actionTd.appendChild(deleteBtn);


    row.appendChild(nameTd);
    row.appendChild(phoneTd);
    row.appendChild(mailTd);
    row.appendChild(actionTd);
    ul.appendChild(row);
    }
}

function sortAlfabetic(x){
    contactArray.sort((a,b) => {
        return a[x].localeCompare(b[x], 'da', { sensitivity: 'base' });
    });
}

// Eventlisteners
form.addEventListener("submit", function (event){
    event.preventDefault();

    let newContact = new Kontakt(navn.value, telefonummer.value, email.value);
    contactArray.push(newContact);
    form.reset();
    showList();
})

select.addEventListener("change", function(){
    if(this.value === "navn"){
        sortAlfabetic("navn");
    } else if (this.value === "email"){
        sortAlfabetic("email");
    } else if(this.value === "telefonnummer"){
        contactArray.sort((a,b) => Number(a.telefonummer) - Number(b.telefonummer))
    }
    showList()
})