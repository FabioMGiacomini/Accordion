/**
 * Title: Accordion 
 * Description: Accordion with data retrieved from a local json file
 * Author: Fabio Mario Giacomini 
 * email: info@viarete.it
 * tags: accordion, fetch, json
 */
const accordionContainer = document.querySelector('#accordion'); 

fetch("data/data.json")
.then(response => { 
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    } 
    return response.json();
  })
.then(data => creaAccordion(data)) 
.catch(err => console.error(err))
 
function creaAccordion(datatext){
    datatext.forEach((bloccoTesto) => { 
         
    const accordionSingolo = document.createElement('div');
    accordionSingolo.classList.add('accordionDiv')
    
    const accordionButton = document.createElement('button');
    accordionButton.classList.add('accordionButton')
    accordionButton.textContent = bloccoTesto.titolo

    const accordionContent = document.createElement('div')
    accordionContent.classList.add('accordionContent')
    accordionContent.textContent =  bloccoTesto.testo

    accordionSingolo.append(accordionButton, accordionContent)

    accordionContainer.append(accordionSingolo)
    
    /**
     * meccanismo di apertura dei bottoni
     * al click chiude eventuali altri bottoni aperti chiamando la funzione
     * chiudiAccordion poi aggiungo la classe showContent al div del bottone attuale per mostrare
     * il contenuto e la classe open al bottone attivo per girare la freccia via css (effetto aperto). se clicco sullo stesso bottone, per chiuderlo controllo
     * se esiste la classe showContent e open e le rimuovo, poi interrompo prima di
     * chiamare chiudiAccordion con return 
     */
    accordionButton.addEventListener('click', function(){  
        if (this.nextElementSibling.classList.contains('showContent')) {
            accordionContent.classList.remove('showContent')   
            this.classList.remove('open')
            return
        }
        chiudiAccordion()   
        this.classList.add('open')
        accordionContent.classList.add('showContent')   
   })
  })
}


/**
 * funzione chiudiAccordion
 * cerca tutte le classi showContent e open nel container
 * e le rimuove
 */
function chiudiAccordion() {
        const accordionAperto = accordionContainer.querySelectorAll('.showContent')
        const bottoneOpen = accordionContainer.querySelectorAll('.open')
        for(i=0; i<accordionAperto.length; i++){ 
            accordionAperto[i].classList.remove('showContent'); 
            bottoneOpen[i].classList.remove('open')
        }   
}
