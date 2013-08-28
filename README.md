jsType - an OpenType font renderer written in JavaScript

1. Background

This project is a JavaScript library that renders text with OpenType fonts on all major browsers and NodeJS without any external libraries, such as FreeType, etc. To render text without any external libraries, this library implements all components needed for rendering OpenType fonts in JavaScript, e.g. a font parser that interprets OpenType tables; a rasterizer that renders font glyphs to a bitmap, and; a serializer that creates a Data URI from the rasterized bitmap.

2. Usage

This library includes a sample web application 'jstype.html' and 'jstype-test.js' so we can renderk text with OpenType fonts installed in a local PC. To use this sample application, follow the steps listed below.

(1) Download all JavaScript files and HTML files in this project.
(2) Open the sample HTML file 'jstype.html' with your favorite browser.
(3) Click a "Browser" button in the test page and open an OpenType font file.
(4) Type a word in the "Word" input box and press the "OK" button.
