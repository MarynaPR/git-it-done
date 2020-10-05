// var getUserRepos = function () {
//     console.log("function was called");
// };

// getUserRepos(); update to=>
var getUserRepos = function () {
    fetch("https://api.github.com/users/octocat/repos");
};
