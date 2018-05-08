//this module communicates with UI elements

var UIModule = (function () {
    'use strict'

    // landing page elements
    var candidatesList = document.querySelector('.candidates-list');
    var searchField = document.querySelector('input');
    var searchError = document.querySelector('.error');

    // reports page elements
    var candidateName = document.querySelector('#name');
    var candidateEmail = document.querySelector('#email');
    var candidateBirthday = document.querySelector('#date');
    var candidateEducation = document.querySelector('#education');
    var candidateAvatar = document.querySelector('#candidate-avatar');
    var reportsTable = document.querySelector('tbody');

    // modal box elements
    var modal = document.querySelector('#modal');
    var modalName = document.querySelector('#modal-name');
    var modalCompany = document.querySelector('#modal-company');
    var modalDate = document.querySelector('#modal-date');
    var modalPhase = document.querySelector('#modal-phase');
    var modalStatus = document.querySelector('#modal-status');
    var modalNotes = document.querySelector('#modal-notes');
    var closeButton = document.querySelector('#close');


    function getCandidateCard() {
        var candidateCard = document.querySelectorAll('.candidate-info');
        return candidateCard;
    }


    // removes loading icon from page
    function clearContent() {
        candidatesList.innerHTML = '';
    }

    function createCandidateCard(candidate) {
        var candidateCard = "<div class='candidate-info' value='" + JSON.stringify(candidate) + "'><div class='image-box'><img src='" + candidate.avatar + "' alt='candidate image'/></div><p class='candidate-name'>" + candidate.name + "</p><p class='email'>" + candidate.email + "</p></div>";
        candidatesList.innerHTML += candidateCard;
    }

    // 
    function populateCandidateInfo(candidate) {
        candidateName.innerHTML = candidate.name;
        candidateEmail.innerHTML = candidate.email;
        candidateBirthday.innerHTML = candidate.birthday;
        candidateEducation.innerHTML = candidate.education;
        candidateAvatar.setAttribute('src', candidate.avatar);
    }

    function populateReports(reports) {
        for (var i = 0; i < reports.length; i++) {
            var row = document.createElement('tr');
            row.innerHTML = "<td>" + reports[i].companyName + "</td><td>" + reports[i].interviewDate + "</td><td>" + reports[i].status + "<img class='open-modal' src='../img/preview.png' value='"+ JSON.stringify(reports[i]) +"'></td>";
            reportsTable.appendChild(row);
        }
    }

    function getModalTriggers() {
        var modalTriggers = document.querySelectorAll('.open-modal');
        return modalTriggers;
    }

    function populateModal(report) {
        modalName.innerHTML = report.candidateName;
        modalCompany.innerHTML = report.companyName;
        modalDate.innerHTML = report.interviewDate;
        modalPhase.innerHTML = report.phase;
        modalStatus.innerHTML = report.status;
        modalNotes.innerHTML = report.note;
    }

    
    return {
        createCandidateCard: createCandidateCard,
        clearContent: clearContent,
        searchField: searchField,
        searchError: searchError,
        getCandidateCard: getCandidateCard,
        populateCandidateInfo: populateCandidateInfo,
        populateReports: populateReports,
        getModalTriggers: getModalTriggers,
        modal: modal,
        populateModal: populateModal, 
        closeButton: closeButton
    }

})();