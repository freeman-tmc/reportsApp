// this is controller module
var mainModule = (function () {
    'use strict'

    function mainPageHandler() {

        // callback for ajax request, creates candidate cards and sets even listener
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
            for (var i = 0; i < candidatesList.length; i++) {
                UIModule.createCandidateCard(candidatesList[i]);
            }
            // sets event lisener for each candidate card
            var candidateCards = UIModule.getCandidateCard();
            for (i = 0; i < candidateCards.length; i++) {
                candidateCards[i].addEventListener('click', function () {
                    var id = this.getAttribute('value');
                    sessionStorage.setItem('candidate', id);
                    open('./pages/candidate_reports_page.html');
                });
            }
        }

        dataModule.getData('candidates', printCandidates);

        // check and remove this error check if needed
        UIModule.searchField.addEventListener('keyup', function (event) {
            var searchQuery = 'candidates?q=' + event.target.value;
            if (event.currentTarget.value.search(/[^A-Za-z ]/) == -1) {
                UIModule.searchError.style.display = 'none';
                dataModule.getData(searchQuery, printCandidates);

            } else {
                UIModule.searchError.style.display = 'block';
            }
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
            //populate table row with datak
            UIModule.populateReports(reportsList);
            // set event listeners to each report
            var modalTriggers = UIModule.getModalTriggers();
            for (i = 0; i < modalTriggers.length; i++) {
                modalTriggers[i].addEventListener('click', function() {
                    var nesto = this.getAttribute('value');
                    var report = JSON.parse(nesto);
                    UIModule.populateModal(report);
                    UIModule.modal.style.display = 'flex';
                });
            }
        }

        var canditateInfo = sessionStorage.getItem('candidate');
        var candidate = JSON.parse(canditateInfo);
        UIModule.populateCandidateInfo(candidate);
        var searchQuery = 'reports?candidateId=' + candidate.id;
        dataModule.getData(searchQuery, printReports);
        UIModule.modal.addEventListener('click', function(event) {
            if(event.target == this || event.target == UIModule.closeButton) {
                //console.log(this);
                console.log(event.target);
                this.style.display = 'none';
            }
        });

        
    }

    return {
        mainPageHandler: mainPageHandler,
        reportsPageHandler: reportsPageHandler
    }


})(dataModule, UIModule);

