function displayRepositories(event, data){
  let repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="https://github.com/' + r.owner.login + '/' + r.name + '"> View </a> <a href="#" data-repo="' + r.name +'" data-user="' + r.owner.login + '" onclick="javascript:getCommits(this)"> Commits </a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML += repoList
}

function getRepositories() {
  const username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.committer.name + ' - '+ commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML += commitsList
}

function getCommits(el) {
  const name = el.dataset.repo
  const user = el.dataset.user
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${user}/${name}/commits`)
  console.log(el)
  req.send()
}
