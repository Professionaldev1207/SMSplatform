/*global chrome */

// eslint-disable-next-line no-undef

chrome.runtime.onMessage.addListener((request) => {
    alert(request);
    if(request.type === 'popup-modal'){
        alert(request.type);
        showModal();
    }
})

  const showModal = () => {
    const modal = document.createElement("dialog");
    modal.setAttribute("style",
      `
        height: 450px;
        border: none;
        top: 150px;
        background-color:white;
        position: fixed;
        box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
      `
    );

    modal.innerHTML = `<iframe id="popup-content" style="height: 100%"></iframe>
                        <div style="position:absolute; top:0px; left:5px;">
                          <button style="padding: 8px 12px; font-size: 16px; border: none; border-radius: 20px;">x</button>
                        </div>
                      `
      document.body.appendChild(modal);
      const dialog = document.querySelector("dialog");
      dialog.showModal();
      const iframe = document.getElementById("popup-content");
      // eslint-disable-next-line no-undef
      iframe.src = chrome.extension.getURL("index.html");
      iframe.frameBorder = 0;
      dialog.querySelector("button").addEventListener("click", () => {
        dialog.close();
      });
  }