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

fetch("https://api.github.com/users/octocat/repos").then(function (response) {
    response.json().then(function (data) {
        console.log(data);
    });
});

var getUserRepos = function (user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        });
    });
};