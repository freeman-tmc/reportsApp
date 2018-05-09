
var UIModule = (function () {
    'use strict'

    // landing page elements
    var candidatesList = document.querySelector('.candidates-list');
    var searchField = document.querySelector('input');

    // reports page elements
    var candidateName = document.querySelector('#name');
    var candidateEmail = document.querySelector('#email');
    var candidateBirthday = document.querySelector('#date');
    var candidateEducation = document.querySelector('#education');
    var candidateAvatar = document.querySelector('#candidate-avatar');
    var tableHeaders = document.querySelectorAll('th');
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

    // selects all candidate card
    function getCandidateCard() {
        var candidateCard = document.querySelectorAll('.candidate-info');
        return candidateCard;
    }

    // removes loading icon from page
    function clearContent() {
        candidatesList.innerHTML = '';
    }

    // creates candidate card from candidate object(landing page)
    function createCandidateCards(candidates) {
        for (var i = 0; i < candidates.length; i++) {
            var candidateCard = "<div class='candidate-info' value='" + JSON.stringify(candidates[i]) + "'><div class='image-box'><img src='" + candidates[i].avatar + "' alt='candidate image'/></div><p class='candidate-name'>" + candidates[i].name + "</p><p class='email'>" + candidates[i].email + "</p></div>";
            candidatesList.innerHTML += candidateCard;
        }
    }

    // fills out candidate info(candidate reports page)
    function populateCandidateInfo(candidate) {
        candidateName.innerHTML = candidate.name;
        candidateEmail.innerHTML = candidate.email;
        candidateBirthday.innerHTML = candidate.birthday;
        candidateEducation.innerHTML = candidate.education;
        candidateAvatar.setAttribute('src', candidate.avatar);
    }

    // creates reports table 
    function populateReports(reports) {
        for (var i = 0; i < reports.length; i++) {
            var row = document.createElement('tr');
            row.innerHTML = "<td>" + reports[i].companyName + "</td><td>" + reports[i].interviewDate + "</td><td>" + reports[i].status + "</td><td><img class='open-modal' src='../img/preview.png' value='" + JSON.stringify(reports[i]) + "'></td>";
            reportsTable.appendChild(row);
        }
    }

    // selects report preview icons
    function getModalTriggers() {
        var modalTriggers = document.querySelectorAll('.open-modal');
        return modalTriggers;
    }

    // fills modal box with data
    function populateModal(report) {
        modalName.innerHTML = report.candidateName;
        modalCompany.innerHTML = report.companyName;
        modalDate.innerHTML = report.interviewDate;
        modalPhase.innerHTML = report.phase;
        modalStatus.innerHTML = report.status;
        modalNotes.innerHTML = report.note;
    }
    
    // table sort code 
    function sortTable(n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.querySelector('table');
        switching = true;
        // Set the sorting direction to ascending:
        dir = "asc";
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.querySelectorAll('tr');
            /* Loop through all table rows (except the
            first, which contains table headers): */
            for (i = 1; i < rows.length - 1; i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                x = rows[i].querySelectorAll('td')[n];
                y = rows[i + 1].querySelectorAll('td')[n];
                /* Check if the two rows should switch place,
                based on the direction, asc or desc: */
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /* If a switch has been marked, make the switch
                and mark that a switch has been done: */
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                // Each time a switch is done, increase this count by 1:
                switchcount++;
            } else {
                /* If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again. */
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

    return {
        createCandidateCards: createCandidateCards,
        clearContent: clearContent,
        searchField: searchField,
        getCandidateCard: getCandidateCard,
        populateCandidateInfo: populateCandidateInfo,
        populateReports: populateReports,
        getModalTriggers: getModalTriggers,
        modal: modal,
        populateModal: populateModal,
        closeButton: closeButton,
        sortTable: sortTable,
        tableHeaders: tableHeaders
    }

})();