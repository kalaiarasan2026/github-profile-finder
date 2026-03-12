async function getProfile(){

const username = document.getElementById("searchInput").value

const profileRes = await fetch(`https://api.github.com/users/${username}`)
const profileData = await profileRes.json()

const repoRes = await fetch(`https://api.github.com/users/${username}/repos`)
const repoData = await repoRes.json()

displayProfile(profileData)
displayRepos(repoData)

}

function displayProfile(user){

if(user.message === "Not Found"){
document.getElementById("profile").innerHTML = "<p>User not found</p>"
return
}

document.getElementById("profile").innerHTML = `
<div class="profile-card">
<img src="${user.avatar_url}">
<h2>${user.name}</h2>
<p>${user.bio || ""}</p>
<p>Followers: ${user.followers}</p>
<p>Following: ${user.following}</p>
<p>Public Repos: ${user.public_repos}</p>
</div>
`

}

function displayRepos(repos){

document.getElementById("repo-title").innerText="Repositories"

let repoHTML=""

repos.slice(0,10).forEach(repo=>{

repoHTML+=`
<div class="repo">
<a href="${repo.html_url}" target="_blank">${repo.name}</a>
<span>${repo.description || ""}</span>
⭐ ${repo.stargazers_count}
</div>
`

})

document.getElementById("repos").innerHTML=repoHTML

}