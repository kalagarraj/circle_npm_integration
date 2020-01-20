const Octokit = require("@octokit/rest");

async function createPullRequest( arguments, ) {
    if (!Array.isArray(arguments) || arguments.length < 5) {
        throw "Usage: create_pr.js <<token>> <<head branch name>> <<pull request title>> <<pull request information body>>";
    }
    const owner = arguments[0];
    const token = arguments[1];
    const head = arguments[2];
    const title = arguments[3];
    const body = arguments[4];

    const octokit = new Octokit({
        auth: token,
        baseUrl: 'https://api.github.com'
    });
    await octokit.pulls.create({
        "owner" : owner,
        "repo": "circle_npm_integration",
        "title": title,
        "head" : head,
        "base": "master",
        "body": body
    }).then(s => {
        console.log("Pull request created successfully ", s);
    }).catch(err => {
        console.log("Pull request creeation failed ", err);
    });
}

createPullRequest(process.argv.slice([2]));