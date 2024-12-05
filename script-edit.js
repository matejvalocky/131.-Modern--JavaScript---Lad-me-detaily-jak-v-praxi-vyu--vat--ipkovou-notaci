let nameID = location.hash.substring(1)

let names = getSavedNames()

let searchedName = names.find(function(oneObject){
    return oneObject.id === nameID
})

if (searchedName === undefined){
    location.assign("/index.html")
}


document.querySelector("#editedName").value = searchedName.firstName // zobrazí hodnotu editovaného obsahu v políčku s id editedName

let changingForm = document.querySelector("#changing-form")

changingForm.addEventListener("submit", function(event){
    event.preventDefault()

    

    searchedName.firstName = event.target.elements.changingName.value

    saveNames(names)

})

// udalosť vznikne vtedy, keď sa čokoľvek zmení v localStorage
window.addEventListener("storage", function(event){
    console.log(event) // vypisuje na stránkach, kde nedochádza priamo k zmene

    if (event.key === "names") {
        names = JSON.parse(event.newValue) 
    }

    let searchedName = names.find(function(oneObject){
        return oneObject.id === nameID
    })
    
    if (searchedName === undefined){
        location.assign("/index.html")
    }
    
    
    document.querySelector("#editedName").value = searchedName.firstName // zobrazí hodnotu editovaného obsahu v políčku s id editedName

})