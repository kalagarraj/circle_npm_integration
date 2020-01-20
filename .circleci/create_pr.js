const Octokit = require("@octokit/rest");

function createPullRequest(teset, head, title, body) {
    console.log("creating pr for head ", head, " title ", title, " with body ", body);
    console.log("teset ", teset);

    const octokit = new Octokit({
        auth: teset,
        baseUrl: 'https://api.github.com'
    });
    return octokit.pulls.create({
        "owner" : "kalagarraj",
        "repo": "circle_npm_integration",
        "title": title,
        "head" : head,
        "base": "master"
    }).then(s => {
        console.log("Pull request created successfully ", s);
    }).catch(err => {
        console.log("Pull request creeation failed ", err);
    });
}

createPullRequest("faa0ff321b6ecc3779090825617aa74c7321df56","release/changes_2", "Publish using octokit").then(s => {
    console.log("inside then", s);
}).catch(err => {
    console.log("inside err", err);
});
