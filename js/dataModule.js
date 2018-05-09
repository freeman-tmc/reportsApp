
var dataModule = (function () {
    'use strict'

    // date conversion
    function convertDate(date) {
        var longForm = new Date(date);
        var dateString = longForm.getDate() + '.' + (longForm.getMonth() + 1) + '.' + longForm.getFullYear();
        return dateString;
    }

    // creating candidate data local objects
    function CandidateData(data) {
        this.avatar = data.avatar;
        this.birthday = convertDate(data.birthday);
        this.education = data.education;
        this.email = data.email;
        this.id = data.id;
        this.name = data.name;
    }

    // creating reports data local objects
    function ReportsData(data) {
        this.id = data.id;
        this.candidateId = data.candidateId;
        this.candidateName = data.candidateName;
        this.companyId = data.companyId;
        this.companyName = data.companyName;
        this.interviewDate = convertDate(data.interviewDate);
        this.phase = data.phase;
        this.status = data.status;
        this.note = data.note;
    }

    // collecting data from server
    function getData(query, callBack) {
        
        // creating ajax request
        var xhtr = new XMLHttpRequest();
        xhtr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var result = JSON.parse(this.responseText);
                // call to callback function which is passed to getData function
                callBack(result);
            }
        }

        xhtr.open('GET', 'http://localhost:3333/api/' + query, true);
        xhtr.send();   
    }

    return {
        getData: getData,
        CandidateData: CandidateData,
        ReportsData: ReportsData
    }

})();