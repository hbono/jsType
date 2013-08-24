// The namespace used by this application.
var test = {};

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
  if (!word) {
    return;
  }
  var size = 64;
  var width = 256;
  var height = 64;
  var img = document.getElementById('output');
  if (!img) {
    img = document.createElement('img');
    img.id = 'output';
    var result = document.getElementById('result');
    result.appendChild(img);
  }
  img.src = test.reader_.getBitmap(word.value, size, width, height, [0xffffff, 0x0000ff]);
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
test.handleChange_ = function(event) {
  var file = event.target;
  if (file.files && file.files.length > 0) {
    test.reader_ = null;
    var word = document.getElementById('word');
    word.disabled = false;
    var button = document.getElementById('submit');
    button.disabled = false;
  }
};

/**
 * Adds a file-input box to the specified element.
 * @param {Element} parent
 * @private
 */
test.addFileInput_ = function(parent) {
  var group = document.createElement('div');
  group.innerText = 'Font file: ';
  parent.appendChild(group);

  var font = document.createElement('input');
  font.type = 'file';
  font.id = 'font';
  font.addEventListener('change', test.handleChange_, false);
  group.appendChild(font);
};

/**
 * Adds a word-input box to the specified element.
 * @param {Element} parent
 * @private
 */
test.addWordInput_ = function(parent) {
  var group = document.createElement('div');
  group.innerText = 'Word: ';
  parent.appendChild(group);

  var word = document.createElement('input');
  word.type = 'text';
  word.id = 'word';
  word.value = '\u00e9';
  word.disabled = true;
  group.appendChild(word);

  var button = document.createElement('input');
  button.type = 'button';
  button.id = 'submit';
  button.value = 'OK';
  button.disabled = true;
  button.addEventListener('click', test.handleClick_, false);
  group.appendChild(button);

  var result = document.createElement('div');
  result.id = 'result';
  group.appendChild(result);
};

/**
 * Starts this test application.
 */
test.main = function () {
  document.title = 'TrueType Test';
  test.addFileInput_(document.body);
  test.addWordInput_(document.body);
};

window.onload = test.main;
