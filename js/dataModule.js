//this should be module for communication with json server

var dataModule = (function () {
    'use strict'

    //converting server data to local objects
    function CandidateData(data) {
        this.avatar = data.avatar;
        this.birthday = data.birthday;
        this.education = data.education;
        this.email = data.email;
        this.id = data.id;
        this.name = data.name;
    }

    function getData(query, callBack, method, header, postData) {
        // default method if method is not set
        method = method || 'GET';
        //response data container
        var listOfCandidates = [];
        //creating ajax request
        var xhtp = new XMLHttpRequest();
        xhtp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var result = JSON.parse(this.responseText);

                //for each element of the result array, creates candidate object
                for (var i = 0; i < result.length; i++) {
                    var candidate = new CandidateData(result[i]);
                    listOfCandidates.push(candidate);
                }
                //call callback function if is passed to getData function
                if (callBack) {
                    callBack(listOfCandidates);
                }
            }
        }
        //set request header from header array
        if (header) {
            xhtp.setRequestHeader(header[0], header[1]);
        }

        xhtp.open(method, 'http://localhost:3333/api/' + query, true);
        xhtp.send(postData);
        
    }

    return {
        getData: getData
    }

})();