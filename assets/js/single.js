//9. create a reference to the issues container
var issueContainerEl = document.querySelector("#issues-container");
//1. creating a getRepoIssues() function that will take in a repo name as a parameter
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
            });
        }
        else {
            alert("There was a problem with your request!");
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

getRepoIssues("facebook/react");

