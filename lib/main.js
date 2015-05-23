/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

var { data } = require("sdk/self");
var { ToggleButton } = require("sdk/ui");

var reddit_panel = require("sdk/panel").Panel({
  width: 600,
  height: 200,
  contentURL: "http://www.reddit.com/r/thebutton",
  contentScriptFile: [data.url("jquery-1.4.4.min.js"),
                      data.url("panel.js")],
  onHide: handleHide
});

reddit_panel.port.on("click", function(url) {
  require("sdk/tabs").open(url);
});

let button = ToggleButton({
  id: "open-reddit-btn",
  label: "The Button",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onChange: handleChange,
  disabled: false
});

exports.main = function(options, callbacks) {
  // If you run cfx with --static-args='{"quitWhenDone":true}' this program
  // will automatically quit Firefox when it's done.
  if (options.staticArgs.quitWhenDone)
    callbacks.quit();
};

function handleChange(state) {
  if (state.checked) {
    reddit_panel.contentURL = "http://www.reddit.com/r/thebutton";
    reddit_panel.show({ position: button });
  }
}

function handleHide() {
  button.state('window', { checked: false });
  reddit_panel.contentURL = data.url("panel.html");
}
