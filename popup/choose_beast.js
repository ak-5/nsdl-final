const hidePage = `body > :not(.beastify-image) {
                    display: none;
                  }`;

// const apiBaseUrl = 'https://vjpartners.co.in/ongoing/v7_new_clone_2/vj-sales-dashboard-live/public/api/'

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {

  document.addEventListener("click", (e) => {
    /**
     * Given the name of a beast, get the URL to the corresponding image.
     */
    function beastNameToURL(beastName) {
      switch (beastName) {
        case "Frog":
          return browser.extension.getURL("beasts/frog.jpg");
        case "Snake":
          return browser.extension.getURL("beasts/snake.jpg");
        case "Turtle":
          return browser.extension.getURL("beasts/turtle.jpg");
      }
    }

    /**
     * Insert the page-hiding CSS into the active tab,
     * then get the beast URL and
     * send a "beastify" message to the content script in the active tab.
     */
    function beastify(tabs) {
      // browser.tabs.insertCSS({code: hidePage}).then(() => {
        let url = beastNameToURL(e.target.textContent);
        // let nid = {firstName:"John", lastName:"Doe", age:46};
        let nid = e.target.getAttribute('data-form_1');
        browser.tabs.sendMessage(tabs[0].id, {
          command: "beastify",
          beastURL: url,
          para:"aa",
          nid: nid
        });
      // });
    }

    function clickedMe(tabs) {
      
      let buyerPan = e.target.getAttribute('data-filled');
      // alert(nid);
      if(confirm('Are you sure to mark this as complete?')){

        document.querySelector('input[name=buyerPan]').value = buyerPan; 
        document.querySelector('#mainTable').style.display= 'none'; 
        document.querySelector('#myForm').style.display='block'

      }
      
    }

    function markCompleteSubmit(tabs) {
      
      let myFrm = e.target.closest('#myForm');
      let field1 = myFrm.querySelector('input[name=acknoledge1]')
      let field2 = myFrm.querySelector('input[name=acknoledge2]')
      // let buyer_pan = e.target.getAttribute('data-filled').substr(1).slice(0, -1);
      let buyer_pan = myFrm.querySelector('input[name=buyerPan]').value.substr(1).slice(0, -1);
      
      const params = { buyer_pan, ack_no: field1.value, field_2: field2.value };
      // alert(field2.value);return 0;
      fetch(`${apiBaseUrl}nsdl_dt/markDone`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(params)
      })
      .then(response => response.json())
      .then(data => {
        if(data.success==1) {
          alert("Data Submitted Successfully")
          window.close()
        }
      });
      
      // setTimeout(e.target.parentNode.parentElement.remove(), 2000);
      
    }

    /**
     * Remove the page-hiding CSS from the active tab,
     * send a "reset" message to the content script in the active tab.
     */
    function reset(tabs) {
      browser.tabs.removeCSS({code: hidePage}).then(() => {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "reset",
        });
      });
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not beastify: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "beastify()" or "reset()" as appropriate.
     */
    if (e.target.classList.contains("click-me")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(beastify)
        .catch(reportError);
    }
    else if (e.target.classList.contains("clicked-me")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(clickedMe)
        .catch(reportError);
    }
    else if (e.target.classList.contains("markCompleteSubmit")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(markCompleteSubmit)
        .catch(reportError);
    }
    else if (e.target.classList.contains("reset")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(reset)
        .catch(reportError);
    }
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */

browser.tabs.executeScript({file: "/content_scripts/beastify.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);