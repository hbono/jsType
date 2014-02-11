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
test.drawText_ = function() {
  var word = document.getElementById('word');
  if (!word || word.value.length == 0) {
    return;
  }
  /** @const {Array.<number>} */ var colors16 = [
    0xffffff, 0xeeeeee, 0xdddddd, 0xcccccc,
    0xbbbbbb, 0xaaaaaa, 0x999999, 0x888888,
    0x777777, 0x666666, 0x555555, 0x444444,
    0x333333, 0x222222, 0x111111, 0x000000
  ];
  /** @const {Array.<number>} */ var colors2 = [0xffffff, 0x000000];
  var colors = colors16;
  var color = document.getElementById('color');
  if (color) {
    /** @const {Object.<string,number>} */ var COLORS = {
      'black': 0x000000,
      'blue': 0xff0000,
      'red': 0x0000ff,
      'magenta': 0xff00ff,
      'green': 0x00ff00,
      'cyan': 0xffff00,
      'yellow': 0x00ffff
    };
    for (var i = 0; i < colors.length; ++i) {
      colors[i] |= COLORS[color.value];
    }
  }
  var fontSize = 64;
  var size = document.getElementById('size');
  if (size) {
    fontSize = size.value | 0;
  }
  var options = {};
  var writing = document.getElementById('writing');
  options['vertical'] = writing && writing.value == 'vertical';
  test.reader_.setOptions(options);

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
 * Called when a user chooses a file in the "Font" input.
 * @param {Event} event
 * @private
 */
test.handleChange_ = function(event) {
  var file = event.target;
  var disabled = !file.files || file.files.length == 0;
  test.reader_ = null;
  var ids =
      ['size', 'color', 'direction', 'writing', 'sample', 'word', 'submit'];
  for (var i = 0; i < ids.length; ++i) {
    var item = document.getElementById(ids[i]);
    if (item) {
      item.disabled = disabled;
    }
  }
  var step = disabled ? 0 : 1;
  var steps = ['step1', 'step2'];
  for (var i = 0; i < steps.length; ++i) {
    var item = document.getElementById(steps[i]);
    if (i == step) {
      item.style.color = 'red';
    } else {
      item.style.color = 'gray';
    }
  }
};

/**
 * Called when a user chooses a sample text.
 * @param {Event} event
 * @private
 */
test.handleChangeSample_ = function (event) {
  var sample = event.target;
  var word = document.getElementById('word');
  if (sample.value) {
    word.value = sample.value;
    word.disabled = true;
  } else {
    word.value = '';
    word.disabled = false;
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

  var description = document.createElement('div');
  description.textContent = '1. Choose a TrueType font.'
  description.id = 'step1';
  description.style.color = 'red';
  group.appendChild(description);

  var label = document.createElement('label');
  label.setAttribute('for', 'font');
  label.textContent = 'Font: ';
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

  var description = document.createElement('div');
  description.textContent =
      '2. Select the font style (size, color, and writing mode), ' +
      'type text (or choose a sample), and click the "Draw" button.';
  description.id = 'step2';
  description.style.color = 'gray';
  group.appendChild(description);

  var label = document.createElement('label');
  label.setAttribute('for', 'size');
  label.textContent = 'Size: ';
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
  label.textContent = 'Color: ';
  group.appendChild(label);

  var color = document.createElement('select');
  color.id = 'color';
  color.disabled = true;
  var options = ['black', 'blue', 'red', 'magenta', 'green', 'cyan', 'yellow'];
  for (var i = 0; i < options.length; ++i) {
    var option = document.createElement('option');
    option.value = options[i];
    option.textContent = options[i];
    option.style.color = options[i];
    option.style.backgroundColor = options[i];
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
  label.textContent = 'Writing Mode: ';
  group.appendChild(label);

  var select = document.createElement('select');
  select.id = 'writing';
  select.disabled = true;
  var options = ['horizontal', 'vertical'];
  for (var i = 0; i < options.length; ++i) {
    var option = document.createElement('option');
    option.value = options[i];
    option.textContent = options[i];
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
  label.textContent = 'Text: ';
  group.appendChild(label);

  var sample = document.createElement('select');
  sample.id = 'sample';
  var options = [
    '',
    'abc',
    '\u00e9',
    '\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645.',
    '\u3066\u3059\u3068\u3002'
  ];
  for (var i = 0; i < options.length; ++i) {
    var option = document.createElement('option');
    option.value = options[i];
    option.textContent = options[i];
    sample.appendChild(option);
  }
  sample.addEventListener('change', test.handleChangeSample_, false);
  sample.disabled = true;
  group.appendChild(sample);

  var word = document.createElement('input');
  word.type = 'text';
  word.id = 'word';
  //word.value = '\u00e9';
  //word.value = '\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645.';
  //word.value = '\u3066\u3059\u3068\u3002';
  //word.value = 'abc';
  word.value = '';
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
