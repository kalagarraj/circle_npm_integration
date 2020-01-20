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
        const errMessages = Array.isArray(err.errors) ? err.errors.map(s => s.message).filter(s => s === "A pull request already exists for ".concat(owner).concat(":").concat(head).concat(".")) : [];
        //do not exit the process if the only error message is something like "A pull request already exists for <<owner>>:<<head branch>>.
        if(errMessages.length !== 1) {
            //Do not print the err object as it contains github token in the response
            console.log("Error creating pull request");
            //Otherwise exit with non zero to fail the build
            process.exit(1);
        }
        console.log("Pull request already exists, Proceed to complete the build");
    });
}


createPullRequest(process.argv.slice([2]));

// createPullRequest(["kalagarraj", "0f3b2e9d58c8e6df79361a38736acbf5c0fd2b5f", "ka/pull_request", "publish to npm", "publish body"]);
