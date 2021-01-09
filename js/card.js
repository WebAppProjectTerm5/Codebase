export function drawCards(totalConfirmed, totalRecovered, totalActive, totalDeceased) {
    console.log(totalRecovered);
    document.getElementById("confirmedCard").innerHTML = totalConfirmed;
    document.getElementById("activeCard").innerHTML = totalActive;
    document.getElementById("recoveredCard").innerHTML = totalRecovered;
    document.getElementById("deceasedCard").innerHTML = totalDeceased;
    }
  

