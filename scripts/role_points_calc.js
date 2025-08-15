// just logging the team name for now

// function log_team_name() {
//   const teamDiv = document.querySelector("div.fantasy-team-teamname-container div.text-ellipsis");
//   if (teamDiv) {
//     const teamName = teamDiv.innerHTML;
//     console.log(teamName);
//   } else {
//     // If the element is not found, keep checking every 100ms
//     setTimeout(log_team_name, 100);
//   }
// }

// log_team_name();

function add_expected_value(value) {
    const old_value_divs = document.querySelectorAll(".expected_value")
    old_value_divs.forEach(div => {
        div.remove();
    });
    console.log(value)
    const value_div = document.createElement("div");
    value_div.className = "booster-trigger-rate expected_value"
    value_div.innerHTML = `Expected value: ${value}`
    parent = document.querySelector(".booster-trigger-container")
    parent.appendChild(value_div)
    parent.style.height = "60px"
}

function calc_expected_value(target) {
    const temp1 = target.innerHTML;
    const big_rate = parseInt(temp1[0] + temp1[1]);
    const temp2 = target.querySelector("span").innerHTML;
    const small_rate = parseInt(temp2[0] + temp2[1]);
    const exp_val = (big_rate * 5 + small_rate * 2 + (100 - big_rate - small_rate) * (-2)) / 100
    console.log(big_rate + " / " + small_rate + " | " + exp_val);
    return exp_val;
}

function handle_role_change() {
    const targetNode = document.querySelector(".booster-trigger-rate");
    if (!targetNode) {
        return;
    }

    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' || mutation.type === 'characterData' || mutation.type === 'attributes') {
                add_expected_value(calc_expected_value(targetNode));
                observer.disconnect(); // Stop observing after the first change
                return;
            }
        }
    });

    const config = { childList: true, subtree: true, characterData: true, attributes: true };
    observer.observe(targetNode, config);
}

function enhance_role_page() {
    console.log("asdfsdfaasdf")
    const role_buttons = document.querySelectorAll(".booster-icon-container")

    if (role_buttons.length > 0) {
        role_buttons.forEach(button => {
            button.addEventListener("click", () => {
                console.log("An inner role button has been clicked");
                console.log("The inner HTML of the clicked button is: ", button.innerHTML);
                handle_role_change()
            });
        });
    } else {
        // If no elements are found, keep checking.
        setTimeout(enhance_role_page, 100);
    }
}

function addClickListenerWhenReady() {
    const booster_buttons = document.querySelectorAll(".assign-role-button");

    if (booster_buttons.length > 0) {
        booster_buttons.forEach(button => {
            button.addEventListener("click", () => {
                console.log("An outer role button has been clicked");
                console.log("The inner HTML of the clicked button is: ", button.innerHTML);
                enhance_role_page()
            });
        });
    } else {
        // If no elements are found, keep checking.
        setTimeout(addClickListenerWhenReady, 100);
    }
}

addClickListenerWhenReady();