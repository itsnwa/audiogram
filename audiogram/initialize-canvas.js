var fs = require("fs"),
    path = require("path"),
    Canvas = require("canvas"),
    getRenderer = require("../renderer/");

function initializeCanvas(theme, cb) {

  // Fonts pre-registered in bin/worker
  var renderer = getRenderer(theme);

  if (!(theme.backgroundImage || theme.customBackgroundImage)) {
    return cb(null, renderer);
  }

  backgroundImagePath = theme.customBackgroundImage
    ? theme.customBackgroundImage
    : path.join(__dirname, "..", "settings", "backgrounds", theme.backgroundImage);

  // Load background image from file (done separately so renderer code can work in browser too)
  fs.readFile(backgroundImagePath, function(err, raw) {

    if (err) {
      return cb(err);
    }

    var bg = new Canvas.Image;
    bg.src = raw;
    renderer.backgroundImage(bg);

    return cb(null, renderer);

  });

}

module.exports = initializeCanvas;
