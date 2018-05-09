
var mainModule = (function () {
    'use strict'

    // landing page handler
    function mainPageHandler() {

        // callback for ajax request, creates candidate cards and sets event listener
        // for each one
        function printCandidates(result) {
            var candidatesList = [];
            // for each element of the result array, creates candidate object
            for (var i = 0; i < result.length; i++) {
                var candidate = new dataModule.CandidateData(result[i]);
                candidatesList.push(candidate);
            }
            // removes loading icon from page
            UIModule.clearContent();

            // displays card for each candidate
            UIModule.createCandidateCards(candidatesList);
            
            // sets event listener for each candidate card
            var candidateCards = UIModule.getCandidateCard();
            for (i = 0; i < candidateCards.length; i++) {
                candidateCards[i].addEventListener('click', function () {
                    var id = this.getAttribute('value');
                    sessionStorage.setItem('candidate', id);
                    open('./pages/candidate_reports_page.html');
                });
            }
        }

        // passing parameters to dataModule getData method
        dataModule.getData('candidates', printCandidates);

        // search input event listener
        UIModule.searchField.addEventListener('keyup', function (event) {
            var searchQuery = 'candidates?q=' + event.target.value;
            dataModule.getData(searchQuery, printCandidates);
        });

    }


    // reports page handler
    function reportsPageHandler() {

        // callback function for ajax request
        function printReports(result) {
            var reportsList = [];
            for (var i = 0; i < result.length; i++) {
                var report = new dataModule.ReportsData(result[i]);
                reportsList.push(report);
            }
            // populate table row with data
            UIModule.populateReports(reportsList);
            // sets event listeners to each report to open modal box
            var modalTriggers = UIModule.getModalTriggers();
            for (i = 0; i < modalTriggers.length; i++) {
                modalTriggers[i].addEventListener('click', function () {
                    var data = this.getAttribute('value');
                    var report = JSON.parse(data);
                    UIModule.populateModal(report);
                    UIModule.modal.style.display = 'flex';
                });
            }
        }

        // getting data from session storage and displaying them on the page
        var canditateInfo = sessionStorage.getItem('candidate');
        var candidate = JSON.parse(canditateInfo);
        UIModule.populateCandidateInfo(candidate);

        // getting reports data for candidate
        var searchQuery = 'reports?candidateId=' + candidate.id;
        dataModule.getData(searchQuery, printReports);

        // modal close code
        UIModule.modal.addEventListener('click', function (event) {
            if (event.target == this || event.target == UIModule.closeButton) { 
                this.style.display = 'none';
            }
        });

        // event listeners for column headers, table sort
        for (var i = 0; i < UIModule.tableHeaders.length; i++) {
            (function(j) {
                var j = i;
                UIModule.tableHeaders[i].addEventListener('click', function() {
                    UIModule.sortTable(j);
                });
            })(i);
        }

    }

    return {
        mainPageHandler: mainPageHandler,
        reportsPageHandler: reportsPageHandler
    }


})();


