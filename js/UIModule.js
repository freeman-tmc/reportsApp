//this module communicates with UI elements

var UIModule = (function() {
    'use strict'

    var candidatesList = document.querySelector('.candidates-list');
    var searchField = document.querySelector('input');
    var searchError = document.querySelector('.error');
    // var nameBox = document.querySelector('.candidate-name');
    // var imageBox = document.querySelector('.image-box');
    
    
    // removes loading icon from page
    function clearContent() {
        candidatesList.innerHTML = '';
    }

    function createCandidateCard(candidate) {
        var candidateCard = '<div class="candidate-info"><div class="image-box"><img src="' + candidate.avatar + '" alt="candidate image"></div><p class="candidate-name">' + candidate.name + '</p><p class="email">' + candidate.email +'</p></div>';
        candidatesList.innerHTML += candidateCard;
    }

    
    return {
        createCandidateCard: createCandidateCard,
        clearContent: clearContent,
        searchField: searchField,
        searchError: searchError
    }

})();