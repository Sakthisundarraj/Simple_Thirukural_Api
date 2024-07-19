const btn = document.querySelector("#btn");
const kuralinput = document.querySelector("#kuralinput");
const card = document.querySelector(".card");

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const kural = kuralinput.value;
    if(kural>=1 && kural<=1330){
        try {
            const kuraldata = await getKuralData(kural);
            displayKural(kuraldata);
        } catch (error) {
            displayError(error)
        }
    } else {
        displayError("Please Enter The Kural Number(1 To 1330)")
    }
});

async function getKuralData(number) {
    const apiurl = `https://getthirukkural.appspot.com/api/3.0/kural/${number}?appid=18c2aukokxmoz`;
    const response = await fetch(apiurl);


    if(!response.ok){
        throw new Error("Could Not fetch Kural Data")
    }
    return await response.json();
}

function displayKural(data) {
    // Display the retrieved Kural data in the card
    card.style.display ="flex"
    card.textContent =""
    
    card.innerHTML += `
    <div class="content1">
        <h3>திருக்குறள்:${data.number}</h3>
        <ul>
            <li>${data.line1}</li>
            <li>${data.line2}</li>
        </ul>
        <h4>பொருள்:</h4>
        <p>${data.urai1}</p>
    </div>
    <br>
    <div class="content1">
        <h5>Thirukural ${data.number}:</h5>
        <h4>translation:</h4>
        <p>${data.translation}</p>
    </div>
    `
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent =message;

    card.textContent=""
    card.style.display ="flex"
    card.appendChild(errorDisplay)
}