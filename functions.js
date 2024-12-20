// funkcia načítajúca dáta z localStorage, ošetriť, či dáta v localStorage nie sú 


// Získať uložené mená
const getSavedNames =  () => {
  const myNames = localStorage.getItem("names")

  if (myNames !== null){
    return JSON.parse(myNames) // preparsuj mi data
  } else {
    return [] // prazdne pole
  }
}


// funkcia pre použitie odoslania formulára, ukladá do localStorage meno z formulára


// uloženie mien
const saveNames = (oneName) => { // prepis na šípkovú notáciu
    localStorage.setItem("names", JSON.stringify(oneName))
}


// generovanie html štruktúry, ktorú umiestnime do stránky po kliknutí na tlačídlo vypíš + použijeme ju tiež pre vypísanie nových informácii z localStorage, keď nejaké meno vymažeme pomocou tlačídla "Vymazať meno"

const generateHTMLstructure = (oneName) => { // prepis na šípkovú notáciu
    const newDiv = document.createElement("div")
    const newLink = document.createElement("a")
    const button = document.createElement("button")

    // nastavenie mazacieho tlačídla
    button.textContent = "Vymazať meno"
    newDiv.appendChild(button)


    button.addEventListener("click", (event) => { // prepis na šípkovú notáciu
        removeNames(names, oneName.id)
        saveNames(names) // vytvorenie alebo upgradovanie dat v localStorage
        toListAgain()
    })



    newLink.textContent = oneName.firstName

    if (oneName.adult === true){
        newLink.classList.add("adult")
    } else {
        newLink.classList.add("no-adult")
    }

    newLink.setAttribute("href", `/edit.html#${oneName.id}`)
    
    newDiv.appendChild(newLink)
    return newDiv
}


// podľa ID nájdeme index daného mena a pomocou slice ho odstraníme

const removeNames = (ourNames, id) => { // prepis na šípkovú notáciu
    const index = ourNames.findIndex((nameWantToCheck) => 
         nameWantToCheck.id === id
    )

    if(index > -1){
        ourNames.splice(index, 1)
    } 
}

// ak zmažeme nejaké meno z localStorage, tak táto funkcia zabezpečí opätovné vypísanie localStorage (teda vypísanie bez zmazaného mena na stránke

const toListAgain = () => {
    document.querySelector(".list-names").innerHTML = ""

    let newData = getSavedNames()
    
    newData.forEach((onlyOneName) => {
        const newContent = generateHTMLstructure(onlyOneName)
        document.querySelector(".list-names").appendChild(newContent)
    })
}