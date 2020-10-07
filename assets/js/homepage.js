// var getUserRepos = function () {
//     console.log("function was called");
// };
// // getUserRepos(); update to=>
// // var getUserRepos = function () {
// //     fetch("https://api.github.com/users/octocat/repos");
// // };
// //update to=>
// var response = fetch("https://api.github.com/users/octocat/repos");
// console.log(response);
// fetch("https://api.github.com/users/octocat/repos").then(function (response) {
//     console.log("inside", response);
// });
// console.log("outside");
// 2. two new variables to store a reference to the <form> element with an id of user-form and to the <input> element with an id of username
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
//8. create 2 var to  start displaying the GitHub API response data on the page

var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

// 3. to be executed upon a form submission browser event
var formSubmitHandler = function (event) {
    event.preventDefault();//stops the browser from performing the default action the event wants it to do. In the case of submitting a form, it prevents the browser from sending the form's input data to a URL
    console.log(event);
    // 5. get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
};

var getUserRepos = function (user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url

    // fetch(apiUrl).then(function (response) {
    //     // response.json().then(function (data) {
    //     response.json().then(function (data) {
    //         displayRepos(data, user);
    //         console.log(data);
    //     });
    // });14.  =>update to
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })//.16 feature built into the Fetch API can help us with connectivity issues
        .catch(function (error) {
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to GitHub");
        });
};
//6. 
var displayRepos = function (repos, searchTerm) {
    //15. check if api returned any repos=>check for an empty array and let the user know if there's nothing to display
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    // console.log(repos);
    // console.log(searchTerm);
    // 10. clear old content
    // repoContainerEl.textContent = "";
    // repoSearchTerm.textContent = searchTerm;

    // 11. loop over repos
    for (var i = 0; i < repos.length; i++) {//In the for loop, we're taking each repository (repos[i]) and writing some of its data to the page
        // format repo name=  First we format the appearance of the name and repository name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        // // create a container for each repo=Next we create and style a <div> element.
        // var repoEl = document.createElement("div");
        // repoEl.classList = "list-item flex-row justify-space-between align-center"; //6.4 replace div to a
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        // repoEl.setAttribute("href", "./single-repo.html");
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // create a span element to hold repository name= Then we create a <span> to hold the formatted repository name. 
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        //add that to the <div> and add the entire <div> to the container we created earlier:
        // append to container
        repoEl.appendChild(titleEl);
        //add 13. Now if we try to search for a user, we'll get back not only the list of repositories but also the number of issues for each one
        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);
        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};

// 1.
fetch("https://api.github.com/users/octocat/repos").then(function (response) {
    response.json().then(function (data) {
        console.log(data);
    });
});

//4. 
userFormEl.addEventListener("submit", formSubmitHandler);
