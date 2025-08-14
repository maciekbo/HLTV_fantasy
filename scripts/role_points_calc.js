// just logging the team name for now

function log_team_name() {
  const teamDiv = document.querySelector("div.fantasy-team-teamname-container div.text-ellipsis");
  if (teamDiv) {
    const teamName = teamDiv.innerHTML;
    console.log(teamName);
  } else {
    // If the element is not found, keep checking every 100ms
    setTimeout(log_team_name, 100);
  }
}

log_team_name();