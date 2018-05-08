//this should be module for communication with json server

var dataModule = (function () {
    'use strict'

    // date conversion
    function convertDate(date) {
        var longForm = new Date(date);
        var dateString = longForm.getDate() +'.'+ (longForm.getMonth() + 1) + '.'+ longForm.getFullYear();
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

    
    function getData(query, callBack, method, header, postData) {
        
        // default method if method is not set
        method = method || 'GET';
        //creating ajax request
        var xhtr = new XMLHttpRequest();
        xhtr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var result = JSON.parse(this.responseText);
                //call to callback function which is passed to getData function
                callBack(result);
            }
        }
        //set request header from header array
        if (header) {
            xhtr.setRequestHeader(header[0], header[1]);
        }

        xhtr.open(method, 'http://localhost:3333/api/' + query, true);
        xhtr.send(postData);   
    }

    return {
        getData: getData,
        CandidateData: CandidateData,
        ReportsData: ReportsData
    }

})();