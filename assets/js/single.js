// 13. after adding div to html with id="limit-warning"
var limitWarningEl = document.querySelector("#limit-warning");
//9. create a reference to the issues container
var issueContainerEl = document.querySelector("#issues-container");
//1. creating a getRepoIssues() function that will take in a repo name as a parameter

//1.1 create function
//1.5. update:
var getRepoName = function () {
    // grab repo name from url query string
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];

    if (repoName) {
        // display repo name on the page
        repoNameEl.textContent = repoName;

        getRepoIssues(repoName);
    } else {
        // if no repo was given, redirect to the homepage
        document.location.replace("./index.html");
    }
};
// var queryString = document.location.search;
// var repoName = queryString.split("=")[1];
// // getRepoIssues(repoName);
// // repoNameEl.textContent = repoName;
// //move the getRepoIssues() and the repoName.textContent expressions into a conditional statement that checks if the repoName exists
// if (repoName) {
//     repoNameEl.textContent = repoName;
//     getRepoIssues(repoName);
// } else {
//     document.location.replace("./index.html");
// }

// var getRepoName = function (repoName) {//then 1.2. Let's also remove the hardcoded function call for getRepoIssues()
//     var queryString = document.location.search;//1.3 add to the getRepoName() function by using the location object and split() method to extract the repo name from the query string
//     //1.4. By splitting on the =, you'll end up with an array with two elements, indexes start at zero, so we'll need to use [1] to get the second element
//     var repoName = queryString.split("=")[1];
//     console.log(repoName);

//var repoNameEl = document.querySelector("#repo-name");
var getRepoIssues = function (repo) {
    console.log(repo);
    // 2. Fetch API to create an HTTP request.create a variable to hold the query
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    //3. Create a request with fetch(), and pass in the apiUrl variable created
    //fetch(apiUrl); //4. Update the fetch() request to receive and handle the server's response:
    fetch(apiUrl).then(function (response) {
        // request was successful
        if (response.ok) {//indicates a successful request
            response.json().then(function (data) {
                //console.log(data);
                // 6. instead of console.log pass response data to dom function
                displayIssues(data);
                //12.make sure we let users know if there are more issues that can't be viewed. If that's the case, we'll direct users to GitHub, where they can see the full list.
                // check if api has paginated issues

                if (response.headers.get("Link")) {
                    //console.log("repo has more than 30 issues");
                    //17. =>replace with:
                    displayWarning(repo);
                }

            });
        } else {
            //alert("There was a problem with your request!");
            document.location.replace("./index.html");
        }
    });
};
//5. new function for the issues
var displayIssues = function (issues) {//call this function after a successful HTTP reques
    //11. This code will display a message in the issues container, letting users know there are no open issues for the given repository
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    //7. In the displayIssues() function, loop over the response data and create an <a> element for each issue
    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");//So far, we've only created an empty <a> element called issueEl for each issue=>
        //add content to these elements=>
        //display each issue's name as well as its type—either an actual issue or a pull request
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);//Issue objects have an html_url property, which links to the full issue on GitHub
        issueEl.setAttribute("target", "_blank");//added a target="_blank" attribute to each <a> element, to open the link in a new tab instead of replacing the current webpage

        // 8. create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        // append to container
        issueEl.appendChild(typeEl);

        // 10. 
        issueContainerEl.appendChild(issueEl);
    }

};
//14. function
var displayWarning = function (repo) {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    // 15.Then in displayWarning(), append a link element with an href attribute that points to https://github.com/<repo>/issues
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");
    // append to warning container
    limitWarningEl.appendChild(linkEl);
};

//getRepoIssues("facebook/react"); 1.1.remove hardcoded f call
getRepoName();//1.1. place the function call at the bottom of the file 


