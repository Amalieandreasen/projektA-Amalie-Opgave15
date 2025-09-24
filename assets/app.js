// variabler
// Her oprettes det array hvor alle kontakterne ligger i
let contactArray = [];

// Dom elementer
const form = document.querySelector(".contactForm");
const tbody = document.querySelector(".contactList");
const select = document.getElementById("sort");
const navn = document.querySelector(".name");
const telefonnummer = document.querySelector(".phone");
const email = document.querySelector(".mail");

// Kontakt class
// Jeg laver en klasse for at kunne oprette flere kontakt objekter senere og gør koden mere strukteret. der kan også tilføjes metoder til klassen
class Kontakt {
    navn;
    telefonnummer;
    email;

    // laver en instans af en klasse
    constructor(navn, telefonnummer, email){
        this.navn = navn;
        this.telefonnummer = telefonnummer;
        this.email = email;
    }

}

// funktioner
// her laves funktionen til at fjerne den korrekte kontakt fra arrayet
function deleteContact(){ 
    // hentes id på knappen
    const index = Number(this.id); 
    // sletter 1 element og det korrekte element med id'et
    contactArray.splice(index,1);
     showList(); 
    }

// funktion til at vise listen
function showList(){
    // rydde html'en
    tbody.innerHTML = "";
    
    // lave et loop for hver kontakt der oprettes
    for(let i = 0; i < contactArray.length; i++){
        const row = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.textContent = contactArray[i].navn;

    const phoneTd = document.createElement("td");
    phoneTd.textContent = contactArray[i].telefonnummer;

    const mailTd = document.createElement("td");
    mailTd.textContent = contactArray[i].email;

    const deleteTd = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "&#x1F5D1;";
    deleteBtn.id = i;
    deleteBtn.addEventListener("click", deleteContact);
    deleteTd.appendChild(deleteBtn);


    row.appendChild(nameTd);
    row.appendChild(phoneTd);
    row.appendChild(mailTd);
    row.appendChild(deleteTd);
    tbody.appendChild(row);
    }
}

// funktion til at sortere alfabetisk og skal bruges til navn og email
// sort bruges til at ændre rækkefølgen i et array
// jeg har brugt localcompare i compare funktionen da det er case sensititvt og kan tage dansk bogstaver med. sammenligner to tekststrenge ift alfabetisk rækkefølge
function sortAlfabetic(x){
    // a,b = to kontaktobjekter
    contactArray.sort((a,b) => {
        return a[x].localeCompare(b[x], 'da', { sensitivity: 'base' });
    });
}

// Eventlisteners
// evenlistener som lytter til submit når brugeren opretter en kontakt. 
form.addEventListener("submit", function (event){
    // forhindrer at siden genindlæses
    event.preventDefault();

    // tjekker om telefonummeret indeholder 8 karaktere og tillader white space karaktere
    const phoneRegex = /^\s?[1-9]\d{7}\s?$/;

    // tjekker om emailen lever op til standarden som f.eks mail@mail.dk    
    const mailRegex = /^[a-zæøå0-9.]+@([a-zæøå0-9]+\.)+[a-zæøå]{2,}$/i;

    // hvis ikke det matcher alerter beskeden
    if(!phoneRegex.test(telefonnummer.value)){
        alert("ugyldigt telefonnummer. skriv 8 cifre");
        return;
    }
    if(!mailRegex.test(email.value)){
        alert("ugyldig email");
        return;
    }

    // pusher objektet fra vores klasse til arryet
    let newContact = new Kontakt(navn.value, telefonnummer.value, email.value);
    contactArray.push(newContact);
    form.reset();
    showList();
});


// eventlistener som lytter til ændringer i select.
// forskellige if statements alt efter hvilken kategori brugeren vælger
select.addEventListener("change", function(){
    if(this.value === "navn"){
        sortAlfabetic("navn");
    } else if (this.value === "email"){
        sortAlfabetic("email");
    } else if(this.value === "telefonnummer"){
        contactArray.sort((a,b) => Number(a.telefonnummer) - Number(b.telefonnummer));
    }
    showList();
});