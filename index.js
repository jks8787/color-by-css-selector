var hexColorBank = ["#FF0000", "#EE82EE", "#FF00FF", "#FF69B4", "#FFB6C1", "#FF1493"]

function changeColorByCssSelector(e) {
    // TODO: find the closest selector value - rather than by Id
  var selector = document.getElementById("selector-text-input").value;
  // TODO: find the closest color - rather than by Id
  var color = document.getElementById("color-preview").value;
  var codeToUpdateColor = "document.querySelector('" + selector + "').style.backgroundColor='" + color + "'";
  chrome.tabs.executeScript(null,
      {code: codeToUpdateColor}
  );
}

function removeSelector(e) {
  var selector = document.getElementById("selector-text-input").value;
  var codeToUpdateColor = "document.querySelector('" + selector + "').style.backgroundColor='inherit'";
  chrome.tabs.executeScript(null,
      {code: codeToUpdateColor}
  );
  e.target.parentNode.remove();
}

document.addEventListener("DOMContentLoaded", function() {

  document.getElementById("apply-color-button").addEventListener("click", changeColorByCssSelector);

  document.getElementById("remove-selector-button").addEventListener("click", removeSelector);
});
