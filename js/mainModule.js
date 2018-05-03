//this is controller module

var mainModule = (function() {

    function printCandidates(candidatesList) {
        UIModule.clearContent();
        for(var i = 0; i < candidatesList.length; i++) {
            UIModule.createCandidateCard(candidatesList[i]);
        }
    }

    dataModule.getData('candidates', printCandidates);
    
    UIModule.searchField.addEventListener('keyup', function(event) {
        var searchQuery = 'candidates?q=' + event.target.value;
        if(event.target.value.search(/[^A-Za-z ]/) == -1) {
            UIModule.searchError.style.display = 'none';
            dataModule.getData(searchQuery, printCandidates);
        } else {
            UIModule.searchError.style.display = 'block';
        }
    })
  
    







}


)(dataModule, UIModule);