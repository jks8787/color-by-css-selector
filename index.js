var hexColorBank = ["#FF0000", "#EE82EE", "#FF00FF", "#FF69B4", "#FFB6C1", "#FF1493"]

function changeColorByCssSelector(e) {
  e.target.closest(".selector-text-input");
  var selector = e.target.parentNode.querySelector(".selector-text-input").value;
  var color = e.target.parentNode.querySelector(".color-preview").value;
  var codeToUpdateColor = "document.querySelector('" + selector + "').style.backgroundColor='" + color + "'";
  chrome.tabs.executeScript(null,
      {code: codeToUpdateColor}
  );
}

function removeSelector(e) {
  var selector = e.target.parentNode.querySelector(".selector-text-input").value;
  var codeToUpdateColor = "document.querySelector('" + selector + "').style.backgroundColor='inherit'";
  chrome.tabs.executeScript(null,
      {code: codeToUpdateColor}
  );
  e.target.parentNode.remove();
}

function selectorElements() {
  var selectorEleWrap = document.createElement("div");
  selectorEleWrap.setAttribute("class", "selector");

  var colorInput = document.createElement("input");
  colorInput.type = "color";
  colorInput.setAttribute("class", "color-preview");
  // set a random color from the hex bank
  colorInput.value = hexColorBank[Math.floor(Math.random() * hexColorBank.length)];
  selectorEleWrap.appendChild(colorInput);

  var textInput = document.createElement("input");
  textInput.type = "text";
  textInput.setAttribute("class", "selector-text-input");
  selectorEleWrap.appendChild(textInput);

  var removerEle = document.createElement("button");
  removerEle.innerHTML = "x";
  removerEle.setAttribute("class", "remove-selector-button");
  selectorEleWrap.appendChild(removerEle);
  removerEle.addEventListener("click", removeSelector);

  var applyColorEle = document.createElement("button");
  applyColorEle.innerHTML = "apply";
  applyColorEle.setAttribute("class", "apply-color-button");
  selectorEleWrap.appendChild(applyColorEle);
  applyColorEle.addEventListener("click", changeColorByCssSelector);

  return selectorEleWrap;
}

function addSelector() {
  var selectorInputElements = selectorElements();
  document.getElementById("selector-container").insertAdjacentElement("beforeend", selectorInputElements);
}


document.addEventListener("DOMContentLoaded", function() {
  
  document.querySelector(".apply-color-button").addEventListener("click", changeColorByCssSelector);

  document.querySelector(".remove-selector-button").addEventListener("click", removeSelector);

  document.getElementById("add-selector-input").addEventListener("click", addSelector);
});
