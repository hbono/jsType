// The namespace used by this application.
var test = {};

/**
 * @enum {number}
 */
test.Output = {
  WIDTH: 512,
  HEIGHT: 512
};

/**
 * @type {org.jstype.FontRender}
 * @private
 */
test.reader_ = null;

/**
 * Checks whether a word retrieved from an <input> element is a correct one and
 * writes its result.
 * @private
 */
test.drawText_ = function () {
  var word = document.getElementById('word');
  if (!word || word.value.length == 0) {
    return;
  }
  var colors = [0xffffff, 0x000000];
  var color = document.getElementById('color');
  if (color) {
    var COLORS = {
      'black': 0x000000,
      'blue': 0xff0000,
      'red': 0x0000ff,
      'magenta': 0xff00ff,
      'green': 0x00ff00,
      'cyan': 0xffff00,
      'yellow': 0x00ffff
    };
    colors[1] = COLORS[color.value];
  }
  var fontSize = 64;
  var size = document.getElementById('size');
  if (size) {
    fontSize = size.value | 0;
  }
  var writing = document.getElementById('writing');
  var isVertical = writing && writing.value == 'vertical';
  test.reader_.setOptions(isVertical);

  var width = test.Output.WIDTH;
  var height = test.Output.HEIGHT;
  var img = document.getElementById('output');
  if (!img) {
    img = document.createElement('img');
    img.id = 'output';
    var result = document.getElementById('result');
    result.appendChild(img);
  }
  img.src = test.reader_.getBitmap(word.value, fontSize, width, height, colors);
};

/**
 * Called when a browser finishes loading a BDICT file.
 * @param {Event} event
 * @private
 */
test.handleLoad_ = function(event) {
  var data = new Uint8Array(event.target.result);
  test.reader_ = new org.jstype.FontReader(data, data.length, 2048);
  test.drawText_();
};

/**
 * Called when a user clicks the "OK" button in the test page.
 * @param {Event} event
 * @private
 */
test.handleClick_ = function(event) {
  if (!test.reader_) {
    var file = document.getElementById('font');
    if (file.files && file.files.length > 0) {
      var reader = new FileReader();
      reader.addEventListener('load', test.handleLoad_, false);
      reader.readAsArrayBuffer(file.files[0]);
    }
    return;
  }
  test.drawText_();
};

/**
 * Called when a user clicks the "OK" button in the test page.
 * @param {Event} event
 * @private
 */
test.handleChange_ = function (event) {
  var file = event.target;
  var disabled = !file.files || file.files.length == 0;
  test.reader_ = null;
  var ids = ['size', 'color', 'direction', 'writing', 'word', 'submit'];
  for (var i = 0; i < ids.length; ++i) {
    var item = document.getElementById(ids[i]);
    if (item) {
      item.disabled = disabled;
    }
  }
};

/**
 * Adds a file-input box to the specified element.
 * @param {Element} parent
 * @private
 */
test.addFontInput_ = function(parent) {
  var group = document.createElement('div');
  parent.appendChild(group);

  var label = document.createElement('label');
  label.setAttribute('for', 'font');
  label.innerText = 'Font: ';
  group.appendChild(label);

  var font = document.createElement('input');
  font.type = 'file';
  font.id = 'font';
  font.addEventListener('change', test.handleChange_, false);
  group.appendChild(font);
};

/**
 * Adds a size input to the specified element.
 * @param {Element} parent
 * @private
 */
test.addSizeInput_ = function(parent) {
  var group = document.createElement('div');
  parent.appendChild(group);

  var label = document.createElement('label');
  label.setAttribute('for', 'size');
  label.innerText = 'Size: ';
  group.appendChild(label);

  var size = document.createElement('input');
  size.type = 'range';
  size.id = 'size';
  size.setAttribute('min', '10');
  size.setAttribute('max', '128');
  size.setAttribute('value', '64');
  size.setAttribute('step', '1');
  size.disabled = true;
  group.appendChild(size);
};

/**
 * Adds a color selector to the specified element.
 * @param {Element} parent
 * @private
 */
test.addColorInput_ = function(parent) {
  var group = document.createElement('div');
  parent.appendChild(group);

  var label = document.createElement('label');
  label.setAttribute('for', 'color');
  label.innerText = 'Color: ';
  group.appendChild(label);

  var color = document.createElement('select');
  color.id = 'color';
  color.disabled = true;
  var options = ['black', 'blue', 'red', 'magenta', 'green', 'cyan', 'yellow'];
  for (var i = 0; i < options.length; ++i) {
    var option = document.createElement('option');
    option.value = options[i];
    option.innerText = options[i];
    option.style.color = options[i];
    color.appendChild(option);
  }
  group.appendChild(color);
};

/**
 * Adds a writing-mode selector to the specified element.
 * @param {Element} parent
 * @private
 */
test.addWritingModeInput_ = function(parent) {
  var group = document.createElement('div');
  parent.appendChild(group);

  var label = document.createElement('label');
  label.setAttribute('for', 'layout');
  label.innerText = 'Writing Mode: ';
  group.appendChild(label);

  var select = document.createElement('select');
  select.id = 'writing';
  select.disabled = true;
  var options = ['horizontal', 'vertical'];
  for (var i = 0; i < options.length; ++i) {
    var option = document.createElement('option');
    option.value = options[i];
    option.innerText = options[i];
    select.appendChild(option);
  }
  group.appendChild(select);
};

/**
 * Adds a word-input box to the specified element.
 * @param {Element} parent
 * @private
 */
test.addWordInput_ = function(parent) {
  var group = document.createElement('div');
  parent.appendChild(group);

  var label = document.createElement('label');
  label.setAttribute('for', 'word');
  label.innerText = 'Text: ';
  group.appendChild(label);

  var word = document.createElement('input');
  word.type = 'text';
  word.id = 'word';
  // word.value = '\u00e9';
  word.value = '\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645.';
  //word.value = '\u3066\u3059\u3068\u3002';
  word.disabled = true;
  group.appendChild(word);

  var button = document.createElement('input');
  button.type = 'button';
  button.id = 'submit';
  button.value = 'Draw';
  button.disabled = true;
  button.addEventListener('click', test.handleClick_, false);
  group.appendChild(button);

  var result = document.createElement('div');
  result.id = 'result';
  result.style.width = test.Output.WIDTH + 'px';
  result.style.height = test.Output.HEIGHT + 'px';
  result.style.border = '1px solid black';
  group.appendChild(result);
};

/**
 * Starts this test application.
 */
test.main = function() {
  document.title = 'TrueType Test';
  test.addFontInput_(document.body);
  test.addSizeInput_(document.body);
  test.addColorInput_(document.body);
  test.addWritingModeInput_(document.body);
  test.addWordInput_(document.body);
};

window.onload = test.main;
