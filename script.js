// Načítanie dát z localStorage do premennej names, ak je localStorage prázdné, tak do names sa uloží prázdne pole

const names = getSavedNames()



// Odoslanie formulára a uloženie do localStorage pomocou premennej names
let myForm = document.querySelector("#test-form")
let myCheckbox = document.querySelector(".my-checkbox")



myForm.addEventListener("submit", (event) => { // nemožno odstrániť kučeravé zátvorky, pretože je to blok kódu - nezmestí sa na jeden riadok, nedá sa zmazať ani return, lebo v kode žiadny return nie je
    event.preventDefault()

    names.push({
        id: uuidv4(),
        firstName: event.target.elements.firstName.value, // hodnota políčka
        adult: myCheckbox.checked
    })

    event.target.elements.firstName.value = ""
    myCheckbox.checked = false // zrušenie zaškrtnutia
    saveNames(names)

})


// Vypisovanie späť do stránky

let buttonToList = document.querySelector(".to-list")

buttonToList.addEventListener("click", (event) => { 
    // prepis  na šípkovú notáciu, ďalšie zmeny urobiť nemôžeme =>  nemožno odstrániť kučeravé zátvorky, pretože je to blok kódu - nezmestí sa na jeden riadok, nedá sa zmazať ani return, lebo v kode žiadny return nie je
    document.querySelector(".list-names").innerHTML = "" // zabraňujeme dvojitému vypisovaniu
    let namesFromStorage = localStorage.getItem("names")
    let namesFromStorageJSON = JSON.parse(namesFromStorage)


    namesFromStorageJSON.forEach((myName) => {
       const oneNameHTML = generateHTMLstructure(myName)
       document.querySelector(".list-names").appendChild(oneNameHTML)
    })


})



// reload stránky po zmene v localStorage
window.addEventListener("storage", () => {
    location.reload()
})

