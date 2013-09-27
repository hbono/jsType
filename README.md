jsType - a text-rendering engine written in JavaScript
======================================================

What is jsType?
---------------

JsType is a software text-rendering engine written in JavaScript that is designed to be run on browsers and NodeJS. JsType basically consists of two parts: a font-rendering engine (like FreeType) and a text-processing engine needed for rendering internationalized text (like Pango). It processes internationalized text, renders its characters, and generates a Data URI or a SVG path so web applications can use its output without conversions.
Note that jsType is designed for implementing minimal features needed for rendering internationalized text with TrueType fonts and it does not implement lots of features needed for supporting all TrueType fonts, e.g. jsType does not have the TrueType bytecode interpreter or PostScript interpreter.
For those who like to evaluate jsType with your browser, we provide [a test page](http://hbono.github.com/jsType/jstype-test.html) that renders text with a TrueType font and creates a PNG image.

Features
--------

The following is a non-exhaustive list of features provided by jsType.

* JsType provides a very simple API, which consists of one object 'org.jstype.FontReader' and three member functions 'getBitmap', 'getOutline', and 'setOptions'.
* JsType is capable of parsing TrueType fonts and rasterizing their outlines.
* JsType is capable of producing a Data URI representing a monochrome PNG image and an anti-aliased one (using 16 colors) from given text.
* JsType is capable of producing a Data URI representing a monochrome BMP image and an anti-aliased one (using 16 colors) from given text.
* JsType is capable of producing a list of SVG paths representing the outline of a character.
* JsType is capable of retrieving the presentation forms of Arabic characters and rendering them.
* JsType is capable of retrieving the presentation forms of Japanese characters used in vertical writing.

The following is a non-exhaustive list of features not provided by jsType.

* JsType is not capable of rendering TrueType fonts that do not have TrueType outlines.
* JsType is not capable of rendering TrueType fonts that do not have code-mapping tables from Unicode characters to font glyphs.
