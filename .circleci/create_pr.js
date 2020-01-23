const Octokit = require("@octokit/rest");

async function createPullRequest( arguments ) {
    const owner = process.env.GITHUB_OAUTH_TOKEN_OWNER;
    const token = process.env.GITHUB_OAUTH_TOKEN;
    const head = process.env.CIRCLE_BRANCH;
    const title = "Published PR";
    const body = "Published new packages";

    const octokit = new Octokit({
        auth: token,
        baseUrl: 'https://api.github.com'
    });

    const listOfExistingPullRequests = await octokit.pulls.list( {
        "owner" : owner,
        "repo": "circle_npm_integration",
        "head" : owner.concat(":").concat(head),
        "base": "master"
    }).catch(err => {
        console.log("Error getting  pull requests for this branch ", head);
        process.exit(1);
    });

    if ( listOfExistingPullRequests && Array.isArray(listOfExistingPullRequests.data) && listOfExistingPullRequests.data.length > 0) {
        console.log("New pull request not needed, proceed to complete the build.");
        return true;
    }

    return octokit.pulls.create({
        "owner" : owner,
        "repo": "circle_npm_integration",
        "title": title,
        "head" : head,
        "base": "master",
        "body": body
    });
}

createPullRequest().then(s => {
    console.log("build-test-and-deploy: Pull request task completed.", s);
}).catch(err => {
    console.log("Error creating pull request", err);
    process.exit(1);
});
