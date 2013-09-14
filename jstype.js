// Copyright 2013 Hironori Bono. All Rights Reserved.

// Create a namespace 'org.jstype' used in this file.
var org = org || {};
org.jstype = org.jstype || {};

/**
 * Whether this file is compiled by the closure compiler.
 * @define {boolean}
 */
org.jstype.COMPILED = false;

/**
 * Whether to enable the debugging features of this library.
 * @define {boolean}
 */
org.jstype.DEBUG = false;

/**
 * Whether to fill the inside of a glyph. This feature is provided only for
 * debugging our rasterizer.
 * @define {boolean}
 */
org.jstype.FILL_GLYPH = true;

/**
 * A reference to the global context. The type of this object depends on the
 * context where this system is executed. For example, when this system runs on
 * a Web Worker, this type becomes 'WorkerContext'. On the other hand, when this
 * system runs on an iframe, this type becomes 'Window'.
 * @type {Object}
 * @const
 */
org.jstype.global = this;

/**
 * Character codes representing the contextual forms of Arabic scripts. An
 * Arabic character has up to four contextual forms (initial, medial, final, and
 * isolated) and Unicode assigns one code for each form. This table provides a
 * mapping from Arabic scripts (U+0600...U+06FF) to their contextual forms.
 * @enum {Array.<number>}
 * @const
 */
org.jstype.ArabicForms = {
  INIT: [
    0x0600, 0x0601, 0x0602, 0x0603, 0x0604, 0x0605, 0x0606, 0x0607,
    0x0608, 0x0609, 0x060a, 0x060b, 0x060c, 0x060d, 0x060e, 0x060f,
    0x0610, 0x0611, 0x0612, 0x0613, 0x0614, 0x0615, 0x0616, 0x0617,
    0x0618, 0x0619, 0x061a, 0x061b, 0x061c, 0x061d, 0x061e, 0x061f,
    0x0620, 0x0621, 0x0622, 0x0623, 0x0624, 0x0625, 0xfe8b, 0x0627,
    0xfe91, 0x0629, 0xfe97, 0xfe9b, 0xfe9f, 0xfea3, 0xfea7, 0x062f,
    0x0630, 0x0631, 0x0632, 0xfeb3, 0xfeb7, 0xfebb, 0xfebf, 0xfec3,
    0xfec7, 0xfecb, 0xfecf, 0x063b, 0x063c, 0x063d, 0x063e, 0x063f,
    0x0640, 0xfed3, 0xfed7, 0xfedb, 0xfedf, 0xfee3, 0xfee7, 0xfeeb,
    0x0648, 0x0649, 0xfef3, 0x064b, 0x064c, 0x064d, 0x064e, 0x064f,
    0x0650, 0x0651, 0x0652, 0x0653, 0x0654, 0x0655, 0x0656, 0x0657,
    0x0658, 0x0659, 0x065a, 0x065b, 0x065c, 0x065d, 0x065e, 0x065f,
    0x0660, 0x0661, 0x0662, 0x0663, 0x0664, 0x0665, 0x0666, 0x0667,
    0x0668, 0x0669, 0x066a, 0x066b, 0x066c, 0x066d, 0x066e, 0x066f,
    0x0670, 0x0671, 0x0672, 0x0673, 0x0674, 0x0675, 0x0676, 0x0677,
    0x0678, 0xfb68, 0xfb60, 0xfb54, 0x067c, 0x067d, 0xfb58, 0xfb64,
    0xfb5c, 0x0681, 0x0682, 0xfb78, 0xfb74, 0x0685, 0xfb7c, 0xfb80,
    0x0688, 0x0689, 0x068a, 0x068b, 0x068c, 0x068d, 0x068e, 0x068f,
    0x0690, 0x0691, 0x0692, 0x0693, 0x0694, 0x0695, 0x0696, 0x0697,
    0x0698, 0x0699, 0x069a, 0x069b, 0x069c, 0x069d, 0x069e, 0x069f,
    0x06a0, 0x06a1, 0x06a2, 0x06a3, 0xfb6c, 0x06a5, 0xfb70, 0x06a7,
    0x06a8, 0xfb90, 0x06aa, 0x06ab, 0x06ac, 0xfbd5, 0x06ae, 0xfb94,
    0x06b0, 0xfb9c, 0x06b2, 0xfb98, 0x06b4, 0x06b5, 0x06b6, 0x06b7,
    0x06b8, 0x06b9, 0x06ba, 0xfba2, 0x06bc, 0x06bd, 0xfbac, 0x06bf,
    0x06c0, 0xfba8, 0x06c2, 0x06c3, 0x06c4, 0x06c5, 0x06c6, 0x06c7,
    0x06c8, 0x06c9, 0x06ca, 0x06cb, 0xfbfe, 0x06cd, 0x06ce, 0x06cf,
    0xfbe6, 0x06d1, 0x06d2, 0x06d3, 0x06d4, 0x06d5, 0x06d6, 0x06d7,
    0x06d8, 0x06d9, 0x06da, 0x06db, 0x06dc, 0x06dd, 0x06de, 0x06df,
    0x06e0, 0x06e1, 0x06e2, 0x06e3, 0x06e4, 0x06e5, 0x06e6, 0x06e7,
    0x06e8, 0x06e9, 0x06ea, 0x06eb, 0x06ec, 0x06ed, 0x06ee, 0x06ef,
    0x06f0, 0x06f1, 0x06f2, 0x06f3, 0x06f4, 0x06f5, 0x06f6, 0x06f7,
    0x06f8, 0x06f9, 0x06fa, 0x06fb, 0x06fc, 0x06fd, 0x06fe, 0x06ff
  ],
  MEDI: [
    0x0600, 0x0601, 0x0602, 0x0603, 0x0604, 0x0605, 0x0606, 0x0607,
    0x0608, 0x0609, 0x060a, 0x060b, 0x060c, 0x060d, 0x060e, 0x060f,
    0x0610, 0x0611, 0x0612, 0x0613, 0x0614, 0x0615, 0x0616, 0x0617,
    0x0618, 0x0619, 0x061a, 0x061b, 0x061c, 0x061d, 0x061e, 0x061f,
    0x0620, 0x0621, 0x0622, 0x0623, 0x0624, 0x0625, 0xfe8c, 0x0627,
    0xfe92, 0x0629, 0xfe98, 0xfe9c, 0xfea0, 0xfea4, 0xfea8, 0x062f,
    0x0630, 0x0631, 0x0632, 0xfeb4, 0xfeb8, 0xfebc, 0xfec0, 0xfec4,
    0xfec8, 0xfecc, 0xfed0, 0x063b, 0x063c, 0x063d, 0x063e, 0x063f,
    0x0640, 0xfed4, 0xfed8, 0xfedc, 0xfee0, 0xfee4, 0xfee8, 0xfeec,
    0x0648, 0x0649, 0xfef4, 0x064b, 0x064c, 0x064d, 0x064e, 0x064f,
    0x0650, 0x0651, 0x0652, 0x0653, 0x0654, 0x0655, 0x0656, 0x0657,
    0x0658, 0x0659, 0x065a, 0x065b, 0x065c, 0x065d, 0x065e, 0x065f,
    0x0660, 0x0661, 0x0662, 0x0663, 0x0664, 0x0665, 0x0666, 0x0667,
    0x0668, 0x0669, 0x066a, 0x066b, 0x066c, 0x066d, 0x066e, 0x066f,
    0x0670, 0x0671, 0x0672, 0x0673, 0x0674, 0x0675, 0x0676, 0x0677,
    0x0678, 0xfb69, 0xfb61, 0xfb55, 0x067c, 0x067d, 0xfb59, 0xfb65,
    0xfb5d, 0x0681, 0x0682, 0xfb79, 0xfb75, 0x0685, 0xfb7d, 0xfb81,
    0x0688, 0x0689, 0x068a, 0x068b, 0x068c, 0x068d, 0x068e, 0x068f,
    0x0690, 0x0691, 0x0692, 0x0693, 0x0694, 0x0695, 0x0696, 0x0697,
    0x0698, 0x0699, 0x069a, 0x069b, 0x069c, 0x069d, 0x069e, 0x069f,
    0x06a0, 0x06a1, 0x06a2, 0x06a3, 0xfb6d, 0x06a5, 0xfb71, 0x06a7,
    0x06a8, 0xfb91, 0x06aa, 0x06ab, 0x06ac, 0xfbd6, 0x06ae, 0xfb95,
    0x06b0, 0xfb9d, 0x06b2, 0xfb99, 0x06b4, 0x06b5, 0x06b6, 0x06b7,
    0x06b8, 0x06b9, 0x06ba, 0xfba3, 0x06bc, 0x06bd, 0xfbad, 0x06bf,
    0x06c0, 0xfba9, 0x06c2, 0x06c3, 0x06c4, 0x06c5, 0x06c6, 0x06c7,
    0x06c8, 0x06c9, 0x06ca, 0x06cb, 0xfbff, 0x06cd, 0x06ce, 0x06cf,
    0xfbe7, 0x06d1, 0x06d2, 0x06d3, 0x06d4, 0x06d5, 0x06d6, 0x06d7,
    0x06d8, 0x06d9, 0x06da, 0x06db, 0x06dc, 0x06dd, 0x06de, 0x06df,
    0x06e0, 0x06e1, 0x06e2, 0x06e3, 0x06e4, 0x06e5, 0x06e6, 0x06e7,
    0x06e8, 0x06e9, 0x06ea, 0x06eb, 0x06ec, 0x06ed, 0x06ee, 0x06ef,
    0x06f0, 0x06f1, 0x06f2, 0x06f3, 0x06f4, 0x06f5, 0x06f6, 0x06f7,
    0x06f8, 0x06f9, 0x06fa, 0x06fb, 0x06fc, 0x06fd, 0x06fe, 0x06ff
  ],
  FINA: [
    0x0600, 0x0601, 0x0602, 0x0603, 0x0604, 0x0605, 0x0606, 0x0607,
    0x0608, 0x0609, 0x060a, 0x060b, 0x060c, 0x060d, 0x060e, 0x060f,
    0x0610, 0x0611, 0x0612, 0x0613, 0x0614, 0x0615, 0x0616, 0x0617,
    0x0618, 0x0619, 0x061a, 0x061b, 0x061c, 0x061d, 0x061e, 0x061f,
    0x0620, 0x0621, 0xfe82, 0xfe84, 0xfe86, 0xfe88, 0xfe8a, 0xfe8e,
    0xfe90, 0xfe94, 0xfe96, 0xfe9a, 0xfe9e, 0xfea2, 0xfea6, 0xfeaa,
    0xfeac, 0xfeae, 0xfeb0, 0xfeb2, 0xfeb6, 0xfeba, 0xfebe, 0xfec2,
    0xfec6, 0xfeca, 0xfece, 0x063b, 0x063c, 0x063d, 0x063e, 0x063f,
    0x0640, 0xfed2, 0xfed6, 0xfeda, 0xfede, 0xfee2, 0xfee6, 0xfeea,
    0xfeee, 0xfef0, 0xfef2, 0x064b, 0x064c, 0x064d, 0x064e, 0x064f,
    0x0650, 0x0651, 0x0652, 0x0653, 0x0654, 0x0655, 0x0656, 0x0657,
    0x0658, 0x0659, 0x065a, 0x065b, 0x065c, 0x065d, 0x065e, 0x065f,
    0x0660, 0x0661, 0x0662, 0x0663, 0x0664, 0x0665, 0x0666, 0x0667,
    0x0668, 0x0669, 0x066a, 0x066b, 0x066c, 0x066d, 0x066e, 0x066f,
    0x0670, 0xfb51, 0x0672, 0x0673, 0x0674, 0x0675, 0x0676, 0x0677,
    0x0678, 0xfb67, 0xfb5f, 0xfb53, 0x067c, 0x067d, 0xfb57, 0xfb63,
    0xfb5b, 0x0681, 0x0682, 0xfb77, 0xfb73, 0x0685, 0xfb7b, 0xfb7f,
    0xfb89, 0x0689, 0x068a, 0x068b, 0xfb85, 0xfb83, 0xfb87, 0x068f,
    0x0690, 0xfb8d, 0x0692, 0x0693, 0x0694, 0x0695, 0x0696, 0x0697,
    0xfb8b, 0x0699, 0x069a, 0x069b, 0x069c, 0x069d, 0x069e, 0x069f,
    0x06a0, 0x06a1, 0x06a2, 0x06a3, 0xfb6b, 0x06a5, 0xfb6f, 0x06a7,
    0x06a8, 0xfb8f, 0x06aa, 0x06ab, 0x06ac, 0xfbd4, 0x06ae, 0xfb93,
    0x06b0, 0xfb9b, 0x06b2, 0xfb97, 0x06b4, 0x06b5, 0x06b6, 0x06b7,
    0x06b8, 0x06b9, 0xfb9f, 0xfba1, 0x06bc, 0x06bd, 0xfbab, 0x06bf,
    0xfba5, 0xfba7, 0x06c2, 0x06c3, 0x06c4, 0xfbe1, 0xfbda, 0xfbd8,
    0xfbdc, 0xfbe3, 0x06ca, 0xfbdf, 0xfbfd, 0x06cd, 0x06ce, 0x06cf,
    0xfbe5, 0x06d1, 0xfbaf, 0xfbb1, 0x06d4, 0x06d5, 0x06d6, 0x06d7,
    0x06d8, 0x06d9, 0x06da, 0x06db, 0x06dc, 0x06dd, 0x06de, 0x06df,
    0x06e0, 0x06e1, 0x06e2, 0x06e3, 0x06e4, 0x06e5, 0x06e6, 0x06e7,
    0x06e8, 0x06e9, 0x06ea, 0x06eb, 0x06ec, 0x06ed, 0x06ee, 0x06ef,
    0x06f0, 0x06f1, 0x06f2, 0x06f3, 0x06f4, 0x06f5, 0x06f6, 0x06f7,
    0x06f8, 0x06f9, 0x06fa, 0x06fb, 0x06fc, 0x06fd, 0x06fe, 0x06ff
  ],
  ISOL: [
    0x0600, 0x0601, 0x0602, 0x0603, 0x0604, 0x0605, 0x0606, 0x0607,
    0x0608, 0x0609, 0x060a, 0x060b, 0x060c, 0x060d, 0x060e, 0x060f,
    0x0610, 0x0611, 0x0612, 0x0613, 0x0614, 0x0615, 0x0616, 0x0617,
    0x0618, 0x0619, 0x061a, 0x061b, 0x061c, 0x061d, 0x061e, 0x061f,
    0x0620, 0xfe80, 0xfe81, 0xfe83, 0xfe85, 0xfe87, 0xfe89, 0xfe8d,
    0xfe8f, 0xfe93, 0xfe95, 0xfe99, 0xfe9d, 0xfea1, 0xfea5, 0xfea9,
    0xfeab, 0xfead, 0xfeaf, 0xfeb1, 0xfeb5, 0xfeb9, 0xfebd, 0xfec1,
    0xfec5, 0xfec9, 0xfecd, 0x063b, 0x063c, 0x063d, 0x063e, 0x063f,
    0x0640, 0xfed1, 0xfed5, 0xfed9, 0xfedd, 0xfee1, 0xfee5, 0xfee9,
    0xfeed, 0xfeef, 0xfef1, 0x064b, 0x064c, 0x064d, 0x064e, 0x064f,
    0x0650, 0x0651, 0x0652, 0x0653, 0x0654, 0x0655, 0x0656, 0x0657,
    0x0658, 0x0659, 0x065a, 0x065b, 0x065c, 0x065d, 0x065e, 0x065f,
    0x0660, 0x0661, 0x0662, 0x0663, 0x0664, 0x0665, 0x0666, 0x0667,
    0x0668, 0x0669, 0x066a, 0x066b, 0x066c, 0x066d, 0x066e, 0x066f,
    0x0670, 0xfb50, 0x0672, 0x0673, 0x0674, 0x0675, 0x0676, 0xfbdd,
    0xfbdd, 0xfb66, 0xfb5e, 0xfb52, 0xfbdd, 0xfbdd, 0xfb56, 0xfb62,
    0xfb5a, 0xfbdd, 0xfbdd, 0xfb76, 0xfb72, 0xfbdd, 0xfb7a, 0xfb7e,
    0xfb88, 0x0689, 0x068a, 0x068b, 0xfb84, 0xfb82, 0xfb86, 0x068f,
    0x0690, 0xfb8c, 0x0692, 0x0693, 0x0694, 0x0695, 0x0696, 0x0697,
    0xfb8a, 0x0699, 0x069a, 0x069b, 0x069c, 0x069d, 0x069e, 0x069f,
    0x06a0, 0x06a1, 0x06a2, 0x06a3, 0xfb6a, 0x06a5, 0xfb6e, 0x06a7,
    0x06a8, 0xfb8e, 0x06aa, 0x06ab, 0x06ac, 0xfbd3, 0x06ae, 0xfb92,
    0x06b0, 0xfb9a, 0x06b2, 0xfb96, 0x06b4, 0x06b5, 0x06b6, 0x06b7,
    0x06b8, 0x06b9, 0xfb9e, 0xfba0, 0x06bc, 0x06bd, 0xfbaa, 0x06bf,
    0xfba4, 0xfba6, 0x06c2, 0x06c3, 0x06c4, 0xfbe0, 0xfbd9, 0xfbd7,
    0xfbdb, 0xfbe2, 0x06ca, 0xfbde, 0xfbfc, 0x06cd, 0x06ce, 0x06cf,
    0xfbe4, 0x06d1, 0xfbae, 0xfbb0, 0x06d4, 0x06d5, 0x06d6, 0x06d7,
    0x06d8, 0x06d9, 0x06da, 0x06db, 0x06dc, 0x06dd, 0x06de, 0x06df,
    0x06e0, 0x06e1, 0x06e2, 0x06e3, 0x06e4, 0x06e5, 0x06e6, 0x06e7,
    0x06e8, 0x06e9, 0x06ea, 0x06eb, 0x06ec, 0x06ed, 0x06ee, 0x06ef,
    0x06f0, 0x06f1, 0x06f2, 0x06f3, 0x06f4, 0x06f5, 0x06f6, 0x06f7,
    0x06f8, 0x06f9, 0x06fa, 0x06fb, 0x06fc, 0x06fd, 0x06fe, 0x06ff
  ]
};

/**
 * Character codes representing the presentation forms of Japanese characters
 * used for vertical writing.
 * @enum {Array.<number>}
 */
org.jstype.JapaneseForms = {
  VERT: [
    0xFE10, 0x002C,
    0xFE11, 0x3001,
    0xFE12, 0x3002,
    0xFE13, 0x003A,
    0xFE14, 0x003B,
    0xFE15, 0x0021,
    0xFE16, 0x003F,
    0xFE17, 0x3016,
    0xFE18, 0x3017,
    0xFE19, 0x2026,
    0xFE30, 0x2025,
    0xFE31, 0x2014,
    0xFE32, 0x2013,
    0xFE33, 0x005F,
    0xFE34, 0x005F,
    0xFE35, 0x0028,
    0xFE36, 0x0029,
    0xFE37, 0x007B,
    0xFE38, 0x007D,
    0xFE39, 0x3014,
    0xFE3A, 0x3015,
    0xFE3B, 0x3010,
    0xFE3C, 0x3011,
    0xFE3D, 0x300A,
    0xFE3E, 0x300B,
    0xFE3F, 0x3008,
    0xFE40, 0x3009,
    0xFE41, 0x300C,
    0xFE42, 0x300D,
    0xFE43, 0x300E,
    0xFE44, 0x300F
  ]
};

/**
 * Writes a log message to a debug console.
 * @param {*} message
 */
org.jstype.log = function(message) {
  if (org.jstype.DEBUG) {
    var jsConsole = org.jstype.global.console;
    if (jsConsole && jsConsole.log) {
      jsConsole.log(message);
    }
  }
};

/**
 * Writes a warning message to a debug console.
 * @param {*} message
 */
org.jstype.warn = function(message) {
  if (org.jstype.DEBUG) {
    var jsConsole = org.jstype.global.console;
    if (jsConsole && jsConsole.warn) {
      jsConsole.warn(message);
    }
  }
};

/**
 * Exposes an object and its methods to the global namespace path.
 * @param {string} name
 * @param {Object} object
 * @param {Object.<string,Function>} methods
 */
org.jstype.exportObject = function(name, object, methods) {
  if (!org.jstype.COMPILED) {
    return;
  }
  var parts = name.split('.');
  var cur = self;
  var length = parts.length - 1;
  for (var i = 0; i < length; ++i) {
    var part = parts[i];
    if (cur[part]) {
      cur = cur[part];
    } else {
      cur = cur[part] = {};
    }
  }
  cur[parts[length]] = object;
  for (var key in methods) {
    object.prototype[key] = methods[key];
  }
};

/**
 * Rounds a number downwards to its nearest integer.
 * @param {number} n
 * @return {number}
 */
org.jstype.floor = function(n) {
  return n | 0;
};

/**
 * Rounds a number to its nearest integer.
 * @param {number} n
 * @return {number}
 */
org.jstype.round = function(n) {
  return org.jstype.floor(n + 0.5);
};

/**
 * Returns the depth of the specified color.
 * @param {number} n
 * @return {number}
 */
org.jstype.getDepth = function(n) {
  if (n <= 2) {
    return 1;
  } else if (n <= 4) {
    return 2;
  } else if (n <= 16) {
    return 4;
  }
  return 24;
};

/**
 * Reads a signed 16-bit value.
 * @param {Uint8Array} data
 * @param {number} offset
 * @return {number}
 */
org.jstype.read16s = function(data, offset) {
  var n = (data[offset] << 8) | data[offset + 1];
  return (n << 16) >> 16;
};

/**
 * Reads an unsigned 16-bit value.
 * @param {Uint8Array} data
 * @param {number} offset
 * @return {number}
 */
org.jstype.read16 = function(data, offset) {
  return (data[offset] << 8) | data[offset + 1];
};

/**
 * Reads a signed 32-bit value.
 * @param {Uint8Array} data
 * @param {number} offset
 * @return {number}
 */
org.jstype.read32 = function(data, offset) {
  return (data[offset] << 24) | (data[offset + 1] << 16) |
      (data[offset + 2] << 8) | data[offset + 3];
};

/**
 * Reads a Date object representing by a DATETIME value.
 * @param {Uint8Array} data
 * @param {number} offset
 * @return {Date}
 */
org.jstype.readDate = function(data, offset) {
  // A LONGDATETIME variable is a 64-bit integer and a JavaScript number (a
  // double-precision float) cannot represent it precisely. This code skips
  // the first two bytes of a LONGDATETIME variable, which are very likely 0, to
  // prevent its last bytes from being truncated. (For your information, A
  // LONGDATETIME variable 0x00000000ffffffff represents 8 March, 2040.)
  var n = (data[offset + 2] << 16) | (data[offset + 3] << 8) | data[offset + 4];
  n *= 256 * 256 * 256;
  n += (data[offset + 5] << 16) | (data[offset + 6] << 8) | data[offset + 7];
  return new Date((n - 2080198800) * 1000);
};

/**
 * Reads a tag string.
 * @param {Uint8Array} data
 * @param {number} offset
 * @return {string}
 */
org.jstype.readTag = function(data, offset) {
  return String.fromCharCode(data[offset],
                             data[offset + 1],
                             data[offset + 2],
                             data[offset + 3]);
};

/**
 * Reads a list of 16-bit signed integers.
 * @param {Uint8Array} data
 * @param {number} offset
 * @param {number} count
 * @return {Int32Array}
 * @private
 */
org.jstype.readArray16s = function(data, offset, count) {
  var list = new Int32Array(count);
  for (var i = 0; i < count; ++i) {
    list[i] = org.jstype.read16s(data, offset);
    offset += 2;
  }
  return list;
};

/**
 * Reads a list of 16-bit unsigned integers.
 * @param {Uint8Array} data
 * @param {number} offset
 * @param {number} count
 * @return {Int32Array}
 * @private
 */
org.jstype.readArray16 = function(data, offset, count) {
  var list = new Int32Array(count);
  for (var i = 0; i < count; ++i) {
    list[i] = org.jstype.read16(data, offset);
    offset += 2;
  }
  return list;
};

/**
 * Reads a list of 32-bit signed integers.
 * @param {Uint8Array} data
 * @param {number} offset
 * @param {number} count
 * @return {Int32Array}
 * @private
 */
org.jstype.readArray32 = function(data, offset, count) {
  var list = new Int32Array(count);
  for (var i = 0; i < count; ++i) {
    list[i] = org.jstype.read32(data, offset);
    offset += 4;
  }
  return list;
};

/**
 * A class representing a TTC (TrueType Collection) header.
 * @param {Uint8Array} data
 * @param {number} offset
 * @constructor
 */
org.jstype.CollectionHeader = function(data, offset) {
  /**
   * The version of this header, it must be either 0x00010000 (1.0) or
   * 0x00020000 (2.0).
   * @const {number}
   */
  this.version = org.jstype.read32(data, offset + 4);

  /**
   * The number of TrueType fonts in this collection.
   * @const {number}
   */
  var numFonts = org.jstype.read32(data, offset + 8);

  /**
   * The offsets to the TrueType fonts in this collection.
   * @const {Int32Array}
   */
  this.offsetTable = org.jstype.readArray32(data, offset + 12, numFonts);
};

/**
 * A class representing an offset Table.
 * @param {Uint8Array} data
 * @param {number} offset
 * @constructor
 */
org.jstype.OffsetTable = function(data, offset) {
  /**
   * The version of this OpenType font, it must be 0x00010000 (1.0).
   * @const {number}
   */
  this.version = org.jstype.read32(data, offset);

  /**
   * The number of font tables in this font.
   * @const {number}
   */
  this.numTables = org.jstype.read16(data, offset + 4);

  /**
   * @const {number}
   */
  this.searchRange = org.jstype.read16(data, offset + 6);

  /**
   * @const {number}
   */
  this.entrySelector = org.jstype.read16(data, offset + 8);

  /**
   * @const {number}
   */
  this.rangeShift = org.jstype.read16(data, offset + 10);
};

/**
 * A class representing a table-record entry.
 * @param {Uint8Array} data
 * @param {number} offset
 * @constructor
 */
org.jstype.TableRecord = function(data, offset) {
  /**
   * @const {string}
   */
  this.tag = org.jstype.readTag(data, offset);

  /**
   * @const {number}
   */
  this.checkSum = org.jstype.read32(data, offset + 4);

  /**
   * @const {number}
   */
  this.tableOffset = org.jstype.read32(data, offset + 8);

  /**
   * @const {number}
   */
  this.tableLength = org.jstype.read32(data, offset + 12);
};

/**
 * A class representing a HEAD (Font-Header) table.
 * @param {Uint8Array} data
 * @param {Object.<string,org.jstype.TableRecord>} records
 * @constructor
 */
org.jstype.HeadTable = function(data, records) {
  /**
   * @const {number}
   */
  var offset = records['head'].tableOffset;

  /**
   * @const {number}
   */
  this.version = org.jstype.read32(data, offset);

  /**
   * @const {number}
   */
  this.fontRevision = org.jstype.read32(data, offset + 4);

  /**
   * @const {number}
   */
  this.checkSumAdjustment = org.jstype.read32(data, offset + 8);

  /**
   * @const {number}
   */
  this.magicNumber = org.jstype.read32(data, offset + 12);

  /**
   * @const {number}
   */
  this.flags = org.jstype.read16(data, offset + 16);

  /**
   * @const {number}
   */
  this.unitsPerEm = org.jstype.read16(data, offset + 18);

  /**
   * @const {Date}
   */
  this.created = org.jstype.readDate(data, offset + 20);

  /**
   * @const {Date}
   */
  this.modified = org.jstype.readDate(data, offset + 28);

  /**
   * @const {number}
   */
  this.xMin = org.jstype.read16s(data, offset + 36);

  /**
   * @const {number}
   */
  this.yMin = org.jstype.read16s(data, offset + 38);

  /**
   * @const {number}
   */
  this.xMax = org.jstype.read16s(data, offset + 40);

  /**
   * @const {number}
   */
  this.yMax = org.jstype.read16s(data, offset + 42);

  /**
   * @const {number}
   */
  this.macStyle = org.jstype.read16(data, offset + 44);

  /**
   * @const {number}
   */
  this.lowestRecPPEM = org.jstype.read16(data, offset + 46);

  /**
   * @const {number}
   */
  this.fontDirectionHint = org.jstype.read16(data, offset + 48);

  /**
   * @const {number}
   */
  this.indexToLocFormat = org.jstype.read16(data, offset + 50);

  /**
   * @const {number}
   */
  this.glyphDataFormat = org.jstype.read16(data, offset + 52);
};

/**
 * A class representing a MAXP (Max-Profile) table.
 * @param {Uint8Array} data
 * @param {Object.<string,org.jstype.TableRecord>} records
 * @constructor
 */
org.jstype.MaxpTable = function(data, records) {
  /**
   * @const {number}
   */
  var offset = records['maxp'].tableOffset;

  /**
   * @const {number}
   */
  this.version = org.jstype.read32(data, offset);

  /**
   * @const {number}
   */
  this.numGlyphs = org.jstype.read16(data, offset + 4);
};

/**
 * A class representing a LOCA (Index-to-Location) table. This class reads a
 * LOCA table and creates a list of absolute offsets to glyphs. (A LOCA table
 * consists of a list of relative offsets from the beginning of a GLYF table.)
 * @param {Uint8Array} data
 * @param {Object.<string,org.jstype.TableRecord>} records
 * @param {number} numGlyphs
 * @param {number} format
 * @constructor
 */
org.jstype.LocaTable = function(data, records, numGlyphs, format) {
  /**
   * @const {number}
   */
  var offset = records['loca'].tableOffset;

  /**
   * @const {number}
   */
  var glyf = records['glyf'].tableOffset;

  /**
   * @const {Int32Array}
   */
  this.offsets = (format == 0) ?
      org.jstype.LocaTable.readShortOffsets_(data, offset, numGlyphs, glyf) :
      org.jstype.LocaTable.readLongOffsets_(data, offset, numGlyphs, glyf);
};

/**
 * Adjusts the offset values. When a glyph is an empty glyph, its offset is
 * equal to the one of its next glyph. This function resets the offset values of
 * such empty glyphs.
 * @param {Int32Array} offsets
 * @param {number} numGlyphs
 * @return {Int32Array}
 */
org.jstype.LocaTable.adjustOffsets_ = function(offsets, numGlyphs) {
  for (var i = 0; i < numGlyphs; ++i) {
    if (offsets[i] == offsets[i + 1]) {
      offsets[i] = 0;
    }
  }
  return offsets;
};

/**
 * Reads a list of short (16-bit) offsets.
 * @param {Uint8Array} data
 * @param {number} offset
 * @param {number} numGlyphs
 * @param {number} glyf
 * @return {Int32Array}
 * @private
 */
org.jstype.LocaTable.readShortOffsets_ = function(data,
                                                  offset,
                                                  numGlyphs,
                                                  glyf) {
  var offsets = new Int32Array(numGlyphs + 1);
  for (var i = 0; i <= numGlyphs; ++i) {
    var value = org.jstype.read16(data, offset) << 1;
    offsets[i] = glyf + value;
    offset += 2;
  }
  return org.jstype.LocaTable.adjustOffsets_(offsets, numGlyphs);
};


/**
 * Reads a list of long (32-bit) offsets.
 * @param {Uint8Array} data
 * @param {number} offset
 * @param {number} numGlyphs
 * @param {number} glyf
 * @return {Int32Array}
 * @private
 */
org.jstype.LocaTable.readLongOffsets_ = function(data,
                                                 offset,
                                                 numGlyphs,
                                                 glyf) {
  var offsets = new Int32Array(numGlyphs + 1);
  for (var i = 0; i <= numGlyphs; ++i) {
    var value = org.jstype.read32(data, offset);
    offsets[i] = glyf + value;
    offset += 4;
  }
  return org.jstype.LocaTable.adjustOffsets_(offsets, numGlyphs);
};

/**
 * A class representing a HHEA (Horizontal Header) table.
 * @param {Uint8Array} data
 * @param {Object.<string,org.jstype.TableRecord>} records
 * @constructor
 */
org.jstype.HheaTable = function(data, records) {
  /**
   * @const {number}
   */
  var offset = records['hhea'].tableOffset;

  /**
   * @const {number}
   */
  this.version = org.jstype.read32(data, offset);

  /**
   * Typographic ascent
   * @const {number}
   */
  this.ascender = org.jstype.read16s(data, offset + 4);

  /**
   * Typographic descent
   * @const {number}
   */
  this.descender = org.jstype.read16s(data, offset + 6);

  /**
   * Typographic line gap
   * @const {number}
   */
  this.lineGap = org.jstype.read16s(data, offset + 8);

  /**
   * Maximum advance width value in 'hmtx' table
   * @const {number}
   */
  this.advanceWidthMax = org.jstype.read16s(data, offset + 10);

  /**
   * Minimum left side-bearing value in 'hmtx' table
   * @const {number}
   */
  this.minLeftSideBearing = org.jstype.read16s(data, offset + 12);

  /**
   * Minimum right side-bearing value
   * @const {number}
   */
  this.minRightSideBearing = org.jstype.read16s(data, offset + 14);

  /**
   * Max(lsb + (xMax - xMin)).
   * @const {number}
   */
  this.xMaxExtent = org.jstype.read16s(data, offset + 16);

  /**
   * Number of hMetric entries in 'hmtx' table
   * @const {number}
   */
  this.numberOfHMetrics = org.jstype.read16(data, offset + 34);
};

/**
 * A class representing a HMTX (Horizontal Metrics) table.
 * @param {Uint8Array} data
 * @param {Object.<string,org.jstype.TableRecord>} records
 * @param {org.jstype.HheaTable} hhea
 * @constructor
 */
org.jstype.HmtxTable = function(data, records, hhea) {
  /**
   * @const {number}
   */
  var offset = records['hmtx'].tableOffset;

  /**
   * @const {Array.<org.jstype.HmtxTable.Metrics>}
   */
  this.metrics =
      org.jstype.HmtxTable.readMetrics_(data, offset, hhea.numberOfHMetrics);
};

/**
 * @param {number} advanceWidth
 * @param {number} leftSideBearing
 * @constructor
 */
org.jstype.HmtxTable.Metrics = function(advanceWidth, leftSideBearing) {
  /**
   * @const {number}
   */
  this.advanceWidth = advanceWidth;

  /**
   * @const {number}
   */
  this.leftSideBearing = leftSideBearing;
};

/**
 * @param {Uint8Array} data
 * @param {number} offset
 * @param {number} count
 * @return {Array.<org.jstype.HmtxTable.Metrics>}
 * @private
 */
org.jstype.HmtxTable.readMetrics_ = function(data, offset, count) {
  var metrics = [];
  for (var i = 0; i < count; ++i) {
    var advanceWidth = org.jstype.read16(data, offset);
    var leftBearing = org.jstype.read16s(data, offset + 2);
    metrics.push(new org.jstype.HmtxTable.Metrics(advanceWidth, leftBearing));
    offset += 4;
  }
  return metrics;
};

/**
 * A class consisting of mapping tables generated from a CMAP table.
 * @constructor
 */
org.jstype.CodeMap = function() {
  /**
   * A mapping table from a character code to an offset to its glyph. This table
   * is used for rendering of simple glyphs, each of which does not need glyph
   * substitutions.
   * @type {Array.<Int32Array>}
   * @private
   */
  this.codeMap_ = org.jstype.CodeMap.createMap_(null);

  /**
   * A mapping table from a glyph ID to an offset to the glyph. This table is
   * used for rendering composite glyphs, each of which consists of one glyph or
   * more.
   * @type {Array.<Int32Array>}
   * @private
   */
  this.glyphMap_ = org.jstype.CodeMap.createMap_(null);

  /**
   * A mapping table from a character code to a glyph ID. This table is used for
   * glyph substitution.
   * @type {Array.<Int32Array>}
   * @private
   */
  this.charMap_ = org.jstype.CodeMap.createMap_(null);
};

/**
 * Creates a mapping table used in this object.
 * @param {?number} v
 * @return {Array.<Int32Array>}
 * @private
 */
org.jstype.CodeMap.createMap_ = function(v) {
  return [
    v, v, v, v, v, v, v, v, v, v, v, v, v, v, v, v,
    v, v, v, v, v, v, v, v, v, v, v, v, v, v, v, v,
    v, v, v, v, v, v, v, v, v, v, v, v, v, v, v, v,
    v, v, v, v, v, v, v, v, v, v, v, v, v, v, v, v,
    v, v, v, v, v, v, v, v, v, v, v, v, v, v, v, v,
    v, v, v, v, v, v, v, v, v, v, v, v, v, v, v, v,
    v, v, v, v, v, v, v, v, v, v, v, v, v, v, v, v,
    v, v, v, v, v, v, v, v, v, v, v, v, v, v, v, v,
    v, v, v, v, v, v, v, v, v, v, v, v, v, v, v, v,
    v, v, v, v, v, v, v, v, v, v, v, v, v, v, v, v,
    v, v, v, v, v, v, v, v, v, v, v, v, v, v, v, v,
    v, v, v, v, v, v, v, v, v, v, v, v, v, v, v, v,
    v, v, v, v, v, v, v, v, v, v, v, v, v, v, v, v,
    v, v, v, v, v, v, v, v, v, v, v, v, v, v, v, v,
    v, v, v, v, v, v, v, v, v, v, v, v, v, v, v, v,
    v, v, v, v, v, v, v, v, v, v, v, v, v, v, v, v
  ];
};

/**
 * A class representing a sub-table of Format 4.
 * @param {Uint8Array} data
 * @param {number} offset
 * @constructor
 */
org.jstype.CodeMap.Format4 = function(data, offset) {
  var length = org.jstype.read16(data, offset + 2)
  var segCountX2 = org.jstype.read16(data, offset + 6);
  var segCount = segCountX2 >> 1;
  var glyphCount = (length - 16 - (segCountX2 << 2)) >> 1;

  /**
   * @const {number}
   */
  this.format = org.jstype.read16(data, offset);

  /**
   * @const {number}
   */
  this.length = length;

  /**
   * @const {number}
   */
  this.language = org.jstype.read16(data, offset + 4);

  /**
   * @const {number}
   */
  this.segCount = segCount;

  /**
   * @const {number}
   */
  this.searchRange = org.jstype.read16(data, offset + 8);

  /**
   * @const {number}
   */
  this.entrySelector = org.jstype.read16(data, offset + 10);

  /**
   * @const {number}
   */
  this.rangeShift = org.jstype.read16(data, offset + 12);

  /**
   * @const {Int32Array}
   */
  this.endCount = org.jstype.readArray16(data, offset + 14, segCount);
  offset += 14 + segCountX2;

  /**
   * @const {number}
   */
  this.resevedPad = org.jstype.read16(data, offset);

  /**
   * @const {Int32Array}
   */
  this.startCount = org.jstype.readArray16(data, offset + 2, segCount);
  offset += 2 + segCountX2;

  /**
   * @const {Int32Array}
   */
  this.idDelta = org.jstype.readArray16s(data, offset, segCount);
  offset += segCountX2;

  /**
   * @const {Int32Array}
   */
  this.idRangeOffset = org.jstype.CodeMap.Format4.readRangeOffsets_(
      data,
      offset,
      segCount,
      offset + segCountX2);
  offset += segCountX2;

  /**
   * @const {Int32Array}
   */
  this.glyphIdArray = org.jstype.readArray16(data, offset, glyphCount);
};

/**
 * Reads a list of offsets to an array of glyph IDs.
 * @param {Uint8Array} data
 * @param {number} offset
 * @param {number} count
 * @param {number} arrayOffset
 * @return {Int32Array} offset
 * @private
 */
org.jstype.CodeMap.Format4.readRangeOffsets_ = function(data,
                                                        offset,
                                                        count,
                                                        arrayOffset) {
  var offsets = new Int32Array(count);
  for (var i = 0; i < count; ++i) {
    var value = org.jstype.read16(data, offset);
    offsets[i] = value == 0 ? 0 : (offset + value - arrayOffset) >> 1;
    offset += 2;
  }
  return offsets;
};

/**
 * Opens a CMAP sub-table of Format 4.
 * @param {Uint8Array} data
 * @param {Object.<string,org.jstype.TableRecord>} records
 * @param {org.jstype.LocaTable} loca
 * @param {number} offset
 * @return {boolean}
 * @private
 */
org.jstype.CodeMap.prototype.openFormat4_ = function(data,
                                                     records,
                                                     loca,
                                                     offset) {
  var table = new org.jstype.CodeMap.Format4(data, offset);
  if (table.format != 4) {
    return false;
  }
  for (var i = 0; i < table.segCount; ++i) {
    var startCode = table.startCount[i];
    var endCode = table.endCount[i];
    var idDelta = table.idDelta[i];
    if (idDelta == 0) {
      var idRangeOffset = table.idRangeOffset[i];
      for (var code = startCode; code <= endCode; ++code) {
        var glyphId = table.glyphIdArray[idRangeOffset + code - startCode];
        this.setMap_(code, glyphId, loca.offsets[glyphId]);
      }
    } else {
      for (var code = startCode; code <= endCode; ++code) {
        var glyphId = (code + idDelta) & 0xffff;
        this.setMap_(code, glyphId, loca.offsets[glyphId]);
      }
    }
  }
  return true;
};

/**
 * Creates a mapping from a character code to an offset and a mapping from a
 * glyph ID to an offset.
 * @param {number} code
 * @param {number} glyphId
 * @param {number} offset
 * @private
 */
org.jstype.CodeMap.prototype.setMap_ = function(code, glyphId, offset) {
  var codeHigh = code >> 8;
  if (!this.codeMap_[codeHigh]) {
    this.codeMap_[codeHigh] = new Int32Array(256);
  }
  this.codeMap_[codeHigh][code & 0xff] = offset;

  var glyphHigh = glyphId >> 8;
  if (!this.glyphMap_[glyphHigh]) {
    this.glyphMap_[glyphHigh] = new Int32Array(256);
  }
  this.glyphMap_[glyphHigh][glyphId & 0xff] = offset;

  if (!this.charMap_[codeHigh]) {
    this.charMap_[codeHigh] = new Int32Array(256);
  }
  this.charMap_[codeHigh][code & 0xff] = glyphId;
};

/**
 * Returns the offset to the glyph associated with a character code.
 * @param {number} code
 * @return {number}
 */
org.jstype.CodeMap.prototype.getCodeOffset = function(code) {
  var map = this.codeMap_[code >> 8];
  return map ? map[code & 0xff] : 0;
};

/**
 * Returns the offset to the glyph associated with the glyph ID.
 * @param {number} glyphId
 * @return {number}
 */
org.jstype.CodeMap.prototype.getGlyphOffset = function(glyphId) {
  var map = this.glyphMap_[glyphId >> 8];
  return map ? map[glyphId & 0xff] : 0;
};

/**
 * Returns the glyph ID associated with a character code.
 * @param {number} code
 * @return {number}
 */
org.jstype.CodeMap.prototype.getGlyphId = function(code) {
  var map = this.charMap_[code >> 8];
  return map ? map[code & 0xff] : 0;
};

/**
 * Loads a CMAP table and creates the mappings used by this object.
 * @param {Uint8Array} data
 * @param {Object.<string,org.jstype.TableRecord>} records
 * @param {org.jstype.LocaTable} loca
 * @return {boolean}
 */
org.jstype.CodeMap.prototype.loadTable = function(data, records, loca) {
  var record = records['cmap'];
  var version = org.jstype.read16(data, record.tableOffset);
  var numTables = org.jstype.read16(data, record.tableOffset + 2);
  var offset = record.tableOffset + 4;
  for (var i = 0; i < numTables; ++i) {
    /**
     * Pairs of platform IDs and encoding IDs.
     * @enum {number}
     * @const
     */
    var EncodingId = {
      UNICODE_UNICODE: 0x00000003,
      MICROSOFT_UNICODE: 0x00030001,
      MICROSOFT_SHIFTJIS: 0x00030002,
      MICROSOFT_PRC: 0x00030003,
      MICROSOFT_BIG5: 0x00030004,
      MICROSOFT_WANSUNG: 0x00030005,
      MICROSOFT_JOHAB: 0x00030006,
      MICROSOFT_UNICODE_UCS4: 0x0003000a
    }
    // This library supports only Unicode fonts which have at least one
    // Format 4 table for simplicity.
    var encoding = org.jstype.read32(data, offset);
    if (encoding == EncodingId.UNICODE_UNICODE ||
        encoding == EncodingId.MICROSOFT_UNICODE) {
      var subTableOffset =
          record.tableOffset + org.jstype.read32(data, offset + 4);
      return this.openFormat4_(data, records, loca, subTableOffset);
    }
    offset += 8;
  }
  return false;
};

/**
 * Creates mappings from characters to the glyphs for their alternative
 * characters. Unicode has some feature-specific or language-specific characters
 * that not all fonts have mappings for these character codes to glyphs. This
 * function reads a glyph-substitution table and adds the mappings for such
 * language-specific or feature-specific characters.
 * @param {Uint8Array} data
 * @param {org.jstype.GsubTable} gsub
 * @param {Array.<number>} codes
 * @param {string} script
 * @param {string} language
 * @param {string} feature
 */
org.jstype.CodeMap.prototype.setAlternativeCodes = function(data,
                                                            gsub,
                                                            codes,
                                                            script,
                                                            language,
                                                            feature) {
  var lookups = null;
  for (var i = 0; i < codes.length; i += 2) {
    var code = codes[i];
    if (!this.getGlyphOffset(code)) {
      // Retrieve lookup tables matching with the specified script, language,
      // and feature. (There may be two or more tables matching with the given
      // condition.)
      if (!lookups) {
        lookups = gsub.getLookupRecords(data, script, language, feature);
        if (lookups.length == 0) {
          return;
        }
      }
      // Find substitute glyphs for the alternative glyph of the given glyph.
      var altGlyphId = this.getGlyphId(codes[i + 1]);
      if (altGlyphId) {
        for (var j = 0; j < lookups.length; ++j) {
          var glyphId = lookups[j].subTables[altGlyphId];
          if (glyphId) {
            var offset = gsub.loca.offsets[glyphId];
            if (offset) {
              this.setMap_(code, glyphId, offset);
            }
            break;
          }
        }
      }
    }
  }
};

/**
 * A class representing a GSUB (Glyph-Substitution) table.
 * @param {Uint8Array} data
 * @param {org.jstype.TableRecord} record
 * @param {org.jstype.LocaTable} loca
 * @constructor
 */
org.jstype.GsubTable = function(data, record, loca) {
  /**
   * @const {org.jstype.LocaTable}
   */
  this.loca = loca;

  /**
   * @const {number}
   * @private
   */
  this.offset_ = record.tableOffset;

  /**
   * @type {Array.<org.jstype.GsubTable.Script>}
   * @private
   */
  this.scripts_ = null;
};

/**
 * 
 * @param {Uint8Array} data
 * @param {string} script
 * @param {string} language
 * @param {string} feature
 * @return {Array.<org.jstype.GsubTable.LookupRecord>}
 */
org.jstype.GsubTable.prototype.getLookupRecords = function(data,
                                                           script,
                                                           language,
                                                           feature) {
  var lookups = [];
  if (!this.scripts_) {
    this.scripts_ = org.jstype.GsubTable.readTable_(data, this.offset_);
  }
  for (var i = 0; i < this.scripts_.length; ++i) {
    var record = this.scripts_[i];
    if (record.match(script, language, feature)) {
      for (var j = 0; j < record.offsets.length; ++j) {
        lookups.push(
            new org.jstype.GsubTable.LookupRecord(data, record.offsets[j]));
      }
    }
  }
  return lookups;
};

/**
 * A class representing an entry of a glyph-substitution table used by the
 * org.jstype.GsubTable object.
 * @param {string} script
 * @param {string} language
 * @param {string} feature
 * @param {Int32Array} offsets
 * @constructor
 */
org.jstype.GsubTable.Script = function(script, language, feature, offsets) {
  /**
   * @const {string}
   */
  this.script = script;

  /**
   * @const {string}
   */
  this.language = language;

  /**
   * @const {string}
   */
  this.feature = feature;

  /**
   * @const {Int32Array}
   */
  this.offsets = offsets;
};

/**
 * Returns whether this object matches with the specified values.
 * @param {string} script
 * @param {string} language
 * @param {string} feature
 * @return {boolean}
 */
org.jstype.GsubTable.Script.prototype.match = function(script,
                                                       language,
                                                       feature) {
  return this.script == script &&
      this.language == language &&
      this.feature == feature;
};

/**
 * Reads a glyph substitution table and returns a list of lookup tables. A GSUB
 * table consists of three lists (a script list, a feature list, and a lookup
 * list) to avoid duplicates. This function composes these lists to a flat list
 * of org.jstype.GsubTable.Script objects for better accessibility.
 * @param {Uint8Array} data
 * @param {number} offset
 * @return {Array.<org.jstype.GsubTable.Script>}
 * @private
 */
org.jstype.GsubTable.readTable_ = function(data, offset) {
  var scripts = [];
  var version = org.jstype.read32(data, offset);
  if (version != 0x00010000) {
    return scripts;
  }
  // Read three sub-tables in this table and create a mapping from a language
  // name to the features provided for the language. Each feature in this table
  // just includes an offset to a lookup table so we can read it only when we
  // have to.
  var scriptRecords = org.jstype.GsubTable.readScriptRecords_(data, offset);
  var featureRecords = org.jstype.GsubTable.readFeatureRecords_(data, offset);
  var lookupRecords = org.jstype.GsubTable.readLookupRecords_(data, offset);
  for (var i = 0; i < scriptRecords.length; ++i) {
    var script = scriptRecords[i];
    for (var j = 0; j < script.featureIndices.length; ++j) {
      var feature = featureRecords[script.featureIndices[j]];
      var lookupOffsets = new Int32Array(feature.lookupIndices.length);
      for (var k = 0; k < feature.lookupIndices.length; ++k) {
        lookupOffsets[k] = lookupRecords[feature.lookupIndices[k]];
      }
      scripts.push(new org.jstype.GsubTable.Script(script.tag,
                                                   script.language,
                                                   feature.tag,
                                                   lookupOffsets));
    }
  }
  return scripts;
};

/**
 * @param {Uint8Array} data
 * @param {number} offset
 * @return {Int32Array}
 * @private
 */
org.jstype.GsubTable.readLookupRecords_ = function(data, offset) {
  offset += org.jstype.read16(data, offset + 8);
  var recordCount = org.jstype.read16(data, offset);
  var recordOffset = offset;
  var records = new Int32Array(recordCount);
  for (var i = 0; i < recordCount; ++i) {
    recordOffset += 2;
    records[i] = offset + org.jstype.read16(data, recordOffset);
  }
  return records;
};

/**
 * @param {Uint8Array} data
 * @param {number} offset
 * @param {string} tag
 * @constructor
 */
org.jstype.GsubTable.FeatureRecord = function(data, offset, tag) {
  /**
   * @const {string}
   */
  this.tag = tag;

  /**
   * @const {number}
   */
  this.featureParams = org.jstype.read16(data, offset);

  /**
   * @const {number}
   */
  var lookupCount = org.jstype.read16(data, offset + 2);

  /**
   * @const {Int32Array}
   */
  this.lookupIndices = org.jstype.readArray16(data, offset + 4, lookupCount);
};

/**
 * @param {Uint8Array} data
 * @param {number} offset
 * @return {Array.<org.jstype.GsubTable.FeatureRecord>}
 * @private
 */
org.jstype.GsubTable.readFeatureRecords_ = function(data, offset) {
  offset += org.jstype.read16(data, offset + 6);
  var records = [];
  var recordCount = org.jstype.read16(data, offset);
  var recordOffset = offset + 2;
  for (var i = 0; i < recordCount; ++i) {
    var featureTag = org.jstype.readTag(data, recordOffset);
    var featureOffset = offset + org.jstype.read16(data, recordOffset + 4);
    recordOffset += 6;
    records.push(new org.jstype.GsubTable.FeatureRecord(data,
                                                        featureOffset,
                                                        featureTag));
  }
  return records;
};

/**
 * @param {Uint8Array} data
 * @param {number} offset
 * @param {string} tag
 * @param {string} language
 * @constructor
 */
org.jstype.GsubTable.ScriptRecord = function(data, offset, tag, language) {
  /**
   * @const {string}
   */
  this.tag = tag;

  /**
   * @const {string}
   */
  this.language = language;

  /**
   * @const {number}
   */
  this.lookupOrder = org.jstype.read16(data, offset);

  /**
   * @const {number}
   */
  this.reqFeatureIndex = org.jstype.read16(data, offset + 2);

  /**
   * @const {number}
   */
  var featureCount = org.jstype.read16(data, offset + 4);

  /**
   * @const {Int32Array}
   */
  this.featureIndices = org.jstype.readArray16(data, offset + 6, featureCount);
};

/**
 * @param {Uint8Array} data
 * @param {number} offset
 * @return {Array.<org.jstype.GsubTable.ScriptRecord>}
 * @private
 */
org.jstype.GsubTable.readScriptRecords_ = function(data, offset) {
  offset += org.jstype.read16(data, offset + 4);
  var records = [];
  var recordCount = org.jstype.read16(data, offset);
  var recordOffset = offset + 2;
  for (var i = 0; i < recordCount; ++i) {
    var scriptTag = org.jstype.readTag(data, recordOffset);
    var scriptOffset = offset + org.jstype.read16(data, recordOffset + 4);
    recordOffset += 6;

    var langSysOffset = scriptOffset + org.jstype.read16(data, scriptOffset);
    records.push(new org.jstype.GsubTable.ScriptRecord(data,
                                                       langSysOffset,
                                                       scriptTag,
                                                       ''));

    var featureCount = org.jstype.read16(data, scriptOffset + 2);
    var featureOffset = scriptOffset + 4;
    for (var j = 0; j < featureCount; ++j) {
      var langTag = org.jstype.readTag(data, featureOffset);
      var langOffset = scriptOffset + org.jstype.read16(data,
                                                        featureOffset + 4);
      featureOffset += 6;
      records.push(new org.jstype.GsubTable.ScriptRecord(data,
                                                         langOffset,
                                                         scriptTag,
                                                         langTag));
    }
  }
  return records;
};

/**
 * @param {Uint8Array} data
 * @param {number} offset
 * @constructor
 */
org.jstype.GsubTable.LookupRecord = function(data, offset) {
  /**
   * @const {number}
   */
  var lookupType = org.jstype.read16(data, offset);

  /**
   * @const {number}
   */
  var lookupFlag = org.jstype.read16(data, offset + 2);

  /**
   * @const {number}
   */
  var subTableCount = org.jstype.read16(data, offset + 4);

  /**
   * @const {Object.<number,number>}
   */
  this.subTables = org.jstype.GsubTable.LookupRecord.readSubtables_(
      data,
      offset,
      subTableCount,
      lookupType);
};

/**
 * An interface that substitutes glyphs in a GSUB sub-table.
 * @interface
 */
org.jstype.GsubTable.LookupRecord.Delegate = function() {};

/**
 * @param {number} glyphId
 * @param {number} index
 * @return {number}
 */
org.jstype.GsubTable.LookupRecord.Delegate.prototype.substitute =
    function(glyphId, index) {
};

/**
 * @param {number} deltaGlyphId
 * @implements {org.jstype.GsubTable.LookupRecord.Delegate}
 * @constructor
 */
org.jstype.GsubTable.LookupRecord.SingleSubstitute1 = function(deltaGlyphId) {
  /**
   * @const {number}
   * @private
   */
  this.deltaGlyphId_ = deltaGlyphId;
};

/** @override */
org.jstype.GsubTable.LookupRecord.SingleSubstitute1.prototype.substitute =
    function(glyphId, index) {
  return glyphId - this.deltaGlyphId_;
};

/**
 * @param {Int32Array} substitutes
 * @implements {org.jstype.GsubTable.LookupRecord.Delegate}
 * @constructor
 */
org.jstype.GsubTable.LookupRecord.SingleSubstitute2 = function(substitutes) {
  /**
   * @const {Int32Array}
   * @private
   */
  this.substitutes_ = substitutes;
};

/** @override */
org.jstype.GsubTable.LookupRecord.SingleSubstitute2.prototype.substitute =
    function(glyphId, index) {
  return this.substitutes_[index];
};

/**
 * @param {Uint8Array} data
 * @param {number} offset
 * @return {org.jstype.GsubTable.LookupRecord.Delegate}
 * @private
 */
org.jstype.GsubTable.LookupRecord.getDelegate_ = function(data, offset, type) {
  if (type == 1) {
    var substFormat = org.jstype.read16(data, offset);
    if (substFormat == 1) {
      var delta = org.jstype.read16s(data, offset + 4);
      return new org.jstype.GsubTable.LookupRecord.SingleSubstitute1(delta);
    } else if (substFormat == 2) {
      var glyphCount = org.jstype.read16(data, offset + 4);
      return new org.jstype.GsubTable.LookupRecord.SingleSubstitute2(
          org.jstype.readArray16(data, offset + 6, glyphCount));
    } 
  }
  return null;
};

/**
 * @param {Uint8Array} data
 * @param {number} offset
 * @param {number} count
 * @param {number} type
 * @return {Object.<number,number>}
 * @private
 */
org.jstype.GsubTable.LookupRecord.readSubtables_ = function(data,
                                                            offset,
                                                            count,
                                                            type) {
  var subtables = {};
  if (type != 1) {
    return subtables;
  }
  var recordOffset = offset + 6;
  for (var i = 0; i < count; ++i) {
    var tableOffset = offset + org.jstype.read16(data, recordOffset);
    recordOffset += 2;

    // Read this sub-table and create a delegate that substitutes glyphs IDs.
    var delegate =
        org.jstype.GsubTable.LookupRecord.getDelegate_(data, tableOffset, type);

    // Read the coverage table and create a mapping from a glyph to its
    // alternative.
    var coverageOffset = tableOffset + org.jstype.read16(data, tableOffset + 2);
    var coverageFormat = org.jstype.read16(data, coverageOffset);
    var coverageCount = org.jstype.read16(data, coverageOffset + 2);
    coverageOffset += 4;
    if (coverageFormat == 1) {
      for (var index = 0; index < coverageCount; ++index) {
        var glyphId = org.jstype.read16(data, coverageOffset);
        coverageOffset += 2;
        subtables[glyphId] = delegate.substitute(glyphId, index);
      }
    } else if (coverageFormat == 2) {
      for (var index = 0; index < coverageCount; ++index) {
        var startGlyphId = org.jstype.read16(data, coverageOffset);
        var endGlyphId = org.jstype.read16(data, coverageOffset + 2);
        coverageOffset += 6;
        for (var glyphId = startGlyphId; glyphId <= endGlyphId; ++glyphId) {
          subtables[glyphId] = delegate.substitute(glyphId, index);
        }
      }
    }
  }
  return subtables;
};

/**
 * A class encapsulating a bitmap used for writing font glyphs.
 * @param {Uint8Array} data
 * @param {number} width
 * @param {number} height
 * @constructor
 */
org.jstype.Bitmap = function(data, width, height) {
  /**
   * @type {Uint8Array}
   * @private
   */
  this.data_ = data;

  /**
   * @const {number}
   * @private
   */
  this.lineSize_ = width >> 3;

  /**
   * @const {number}
   * @private
   */
  this.width_ = width;

  /**
   * @const {number}
   * @private
   */
  this.height_ = height;
};

/**
 * Fills bits of a horizontal scan.
 * @param {number} y
 * @param {number} xMin
 * @param {number} xMax
 */
org.jstype.Bitmap.prototype.fill = function(y, xMin, xMax) {
  xMin = org.jstype.round(xMin);
  xMax = org.jstype.round(xMax);
  if (xMin < 0) {
    xMin = 0;
  }
  if (xMax > this.width_) {
    xMax = this.width_;
  }
  var width = xMax - xMin;
  if (xMax < 0 || this.width_ <= xMin || width <= 0 ||
      y < 0 || this.height_ <= y) {
    return;
  }
  // Render only the edge of this scan for debugging scans.
  if (org.jstype.DEBUG && !org.jstype.FILL_GLYPH) {
    var minOffset = y * this.lineSize_ + (xMin >> 3);
    this.data_[minOffset] |= 1 << (7 - (xMin & 7));
    var maxOffset = y * this.lineSize_ + (xMax >> 3);
    this.data_[maxOffset] |= 1 << (7 - (xMax & 7));
    return;
  }
  var offset = y * this.lineSize_ + (xMin >> 3);
  var bits = 8 - (xMin & 7);
  var mask = (1 << bits) - 1;
  while (width >= bits) {
    this.data_[offset] |= mask;
    ++offset;
    width -= bits;
    bits = 8;
    mask = 0xff;
  }
  if (width > 0) {
    bits -= width;
    mask ^= (1 << bits) - 1;
    this.data_[offset] |= mask;
  }
};

/**
 * Returns the string representation of this bitmap.
 * @return {string}
 */
org.jstype.Bitmap.prototype.getString = function() {
  var text = '';
  var offset = 0;
  for (var y = 0; y < this.height_; ++y) {
    for (var x = 0; x < this.width_; ++x) {
      var bit = 7 - (offset & 7);
      text += (((this.data_[offset >> 3] >> bit) & 1) == 0) ? '0' : '1';
      ++offset;
    }
    offset = (offset + 7) & ~7;
    text += ' ' + y + '\n';
  }
  return text;
};

/**
 * A class that serializes a stream of data to a base64 string.
 * @param {string} prefix
 * @constructor
 */
org.jstype.BitmapWriter = function(prefix) {
  /**
   * The base64 string serialized already.
   * @type {string}
   * @private
   */
  this.text_ = prefix;

  /**
   * The data cached by this object.
   * @type {number}
   * @private
   */
  this.data_ = 0;

  /**
   * The number of bits cached by this object.
   * @type {number}
   * @private
   */
  this.bits_ = 0;
};

/**
 * @const {Array.<string>}
 * @private
 */
org.jstype.BitmapWriter.BASE64_ = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
  'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
  'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
  'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
  'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
  'w', 'x', 'y', 'z', '0', '1', '2', '3',
  '4', '5', '6', '7', '8', '9', '+', '/'
];

/**
 * Writes one byte to the output stream. This function copies the input byte to
 * a cache and writes four base64 characters when the cache has 24 bits of data.
 * @param {number} data
 * @private
 */
org.jstype.BitmapWriter.prototype.writeText_ = function(data) {
  this.text_ += org.jstype.BitmapWriter.BASE64_[(data >> 18) & 0x3f];
  this.text_ += org.jstype.BitmapWriter.BASE64_[(data >> 12) & 0x3f];
  this.text_ += org.jstype.BitmapWriter.BASE64_[(data >> 6) & 0x3f];
  this.text_ += org.jstype.BitmapWriter.BASE64_[data & 0x3f];
};

/**
 * Writes one byte to the output stream. This function copies the input byte to
 * a cache and writes four base64 characters when the cache has 24 bits of data.
 * @param {number} n
 */
org.jstype.BitmapWriter.prototype.write = function(n) {
  this.data_ <<= 8;
  this.data_ |= n;  // n & 0xff;
  this.bits_ += 8;
  if (this.bits_ == 24) {
    this.writeText_(this.data_);
    this.bits_ = 0;
    this.data_ = 0;
  }
};

/**
 * Writes an array of data. This function is designed for writing many bytes of
 * data at once.
 * @param {Uint8Array} data
 * @param {number} offset
 * @param {number} length
 */
org.jstype.BitmapWriter.prototype.writeArray = function(data, offset, length) {
  if (length < 2) {
    this.write(data[offset]);
    return;
  }
  // This data is sufficiently huge to serialize it directly to the output
  // stream without using a cache, i.e. this code:
  // 1. Flushes the cache with this data;
  // 2. Serializes the data to the output stream for every three bytes, and;
  // 3. Resets up the cache.
  if (this.bits_ == 8) {
    this.writeText_(
        (this.data_ << 16) | (data[offset] << 8) | data[offset + 1]);
    offset += 2;
    length -= 2;
  } else if (this.bits_ == 16) {
    this.writeText_((this.data_ << 8) | data[offset]);
    ++offset;
    --length;
  }
  while (length >= 3) {
    this.writeText_(
        (data[offset] << 16) | (data[offset + 1] << 8) | data[offset + 2]);
    offset += 3;
    length -= 3;
  }
  if (length == 1) {
    this.data_ = data[offset];
    this.bits_ = 8;
  } else if (length == 2) {
    this.data_ = (data[offset] << 8) | data[offset + 1];
    this.bits_ = 16;
  } else {
    this.data_ = 0;
    this.bits_ = 0;
  }
};

/**
 * Closes this output stream. This function writes remaining bits as base64
 * characters.
 * @return {string}
 */
org.jstype.BitmapWriter.prototype.close = function() {
  if (this.bits_ == 8) {
    this.data_ <<= 16;
    this.text_ += org.jstype.BitmapWriter.BASE64_[(this.data_ >> 18) & 0x3f];
    this.text_ += org.jstype.BitmapWriter.BASE64_[(this.data_ >> 12) & 0x3f];
    this.text_ += '==';
  } else if (this.bits_ == 16) {
    this.data_ <<= 8;
    this.text_ += org.jstype.BitmapWriter.BASE64_[(this.data_ >> 18) & 0x3f];
    this.text_ += org.jstype.BitmapWriter.BASE64_[(this.data_ >> 12) & 0x3f];
    this.text_ += org.jstype.BitmapWriter.BASE64_[(this.data_ >> 6) & 0x3f];
    this.text_ += '=';
  }
  return this.text_;
};

/**
 * A class representing a point of a font glyph.
 * @param {number} flag
 * @param {number} x
 * @param {number} y
 * @constructor
 */
org.jstype.GlyphPoint = function(flag, x, y) {
  /** @const {number} */ var ON_CURVE = 0x01;

  /**
   * @const {number}
   */
  this.onCurve = flag & ON_CURVE;

  /**
   * @const {number}
   */
  this.x = x;

  /**
   * @const {number}
   */
  this.y = y;
};

/**
 * A class representing a point on a quadratic Bezier path.
 * @param {Array.<org.jstype.GlyphPoint>} path
 * @param {number} n
 * @param {number} t
 * @constructor
 */
org.jstype.QuadraticBezierPoint = function(path, n, t) {
  /**
   * @const {number}
   */
  this.t = t;

  /**
   * @const {number}
   */
  this.x = org.jstype.QuadraticBezierPoint.calculate_(
      path[n].x, path[n + 1].x, path[n + 2].x, t);

  /**
   * @const {number}
   */
  this.y = org.jstype.QuadraticBezierPoint.calculate_(
      path[n].y, path[n + 1].y, path[n + 2].y, t);
};

/**
 * Calculates a coordinate on a quadratic Bezier path.
 * @param {number} n0
 * @param {number} n1
 * @param {number} n2
 * @param {number} t
 * @return {number}
 * @private
 */
org.jstype.QuadraticBezierPoint.calculate_ = function(n0, n1, n2, t) {
  var t_ = 1 - t;
  return t_ * t_ * n0 + 2 * t_ * t * n1 + t * t * n2;
};

/**
 * A class representing a point on a cubic Bezier path.
 * @param {Array.<org.jstype.GlyphPoint>} path
 * @param {number} n
 * @param {number} t
 * @constructor
 */
org.jstype.CubicBezierPoint = function(path, n, t) {
  /**
   * @const {number}
   */
  this.t = t;

  /**
   * @const {number}
   */
  this.x = org.jstype.CubicBezierPoint.calculate_(
      path[n].x, path[n + 1].x, path[n + 2].x, path[n + 3].x, t);

  /**
   * @const {number}
   */
  this.y = org.jstype.CubicBezierPoint.calculate_(
      path[n].y, path[n + 1].y, path[n + 2].y, path[n + 3].y, t);
};

/**
 * Calculates a coordinate on a cubic Bezier path.
 * @param {number} n0
 * @param {number} n1
 * @param {number} n2
 * @param {number} n3
 * @param {number} t
 * @return {number}
 * @private
 */
org.jstype.CubicBezierPoint.calculate_ = function(n0, n1, n2, n3, t) {
  var t_ = 1 - t;
  var t2_ = t_ * t_;
  var t2 = t * t;
  return t2_ * t_ * n0 + 3 * t2_ * t * n1 + 3 * t_ * t2 * n2 + t2 * t * n3;
};

/**
 * A class representing a point on a fourth-order Bezier path.
 * @param {Array.<org.jstype.GlyphPoint>} path
 * @param {number} n
 * @param {number} t
 * @constructor
 * @deprecated
 */
org.jstype.FourthBezierPoint = function(path, n, t) {
  /**
   * @const {number}
   */
  this.t = t;

  /**
   * @const {number}
   */
  this.x = org.jstype.FourthBezierPoint.calculate_(
      path[n].x, path[n + 1].x, path[n + 2].x, path[n + 3].x, path[n + 4].x, t);

  /**
   * @const {number}
   */
  this.y = org.jstype.FourthBezierPoint.calculate_(
      path[n].y, path[n + 1].y, path[n + 2].y, path[n + 3].y, path[n + 4].y, t);
};

/**
 * Calculates a coordinate on a fourth-order Bezier path.
 * @param {number} n0
 * @param {number} n1
 * @param {number} n2
 * @param {number} n3
 * @param {number} n4
 * @param {number} t
 * @return {number}
 * @private
 */
org.jstype.FourthBezierPoint.calculate_ = function(n0, n1, n2, n3, n4, t) {
  var t_ = 1 - t;
  var t2_ = t_ * t_;
  var t2 = t * t;
  var tt_ = t * t_;
  return t2_ * t2_ * n0 + 4 * t2_ * tt_ * n1 + 6 * t2_ * t2 * n2 +
      4 * tt_ * t2 * n3 + t2 * t2 * n4;
};

/**
 * A class representing a list of scans rasterized from a font glyph. Each scan
 * includes intersections between a horizontal line 'y = k' and the paths of the
 * glyph.
 * @param {number} scale
 * @param {number} yMin
 * @param {number} yMax
 * @constructor
 */
org.jstype.Scan = function(scale, yMin, yMax) {
  /**
   * @const {number}
   */
  this.scale = scale;

  /**
   * @const {number}
   * @private
   */
  this.yMin_ = org.jstype.floor(scale * yMin);

  /**
   * @const {number}
   * @private
   */
  this.yMax_ = org.jstype.floor(scale * yMax);

  /**
   * @type {Array.<Array.<number>>}
   * @private
   */
  this.scan_ = [];
  for (var y = this.yMin_; y <= this.yMax_; ++y) {
    this.scan_.push([]);
  }

  /**
   * @type {boolean}
   * @private
   */
  this.dirty_ = false;
};

/**
 * A distance to stop recursive calls.
 * @const {number}
 * @private
 */
org.jstype.Scan.EPSILON_ = 2.0;

/**
 * Defines a sort order of x coordinates in a scan. This function sorts the x
 * coordinates in the ascending order.
 * @param {number} a
 * @param {number} b
 * @return {number}
 * @private
 */
org.jstype.Scan.sort_ = function(a, b) {
  return a - b;
};

/**
 * Draws a line.
 * @param {number} x0
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 * @private
 */
org.jstype.Scan.prototype.drawLine_ = function(x0, y0, x1, y1) {
  if (y0 == y1) {
    return;
  }
  if (y0 > y1) {
    var y2 = y0;
    y0 = y1;
    y1 = y2;
    var x2 = x0;
    x0 = x1;
    x1 = x2;
  }
  var angle = (x1 - x0) / (y1 - y0);
  var yMin = org.jstype.floor(y0);
  var yMax = org.jstype.floor(y1);
  for (var y = yMin; y < yMax; ++y) {
    var x = x0 + angle * (y - yMin);
    this.scan_[y - this.yMin_].push(x);
  }
};

/**
 * Draws a quadratic Bezier curve.
 * @param {Array.<org.jstype.GlyphPoint>} path
 * @param {number} index
 * @param {org.jstype.QuadraticBezierPoint} p0
 * @param {org.jstype.QuadraticBezierPoint} p1
 * @private
 */
org.jstype.Scan.prototype.drawQuadraticBezier_ = function(path, index, p0, p1) {
  var dx = p0.x >= p1.x ? p0.x - p1.x : p1.x - p0.x;
  if (org.jstype.Scan.EPSILON_ < dx) {
    if (org.jstype.floor(p0.y) == org.jstype.floor(p1.y)) {
      return;
    }
    var p = new org.jstype.QuadraticBezierPoint(path,
                                                index,
                                                (p0.t + p1.t) * 0.5);
    this.drawQuadraticBezier_(path, index, p0, p);
    this.drawQuadraticBezier_(path, index, p, p1);
    return;
  }
  this.drawLine_(p0.x, p0.y, p1.x, p1.y);
};

/**
 * Draws a cubic Bezier curve.
 * @param {Array.<org.jstype.GlyphPoint>} path
 * @param {number} index
 * @param {org.jstype.CubicBezierPoint} p0
 * @param {org.jstype.CubicBezierPoint} p1
 * @private
 */
org.jstype.Scan.prototype.drawCubicBezier_ = function(path, index, p0, p1) {
  var dx = p0.x >= p1.x ? p0.x - p1.x : p1.x - p0.x;
  if (org.jstype.Scan.EPSILON_ < dx) {
    if (org.jstype.floor(p0.y) == org.jstype.floor(p1.y)) {
      return;
    }
    var p = new org.jstype.CubicBezierPoint(path, index, (p0.t + p1.t) * 0.5);
    this.drawCubicBezier_(path, index, p0, p);
    this.drawCubicBezier_(path, index, p, p1);
    return;
  }
  this.drawLine_(p0.x, p0.y, p1.x, p1.y);
};

/**
 * Draws a fourth-order Bezier curve.
 * @param {Array.<org.jstype.GlyphPoint>} path
 * @param {number} index
 * @param {org.jstype.FourthBezierPoint} p0
 * @param {org.jstype.FourthBezierPoint} p1
 * @private
 */
org.jstype.Scan.prototype.drawFourthBezier_ = function(path, index, p0, p1) {
  var dx = p0.x >= p1.x ? p0.x - p1.x : p1.x - p0.x;
  if (org.jstype.Scan.EPSILON_ < dx) {
    if (org.jstype.floor(p0.y) == org.jstype.floor(p1.y)) {
      return;
    }
    var p = new org.jstype.FourthBezierPoint(path, index, (p0.t + p1.t) * 0.5);
    this.drawFourthBezier_(path, index, p0, p);
    this.drawFourthBezier_(path, index, p, p1);
    return;
  }
  this.drawLine_(p0.x, p0.y, p1.x, p1.y);
};

/**
 * Draws a line (or a Bezier curve) covered by the specified path.
 * @param {Array.<org.jstype.GlyphPoint>} path
 */
org.jstype.Scan.prototype.draw = function(path) {
  // This function can draw a line or Bezier curves up to fourth-order ones.
  this.dirty_ = true;
  var index = 0;
  var length = path.length;
  while (length >= 4) {
    var p0 = new org.jstype.CubicBezierPoint(path, index, 0);
    var p1 = new org.jstype.CubicBezierPoint(path, index, 0.25);
    var p2 = new org.jstype.CubicBezierPoint(path, index, 0.75);
    var p3 = new org.jstype.CubicBezierPoint(path, index, 1);
    this.drawCubicBezier_(path, index, p0, p1);
    this.drawCubicBezier_(path, index, p1, p2);
    this.drawCubicBezier_(path, index, p2, p3);
    index += 3;
    length -= 3;
  }
  if (length == 2) {
    this.drawLine_(
        path[index].x, path[index].y, path[index + 1].x, path[index + 1].y);
  } else if (length == 3) {
    var p0 = new org.jstype.QuadraticBezierPoint(path, index, 0);
    var p1 = new org.jstype.QuadraticBezierPoint(path, index, 0.5);
    var p2 = new org.jstype.QuadraticBezierPoint(path, index, 1);
    this.drawQuadraticBezier_(path, index, p0, p1);
    this.drawQuadraticBezier_(path, index, p1, p2);
  }
};

/**
 * Writes this scan to the specified bitmap.
 * @param {org.jstype.Bitmap} bitmap
 * @param {number} x
 * @param {number} y
 */
org.jstype.Scan.prototype.writeBitmap = function(bitmap, x, y) {
  var length = this.scan_.length;
  if (this.dirty_) {
    for (var i = 0; i < length; ++i) {
      if (this.scan_[i].length > 0) {
        this.scan_[i].sort(org.jstype.Scan.sort_);
      }
    }
    this.dirty_ = false;
  }
  y += this.yMin_;
  for (var i = 0; i < length; ++i, ++y) {
    var scan = this.scan_[i];
    var points = scan.length;
    for (var j = 0; j < points; j += 2) {
      bitmap.fill(y, x + scan[j], x + scan[j + 1]);
    }
  }
};

/**
 * An interface that provides functions that render a font glyph and return its
 * metrics.
 * @interface
 */
org.jstype.GlyphModel = function() {
};

/**
 * Draws a glyph.
 * @param {number} scale
 * @param {org.jstype.Bitmap} bitmap
 * @param {number} x
 * @param {number} y
 * @param {number} frame
 * @return {number}
 */
org.jstype.GlyphModel.prototype.draw = function(scale, bitmap, x, y, frame) {
};

/**
 * Returns the horizontal advance of this glyph.
 * @return {number}
 */
org.jstype.GlyphModel.prototype.getAdvance = function() {
};

/**
 * Returns the width of this glyph.
 * @return {number}
 */
org.jstype.GlyphModel.prototype.getWidth = function() {
};

/**
 * Returns the height of this glyph.
 * @return {number}
 */
org.jstype.GlyphModel.prototype.getHeight = function() {
};

/**
 * A class representing a font glyph of a space character. A space character
 * does not have contours and it needs special code.
 * @param {number} xMin
 * @param {number} yMin
 * @param {number} xMax
 * @param {number} yMax
 * @implements {org.jstype.GlyphModel}
 * @constructor
 */
org.jstype.SpaceGlyph = function(xMin, yMin, xMax, yMax) {
  /**
   * @const {number}
   * @private
   */
  this.width_ = xMax - xMin;

  /**
   * @const {number}
   * @private
   */
  this.height_ = yMax - yMin;

  /**
   * @const {number}
   * @private
   */
  this.xMin_ = xMin;

  /**
   * @const {number}
   * @private
   */
  this.yMin_ = yMin;

  /**
   * @const {number}
   * @private
   */
  this.xMax_ = xMax;

  /**
   * @const {number}
   * @private
   */
  this.yMax_ = yMax;
};

/** @override */
org.jstype.SpaceGlyph.prototype.draw = function(scale, bitmap, x, y, frame) {
  return this.xMax_ * scale;
};

/** @override */
org.jstype.SpaceGlyph.prototype.getAdvance = function() {
  return this.xMax_;
};

/** @override */
org.jstype.SpaceGlyph.prototype.getWidth = function() {
  return this.width_;
};

/** @override */
org.jstype.SpaceGlyph.prototype.getHeight = function() {
  return this.height_;
};

/**
 * A class representing a font glyph of an OpenType font, which consists of a
 * bounding box and a set of contours.
 * @param {number} code
 * @implements {org.jstype.GlyphModel}
 * @constructor
 */
org.jstype.Glyph = function(code) {
  /**
   * The character code associated with this glyph.
   * @const {number}
   */
  this.code = code;

  /**
   * @type {number}
   * @private
   */
  this.width_ = 0;

  /**
   * @type {number}
   * @private
   */
  this.height_ = 0;

  /**
   * @type {number}
   * @private
   */
  this.xMin_ = 0;

  /**
   * @type {number}
   * @private
   */
  this.yMin_ = 0;

  /**
   * @type {number}
   * @private
   */
  this.xMax_ = 0;

  /**
   * @type {number}
   * @private
   */
  this.yMax_ = 0;

  /**
   * @type {Array.<Array.<org.jstype.GlyphPoint>>}
   * @private
   */
  this.contours_ = [];

  /**
   * @type {number}
   * @private
   */
  this.frame_ = 0;

  /**
   * @type {org.jstype.Scan}
   * @private
   */
  this.scan_ = null;
};

/**
 * Loads a composite glyph, which consists of child glyphs. This function loads
 * child glyphs and appends their contours to this object.
 * @param {Uint8Array} data
 * @param {number} offset
 * @param {number} dx
 * @param {number} dy
 * @param {org.jstype.CodeMap} cmap
 * @return {boolean}
 * @private
 */
org.jstype.Glyph.prototype.loadCompositeGlyph_ = function(data,
                                                          offset,
                                                          dx,
                                                          dy,
                                                          cmap) {
  var childOffset = offset + 10;
  do {
    /** @const {number} */ var ARGS_1_AND_2_ARE_WORDS = 1;
    /** @const {number} */ var ARGS_ARE_XY_VALUES = 2;
    /** @const {number} */ var ROUND_XY_TO_GRID = 4;
    /** @const {number} */ var MORE_COMPONENTS = 32;
    var flag = org.jstype.read16(data, childOffset);
    var glyphId = org.jstype.read16(data, childOffset + 2);
    var x = 0;
    var y = 0;
    if (flag & ARGS_1_AND_2_ARE_WORDS) {
      x = org.jstype.read16(data, childOffset + 4);
      y = org.jstype.read16(data, childOffset + 6);
      childOffset += 8;
    } else {
      x = data[childOffset + 4];
      y = data[childOffset + 5];
      childOffset += 6;
    }
    var glyphOffset = cmap.getGlyphOffset(glyphId);
    if (!glyphOffset ||
        !this.loadGlyph(data, glyphOffset, x + dx, y + dy, cmap)) {
      return false;
    }
  } while (flag & MORE_COMPONENTS);

  // Reload the metric values of this glyph, which have been overwritten while
  // loading child glyphs.
  this.xMin_ = org.jstype.read16s(data, offset + 2);
  this.yMin_ = org.jstype.read16s(data, offset + 4);
  this.xMax_ = org.jstype.read16s(data, offset + 6);
  this.yMax_ = org.jstype.read16s(data, offset + 8);
  this.width_ = this.xMax_ - this.xMin_;
  this.height_ = this.yMax_ - this.yMin_;
  return true;
};

/**
 * Loads the outline of a glyph. This function reads the glyph data from the
 * specified location and creates its outline.
 * @param {Uint8Array} data
 * @param {number} offset
 * @param {number} dx
 * @param {number} dy
 * @param {org.jstype.CodeMap} cmap
 * @return {boolean}
 */
org.jstype.Glyph.prototype.loadGlyph = function(data, offset, dx, dy, cmap) {
  var numberOfCoutours = org.jstype.read16s(data, offset);
  if (numberOfCoutours < 0) {
    return this.loadCompositeGlyph_(data, offset, dx, dy, cmap);
  }
  this.xMin_ = org.jstype.read16s(data, offset + 2);
  this.yMin_ = org.jstype.read16s(data, offset + 4);
  this.xMax_ = org.jstype.read16s(data, offset + 6);
  this.yMax_ = org.jstype.read16s(data, offset + 8);
  this.width_ = this.xMax_ - this.xMin_;
  this.height_ = this.yMax_ - this.yMin_;
  offset += 10;

  var endPointsOfContour = [];
  var endPoint = 0;
  for (var i = 0; i < numberOfCoutours; ++i) {
    endPoint = org.jstype.read16(data, offset);
    endPointsOfContour.push(endPoint);
    offset += 2;
  }
  var instructionLength = org.jstype.read16(data, offset);
  offset += 2 + instructionLength;

  var flags = [];
  var repeat = 0;
  var flag = 0;
  for (var i = 0; i <= endPoint; ++i) {
    if (--repeat < 0) {
      /** @const {number} */ var REPEAT = 0x08;
      flag = data[offset];
      ++offset;
      if (flag & REPEAT) {
        repeat = data[offset];
        ++offset;
      }
    }
    flags.push(flag);
  }

  var xCoordinates = [];
  var x = 0;
  for (var i = 0; i <= endPoint; ++i) {
    /** @const {number} */ var X_SHORT = 0x02;
    /** @const {number} */ var X_POSITIVE = 0x10;
    var xFlag = flags[i] & (X_SHORT | X_POSITIVE);
    if (xFlag == (X_SHORT | X_POSITIVE)) {
      x += data[offset];
      ++offset;
    } else if (xFlag == X_SHORT) {
      x -= data[offset];
      ++offset;
    } else if (xFlag == 0) {
      x += org.jstype.read16s(data, offset);
      offset += 2;
    } else {
      // this point is the same as the previous one.
    }
    xCoordinates.push(x);
  }

  var yCoordinates = [];
  var y = 0;
  for (var i = 0; i <= endPoint; ++i) {
    /** @const {number} */ var Y_SHORT = 0x04;
    /** @const {number} */ var Y_POSITIVE = 0x20;
    var yFlag = flags[i] & (Y_SHORT | Y_POSITIVE);
    if (yFlag == (Y_SHORT | Y_POSITIVE)) {
      y += data[offset];
      ++offset;
    } else if (yFlag == Y_SHORT) {
      y -= data[offset];
      ++offset;
    } else if (yFlag == 0) {
      y += org.jstype.read16s(data, offset);
      offset += 2;
    } else {
      // this point is the same as the previous one.
    }
    yCoordinates.push(y);
  }

  var index = 0;
  for (var i = 0; i < numberOfCoutours; ++i) {
    var contour = [];
    while (index <= endPointsOfContour[i]) {
      contour.push(new org.jstype.GlyphPoint(flags[index],
                                             dx + xCoordinates[index],
                                             dy + yCoordinates[index]));
      ++index;
    }
    this.contours_.push(contour);
  }
  return true;
};

/** @override */
org.jstype.Glyph.prototype.draw = function(scale, bitmap, x, y, frame) {
  // Rasterizing contours and create a list of scans. (Each scan must consist of
  // an even number of points because these contours is closed regions.)
  if (!this.scan_ || this.scan_.scale != scale) {
    var scan = new org.jstype.Scan(scale, this.yMin_, this.yMax_);
    var length = this.contours_.length;
    for (var i = 0; i < length; ++i) {
      var contour = this.contours_[i];
      var pointsOfContour = contour.length;
      var startPoint = new org.jstype.GlyphPoint(0,
                                                 contour[0].x * scale,
                                                 contour[0].y * scale);
      var points = [startPoint];
      for (var j = 1; j < pointsOfContour; ++j) {
        var point = new org.jstype.GlyphPoint(0,
                                              contour[j].x * scale,
                                              contour[j].y * scale);
        points.push(point);
        if (contour[j].onCurve) {
          scan.draw(points);
          points = [point];
        }
      }
      if (points.length > 0) {
        points.push(startPoint);
        scan.draw(points);
      }
    }
    this.scan_ = scan;
  }
  this.scan_.writeBitmap(bitmap, x, org.jstype.round(y));
  this.frame_ = frame;
  return this.xMax_ * scale;
};

/** @override */
org.jstype.Glyph.prototype.getAdvance = function() {
  return this.xMax_;
};

/** @override */
org.jstype.Glyph.prototype.getWidth = function() {
  return this.width_;
};

/** @override */
org.jstype.Glyph.prototype.getHeight = function() {
  return this.height_;
};

/**
 * Defines the sort order of glyph objects. This function is used for sorting
 * Glyph objects in the most-recently-used order.
 * @param {org.jstype.Glyph} a
 * @param {org.jstype.Glyph} b
 * @return {number}
 */
org.jstype.Glyph.sort = function(a, b) {
  return b.frame_ - a.frame_;
};

/**
 * A class used by the font renderer to iterate characters of the text. A
 * JavaScript String stores Unicode characters in the logical order. On the
 * other hand, this font renderer assumes characters are sorted in the visual
 * order. This function changes the character order of the input text so the
 * renderer can use it. This class also replaces Arabic characters to their
 * contextual forms and replaces ligatures with their presentation forms to
 * prevent the font renderer from substituting glyphs.
 * @param {string} text
 * @param {?org.jstype.CharacterIterator.CodeRewriter} rewriter
 * @constructor
 */
org.jstype.CharacterIterator = function(text, rewriter) {
  /**
   * Unicode code-points sorted in the visual order.
   * @const {Array.<number>}
   * @private
   */
  this.text_ = org.jstype.CharacterIterator.getVisualText_(text, rewriter);

  /**
   * The length of this visual text. This variable is for compatibility
   * with the String object of JavaScript.
   * @const {number}
   */
  this.length = this.text_.length;
};

/**
 * An interface that replaces a character to another.
 * @interface
 */
org.jstype.CharacterIterator.CodeRewriter = function() {
};

/**
 * Returns an alternative character.
 * @param {number} code
 * @return {number}
 */
org.jstype.CharacterIterator.CodeRewriter.prototype.getCode = function(code) {
};

/**
 * A class that replaces a character to a presentation character used by
 * vertical writing.
 * @implements {org.jstype.CharacterIterator.CodeRewriter}
 * @constructor
 */
org.jstype.CharacterIterator.VerticalCodeRewriter = function() {
  /**
   * @const {Object.<number,number>}
   * @private
   */
  this.codeMap_ = org.jstype.CharacterIterator.VerticalCodeRewriter.getMap_();
};

/**
 * Returns a mapping table from a character to its presentation character used
 * in vertical text.
 * @private
 */
org.jstype.CharacterIterator.VerticalCodeRewriter.getMap_ = function() {
  var codeMap = {};
  var length = org.jstype.JapaneseForms.VERT.length;
  for (var i = 0; i < length; i += 2) {
    codeMap[org.jstype.JapaneseForms.VERT[i + 1]] =
        org.jstype.JapaneseForms.VERT[i];
  }
  return codeMap;
};

/** @override */
org.jstype.CharacterIterator.VerticalCodeRewriter.prototype.getCode = function(
    code) {
  return this.codeMap_[code] || code;
};

/**
 * Retrieves a Latin ligature.
 * @param {number} prefix
 * @param {number} code
 * @return {number}
 * @private
 */
org.jstype.CharacterIterator.getLatinLigature_ = function(prefix, code) {
  if (prefix == 0x0066) {
    // LATIN SMALL LETTER F + LATIN SMALL LETTER F
    // -> LATIN SMALL LIGATURE FF
    if (code == 0x0066) {
      return 0xFB00;
    }
    // LATIN SMALL LETTER F + LATIN SMALL LETTER I
    // -> LATIN SMALL LIGATURE FI
    if (code == 0x0069) {
      return 0xFB01;
    }
    // LATIN SMALL LETTER F + LATIN SMALL LETTER L
    // -> LATIN SMALL LIGATURE FL
    if (code == 0x006C) {
      return 0xFB02;
    }
  } else if (prefix == 0xFB00) {
    // LATIN SMALL LIGATURE FF + LATIN SMALL LETTER I
    // -> LATIN SMALL LIGATURE FFI
    if (code == 0x0069) {
      return 0xFB03;
    }
    // LATIN SMALL LIGATURE FF + LATIN SMALL LETTER L
    // -> LATIN SMALL LIGATURE FFL
    if (code == 0x006C) {
      return 0xFB04;
    }
  }
  return 0;
};

/**
 * Creates the visual run of a Korean word.
 * @param {Array.<number>} word
 * @return {Array.<number>}
 * @private
 */
org.jstype.CharacterIterator.getLatinRun_ = function(word) {
  var length = word.length;
  var run = [];
  var prefix = 0;
  for (var i = 0; i < length; ++i) {
    var code = word[i];
    var ligature = org.jstype.CharacterIterator.getLatinLigature_(prefix, code);
    if (ligature) {
      run[i - 1] = ligature;
    } else {
      run.push(code);
    }
    prefix = code;
  }
  return run;
};

/**
 * Retrieves a Korean ligature.
 * @param {number} prefix
 * @param {number} code
 * @return {number}
 * @private
 */
org.jstype.CharacterIterator.getKoreanLigature_ = function(prefix, code) {
  // Compose a Hangul vowel and consonants to a Hangul character. A Hangul
  // character of Unicode is a ligature consisting of one Hangul vowel and
  // two Hangul consonants. Each Hangul character is composed with the following
  // formula:
  //   character =  0xAC00 +
  //                (first consonant - 0x1100) * 28 * 21 +
  //                (vowel           - 0x1161) * 28 +
  //                (last consonant  - 0x11A7);
  // The above formula is copied from Unicode Standard Annex #15
  // <http://unicode.org/reports/tr15>.
  var L_BASE = 0x1100;
  var V_BASE = 0x1161;
  var T_BASE = 0x11A7;
  var S_BASE = 0xAC00;
  var L_COUNT = 19;
  var V_COUNT = 21;
  var T_COUNT = 28;
  var S_COUNT = L_COUNT * V_COUNT * T_COUNT;
  if (L_BASE <= prefix && prefix < L_BASE + L_COUNT) {
    if (V_BASE <= code && code < V_BASE + V_COUNT) {
      return S_BASE + (prefix - L_BASE) * V_COUNT * T_COUNT +
          (code - V_BASE) * T_COUNT;
    }
  } else if (S_BASE <= prefix && prefix < S_BASE + S_COUNT) {
    if ((prefix % T_COUNT) == 0 && T_BASE <= code && code < T_BASE + T_COUNT) {
      return prefix + (code - T_BASE);
    }
  }
  return 0;
};

/**
 * Creates the visual run of a Korean word.
 * @param {Array.<number>} word
 * @return {Array.<number>}
 * @private
 */
org.jstype.CharacterIterator.getKoreanRun_ = function(word) {
  var length = word.length;
  var run = [];
  var prefix = 0;
  for (var i = 0; i < length; ++i) {
    var code = word[i];
    var ligature = org.jstype.CharacterIterator.getKoreanLigature_(prefix, code);
    if (ligature) {
      run[i - 1] = ligature;
    } else {
      run.push(code);
    }
    prefix = code;
  }
  return run;
};

/**
 * Retrieves an Arabic ligature.
 * @param {number} prefix
 * @param {number} code
 * @return {number}
 * @private
 */
org.jstype.CharacterIterator.getArabicLigature_ = function(prefix, code) {
  if (prefix == 0xFEDF) {
    // ARABIC LETTER LAM INITIAL FORM + ARABIC LETTER ALEF WITH MADDA ABOVE
    // -> ARABIC LIGATURE LAM WITH ALEF WITH MADDA ABOVE ISOLATED FORM
    if (code == 0x0622) {
      return 0xFEF5;
    }
    // ARABIC LETTER LAM INITIAL FORM + ARABIC LETTER ALEF WITH HAMZA ABOVE
    // -> ARABIC LIGATURE LAM WITH ALEF WITH HAMZA ABOVE ISOLATED FORM
    if (code == 0x0623) {
      return 0xFEF7;
    }
    // ARABIC LETTER LAM INITIAL FORM + ARABIC LETTER ALEF WITH HAMZA BELOW
    // -> ARABIC LIGATURE LAM WITH ALEF WITH HAMZA BELOW ISOLATED FORM
    if (code == 0x0625) {
      return 0xFEF9;
    }
    // ARABIC LETTER LAM INITIAL FORM + ARABIC LETTER ALEF
    // -> ARABIC LIGATURE LAM WITH ALEF ISOLATED FORM
    if (code == 0x0627) {
      return 0xFEFB;
    }
  } else if (prefix == 0xFEE0) {
    // ARABIC LETTER LAM MEDIAL FORM + ARABIC LETTER ALEF WITH MADDA ABOVE
    // -> ARABIC LIGATURE LAM WITH ALEF WITH MADDA ABOVE FINAL FORM
    if (code == 0x0622) {
      return 0xFEF6;
    }
    // ARABIC LETTER LAM MEDIAL FORM + ARABIC LETTER ALEF WITH HAMZA ABOVE
    // -> ARABIC LIGATURE LAM WITH ALEF WITH HAMZA ABOVE FINAL FORM
    if (code == 0x0623) {
      return 0xFEF8;
    }
    // ARABIC LETTER LAM MEDIAL FORM + ARABIC LETTER ALEF WITH HAMZA BELOW
    // -> ARABIC LIGATURE LAM WITH ALEF WITH HAMZA BELOW FINAL FORM
    if (code == 0x0625) {
      return 0xFEFA;
    }
    // ARABIC LETTER LAM MEDIAL FORM + ARABIC LETTER ALEF
    // -> ARABIC LIGATURE LAM WITH ALEF FINAL FORM
    if (code == 0x0627) {
      return 0xFEFC;
    }
  }
  return 0;
};

/**
 * Creates the visual run of an Arabic word.
 * @param {Array.<number>} word
 * @return {Array.<number>}
 * @private
 */
org.jstype.CharacterIterator.getArabicRun_ = function(word) {
  var length = word.length;
  if (length == 1) {
    word[0] = org.jstype.ArabicForms.ISOL[word[0] & 0xff];
    return word;
  }
  var run = [];
  var code = org.jstype.ArabicForms.INIT[word[0] & 0xff];
  var prefix = code;
  var ligature = 0;
  run.push(code);
  --length;
  for (var i = 1; i < length; ++i) {
    code = org.jstype.ArabicForms.MEDI[word[i] & 0xff];
    ligature = org.jstype.CharacterIterator.getArabicLigature_(prefix, code);
    if (ligature) {
      run[i - 1] = ligature;
    } else {
      run.push(code);
    }
    prefix = code;
  }
  code = org.jstype.ArabicForms.FINA[word[length] & 0xff];
  ligature = org.jstype.CharacterIterator.getArabicLigature_(prefix, code);
  if (ligature) {
    run[length - 1] = ligature;
  } else {
    run.push(code);
  }
  run.reverse();
  return run;
};

/**
 * Script codes used by the CharacterIterator object to create visual runs. The
 * CharacterIterator object splits text into text segments of the same script
 * code, and applies script-specific operations to the text segments, and
 * concatenates them. (A positive number shows this script is an LTR script, a
 * negative number shows this script is an RTL script, respectively.)
 * @enum {number}
 * @const
 */
org.jstype.CharacterIterator.Script = {
  KOREAN: 2,
  LATIN: 1,
  NEUTRAL: 0,
  ARABIC: -1,
  HEBREW: -2
};

/**
 * Returns the script code of the specified character.
 * @param {number} code
 * @private
 */
org.jstype.CharacterIterator.getScript_ = function(code) {
  if (code <= 0x002F) {
    return org.jstype.CharacterIterator.Script.NEUTRAL;
  } else if (code < 0x0590) {
    return org.jstype.CharacterIterator.Script.LATIN;
  } else if (0x0590 <= code && code <= 0x5FF) {
    return org.jstype.CharacterIterator.Script.HEBREW;
  } else if (0x0600 <= code && code <= 0x06ff) {
    return org.jstype.CharacterIterator.Script.ARABIC;
  } else if (0xfb1d <= code && code <= 0xfdfb) {
    return org.jstype.CharacterIterator.Script.ARABIC;
  } else if (0xfe70 <= code && code <= 0xfeff) {
    return org.jstype.CharacterIterator.Script.ARABIC;
  }
  return org.jstype.CharacterIterator.Script.LATIN;
};

/**
 * Creates a visual run from the specified word and returns it. A JavaScript
 * string stores Unicode characters in the logical order. On the other hand,
 * this font renderer assumes characters are sorted in the visual order. This
 * function changes the character order of the input text so the renderer can
 * use it.
 * @param {Array.<number>} word
 * @param {number} script
 * @return {Array.<number>}
 * @private
 */
org.jstype.CharacterIterator.createRun_ = function(word, script) {
  if (script >= org.jstype.CharacterIterator.Script.NEUTRAL) {
    return word;
  }
  var length = word.length;
  if (script == org.jstype.CharacterIterator.Script.HEBREW) {
    if (length > 1) {
      word.reverse();
    }
    return word;
  }
  return org.jstype.CharacterIterator.getArabicRun_(word);
};

/**
 * Creates the visual form of the specified text.
 * @param {string} text
 * @param {?org.jstype.CharacterIterator.CodeRewriter} rewriter
 * @return {Array.<number>}
 * @private
 */
org.jstype.CharacterIterator.getVisualText_ = function(text, rewriter) {
  var runs = [];
  var word = [];
  var script = org.jstype.CharacterIterator.Script.NEUTRAL;
  var lead = 0;
  var direction = 0;
  var length = text.length;
  for (var i = 0; i < length; ++i) {
    var code = text.charCodeAt(i);
    if (lead != 0) {
      code = 0x10000 | ((lead - 0xd800) << 10) | ((code - 0xdc00) & 0x3ff);
      lead = 0;
    }
    if (0xd800 <= code && code < 0xdc00) {
      lead = code;
    } else {
      if (rewriter) {
        code = rewriter.getCode(code);
      }
      var codeScript = org.jstype.CharacterIterator.getScript_(code);
      if (codeScript != script) {
        if (word.length > 0) {
          runs.push(org.jstype.CharacterIterator.createRun_(word, script));
          direction +=
              (script > org.jstype.CharacterIterator.Script.NEUTRAL) ? 1 : -1;
        }
        word = [];
      }
      word.push(code);
      script = codeScript;
    }
  }
  if (word.length > 0) {
    runs.push(org.jstype.CharacterIterator.createRun_(word, script));
    direction +=
        (script > org.jstype.CharacterIterator.Script.NEUTRAL) ? 1 : -1;
  }
  if (direction < 0) {
    runs.reverse();
  }
  var runLength = runs.length;
  for (var i = 1; i < runLength; ++i) {
    Array.prototype.push.apply(runs[0], runs[i]);
  }
  return runs[0];
};

/**
 * Returns the character code of the specified index.
 * @param {number} n
 * @return {number}
 */
org.jstype.CharacterIterator.prototype.charCodeAt = function(n) {
  return this.text_[n];
};

/**
 * @param {Uint8Array} data
 * @param {number} size
 * @param {number=} opt_glyphQuota
 * @constructor
 */
org.jstype.FontReader = function(data, size, opt_glyphQuota) {
  /**
   * @const {Uint8Array}
   * @private
   */
  this.data_ = data;

  /**
   * @const {number}
   * @private
   */
  this.size_ = size;

  /**
   * @type {boolean}
   * @private
   */
  this.isVertical_ = false;

  /**
   * @type {org.jstype.CharacterIterator.CodeRewriter}
   * @private
   */
  this.rewriter_ = null;

  /**
   * @type {number}
   * @private
   */
  this.fontAscender_ = 0;

  /**
   * @type {number}
   * @private
   */
  this.fontScale_ = 0;

  /**
   * @type {org.jstype.CodeMap}
   * @private
   */
  this.cmap_ = null;

  /**
   * @type {org.jstype.SpaceGlyph}
   * @private
   */
  this.spaceGlyph_ = null;

  /**
   * @type {Object.<number,org.jstype.Glyph>}
   * @private
   */
  this.glyphMap_ = {};

  /**
   * @const {number}
   * @private
   */
  this.glyphQuota_ = opt_glyphQuota || 1024;

  /**
   * @type {Array.<org.jstype.Glyph>}
   * @private
   */
  this.glyphList_ = [];

  /**
   * @type {number}
   * @private
   */
  this.glyphFrame_ = 0;

  /**
   * @type {org.jstype.GsubTable}
   * @private
   */
  this.gsub_ = null;
};

/**
 * Opens the specified font.
 * @param {number} id
 * @return {boolean}
 * @private
 */
org.jstype.FontReader.prototype.openFont_ = function(id) {
  if (this.cmap_) {
    return true;
  }
  // Reset internal variables.
  this.cmap_ = new org.jstype.CodeMap;
  this.glyphMap_ = {};
  this.glyphList_ = [];
  this.glyphFrame_ = 0;

  // Open the first font if this font is a TrueType collection, i.e. this given
  // data starts with a TTC tag.
  var offset = 0;
  var ttcTag = org.jstype.read32(this.data_, offset);
  if (ttcTag == 0x74746366) {
    var ttc = new org.jstype.CollectionHeader(this.data_, offset);
    if (ttc.offsetTable.length < id) {
      org.jstype.log('An invalid collection header');
      return false;
    }
    offset = ttc.offsetTable[id];
  }
  // Read TrueType headers required for creating a mapping table. Even though
  // the OpenType specification writes a font version should be 0x00010000, some
  // Mac fonts still use 0x74727565 ('true'). This code allows both as a
  // workaround for these fonts.
  var offsetTable = new org.jstype.OffsetTable(this.data_, offset);
  if (offsetTable.version != 0x00010000 && offsetTable.version != 0x74727565) {
    org.jstype.log('An invalid font header');
    return false;
  }
  /**
   * @type {Object.<string,org.jstype.TableRecord>}
   */
  var records = {};
  offset += 12;
  for (var i = 0; i < offsetTable.numTables; ++i) {
    var record = new org.jstype.TableRecord(this.data_, offset);
    records[record.tag] = record;
    offset += 16;
  }
  var head = new org.jstype.HeadTable(this.data_, records);
  this.fontScale_ = 1 / head.unitsPerEm;
  var maxp = new org.jstype.MaxpTable(this.data_, records);
  var loca = new org.jstype.LocaTable(this.data_,
                                      records,
                                      maxp.numGlyphs,
                                      head.indexToLocFormat);
  if (!this.cmap_.loadTable(this.data_, records, loca)) {
    return false;
  }
  var gsubRecord = records['GSUB'];
  if (gsubRecord) {
    this.gsub_ = new org.jstype.GsubTable(this.data_, gsubRecord, loca);
  }
  var hhea = new org.jstype.HheaTable(this.data_, records);
  this.fontAscender_ = hhea.ascender * this.fontScale_;
  var spaceId = this.cmap_.getGlyphId(0x0020);
  if (spaceId) {
    var hmtx = new org.jstype.HmtxTable(this.data_, records, hhea);
    this.spaceGlyph_ =
        new org.jstype.SpaceGlyph(0, 0, hmtx.metrics[spaceId].advanceWidth, 0);
  }
  return true;
};

/**
 * Loads alternative glyphs and tries reading a glyph for this code when this
 * font has a GSUB table. Return the glyph for a space character if this font
 * does not have a GSUB table or it does not have alternative glyphs.
 * @param {number} code
 * @return {number}
 * @private
 */
org.jstype.FontReader.prototype.getGlyphOffset_ = function(code) {
  var offset = this.cmap_.getCodeOffset(code);
  if (offset || !this.gsub_) {
    return offset;
  }
  if (0xFE10 <= code && code <= 0xFE44) {
    this.cmap_.setAlternativeCodes(this.data_,
                                   this.gsub_,
                                   org.jstype.JapaneseForms.VERT,
                                   'kana',
                                   '',
                                   'vert');
  }
  return this.cmap_.getCodeOffset(code);
};

/**
 * Retrieves a glyph for the character code. This function returns a cached
 * glyph if it has created the glyph for the specified code, otherwise it
 * creates a new glyph, adds the glyph to the cache, and returns the glyph.
 * @param {number} code
 * @return {org.jstype.GlyphModel}
 * @private
 */
org.jstype.FontReader.prototype.getGlyph_ = function(code) {
  var glyph = this.glyphMap_[code];
  if (!glyph) {
    var offset = this.getGlyphOffset_(code);
    if (!offset) {
      return this.spaceGlyph_;
    }
    glyph = new org.jstype.Glyph(code);
    if (!glyph.loadGlyph(this.data_, offset, 0, 0, this.cmap_)) {
      return this.spaceGlyph_;
    }
    var length = this.glyphList_.length;
    if (length >= this.glyphQuota_) {
      // Delete the half of the cached glyphs used less frequently if the number
      // of the cached glyphs exceeds the limit.
      length >>= 1;
      this.glyphList_.sort(org.jstype.Glyph.sort);
      this.glyphMap_ = {};
      for (var i = 0; i < length; ++i) {
        this.glyphMap_[this.glyphList_[i].code] = this.glyphList_[i];
      }
      this.glyphList_.splice(length, this.glyphList_.length - length);
    }
    this.glyphMap_[code] = glyph;
  }
  return glyph;
};

/**
 * Creates a Data URI representing a monochrome bitmap of the specified data.
 * @param {Uint8Array} data
 * @param {number} width
 * @param {number} height
 * @param {Array.<number>} colors
 * @return {string}
 * @private
 */
org.jstype.FontReader.getMonoBitmap_ = function(data, width, height, colors) {
  /**
   * A BITMAPFILEHEADER object and a BITMAPINFO object representing a monochrome
   * BMP file.
   * @type {Uint8Array}
   */
  var header = new Uint8Array([
    0x42, 0x4d,              // bfType
    0x00, 0x00, 0x00, 0x00,  // bfSize
    0x00, 0x00,              // bfReserved1
    0x00, 0x00,              // bfReserved2
    0x3e, 0x00, 0x00, 0x00,  // bfOffBits
    0x28, 0x00, 0x00, 0x00,  // bmiHeader.biSize
    0x00, 0x00, 0x00, 0x00,  // bmiHeader.biWidth
    0x00, 0x00, 0x00, 0x00,  // bmiHeader.biHeight
    0x01, 0x00,              // bmiHeader.biPlanes
    0x01, 0x00,              // bmiHeader.biBitCount
    0x00, 0x00, 0x00, 0x00,  // bmiHeader.biCompression
    0x00, 0x00, 0x00, 0x00,  // bmiHeader.biSizeImage
    0x00, 0x00, 0x00, 0x00,  // bmiHeader.biXPelsPerMeter
    0x00, 0x00, 0x00, 0x00,  // bmiHeader.biYPelsPerMeter
    0x00, 0x00, 0x00, 0x00,  // bmiHeader.biClrUsed
    0x00, 0x00, 0x00, 0x00,  // bmiHeader.biClrImportant
    0xff, 0xff, 0xff, 0x00,  // bmiColors[0]
    0x00, 0x00, 0x00, 0x00   // bmiColors[1]
  ]);
  var HEADER_SIZE = 14 + 40 + 2 * 4;

  // Overwrite five variables (bfSize, biWidth, biHeight, biSizeImage) and a
  // palette colors bmiColors[] so the generated BMP file represents the input
  // image.
  var biWidth = width;
  var biHeight = height;
  var biSizeImage = ((biWidth + 7) >> 3) * biHeight;
  var bfSize = header.length + biSizeImage;
  header[2] = bfSize;
  header[3] = bfSize >> 8;
  header[4] = bfSize >> 16;
  header[5] = bfSize >> 24;
  header[18] = biWidth;
  header[19] = biWidth >> 8;
  header[22] = biHeight;
  header[23] = biHeight >> 8;
  header[34] = biSizeImage;
  header[35] = biSizeImage >> 8;
  header[36] = biSizeImage >> 16;
  header[37] = biSizeImage >> 24;
  var offset = 54;
  for (var i = 0; i < 2; ++i) {
    header[offset] = colors[i] >> 16;
    header[offset + 1] = colors[i] >> 8;
    header[offset + 2] = colors[i];
    offset += 4;
  }

  // Write the BMP header and the given data to the output stream.
  var uri = new org.jstype.BitmapWriter('data:image/bmp;base64,');
  uri.writeArray(header, 0, HEADER_SIZE);
  uri.writeArray(data, 0, data.length);
  return uri.close();
};

/**
 * Creates a Data URI representing a gray bitmap of the specified data. This
 * function packs 4 * 4 = 16 pixels and creates a 16-color bitmap.
 * @param {Uint8Array} data
 * @param {number} width
 * @param {number} height
 * @param {Array.<number>} colors
 * @return {string}
 * @private
 */
org.jstype.FontReader.getGrayBitmap_ = function(data, width, height, colors) {
  /**
   * A BITMAPFILEHEADER object and a BITMAPINFO object representing a 16-color
   * BMP file.
   * @type {Uint8Array}
   */
  var header = new Uint8Array([
    0x42, 0x4d,              // bfType
    0x00, 0x00, 0x00, 0x00,  // bfSize
    0x00, 0x00,              // bfReserved1
    0x00, 0x00,              // bfReserved2
    0x76, 0x00, 0x00, 0x00,  // bfOffBits
    0x28, 0x00, 0x00, 0x00,  // bmiHeader.biSize
    0x00, 0x00, 0x00, 0x00,  // bmiHeader.biWidth
    0x00, 0x00, 0x00, 0x00,  // bmiHeader.biHeight
    0x01, 0x00,              // bmiHeader.biPlanes
    0x04, 0x00,              // bmiHeader.biBitCount
    0x00, 0x00, 0x00, 0x00,  // bmiHeader.biCompression
    0x00, 0x00, 0x00, 0x00,  // bmiHeader.biSizeImage
    0x00, 0x00, 0x00, 0x00,  // bmiHeader.biXPelsPerMeter
    0x00, 0x00, 0x00, 0x00,  // bmiHeader.biYPelsPerMeter
    0x00, 0x00, 0x00, 0x00,  // bmiHeader.biClrUsed
    0x00, 0x00, 0x00, 0x00,  // bmiHeader.biClrImportant
    0xff, 0xff, 0xff, 0x00,  // bmiColor[0]
    0xee, 0xee, 0xee, 0x00,  // bmiColor[1]
    0xdd, 0xdd, 0xdd, 0x00,  // bmiColor[2]
    0xcc, 0xcc, 0xcc, 0x00,  // bmiColor[3]
    0xbb, 0xbb, 0xbb, 0x00,  // bmiColor[4]
    0xaa, 0xaa, 0xaa, 0x00,  // bmiColor[5]
    0x99, 0x99, 0x99, 0x00,  // bmiColor[6]
    0x88, 0x88, 0x88, 0x00,  // bmiColor[7]
    0x77, 0x77, 0x77, 0x00,  // bmiColor[8]
    0x66, 0x66, 0x66, 0x00,  // bmiColor[9]
    0x55, 0x55, 0x55, 0x00,  // bmiColor[10]
    0x44, 0x44, 0x44, 0x00,  // bmiColor[11]
    0x33, 0x33, 0x33, 0x00,  // bmiColor[12]
    0x22, 0x22, 0x22, 0x00,  // bmiColor[13]
    0x11, 0x11, 0x11, 0x00,  // bmiColor[14]
    0x00, 0x00, 0x00, 0x00   // bmiColor[15]
  ]);
  var HEADER_SIZE = 14 + 40 + 16 * 4;

  // Overwrite five variables (bfSize, biWidth, biHeight, biSizeImage) and a
  // palette colors bmiColors[] so the generated BMP file represents the input
  // image.
  var biWidth = width >> 2;
  var biHeight = height >> 2;
  var biSizeImage = (biWidth >> 1) * biHeight;
  var bfSize = header.length + biSizeImage;
  header[2] = bfSize;
  header[3] = bfSize >> 8;
  header[4] = bfSize >> 16;
  header[5] = bfSize >> 24;
  header[18] = biWidth;
  header[19] = biWidth >> 8;
  header[22] = biHeight;
  header[23] = biHeight >> 8;
  header[34] = biSizeImage;
  header[35] = biSizeImage >> 8;
  header[36] = biSizeImage >> 16;
  header[37] = biSizeImage >> 24;
  var offset = 54;
  for (var i = 0; i < 16; ++i) {
    header[offset] = colors[i] >> 16;
    header[offset + 1] = colors[i] >> 8;
    header[offset + 2] = colors[i];
    offset += 4;
  }

  // Write the BMP header and the given data to the output stream. (This code
  // assumes the given width is a multiple of eight.)
  var uri = new org.jstype.BitmapWriter('data:image/bmp;base64,');
  uri.writeArray(header, 0, HEADER_SIZE);
  var lineSize = width >> 3;
  for (var y = 0; y < height; y += 4) {
    var line0 = y * lineSize;
    var line1 = line0 + lineSize;
    var line2 = line1 + lineSize;
    var line3 = line2 + lineSize;
    for (var x = 0; x < width; x += 8) {
      /**
       * An array enumerating the counts of 1's for each number between 0 and 15.
       * @const {Array.<number>}
       */
      var COUNT = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];
      /**
       * An array enumerating palette indices, i.e. Math.round(i * 15 / 16).
       * @const {Array.<number>}
       */
      var COLOR = [0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10, 11, 12, 13, 14, 15];

      // Read 8 * 4 = 32 pixels, count the number of 1's, and write 2 pixels.
      var data0 = data[line0++];
      var data1 = data[line1++];
      var data2 = data[line2++];
      var data3 = data[line3++];
      var count0 = COUNT[data0 >> 4] + COUNT[data1 >> 4] +
          COUNT[data2 >> 4] + COUNT[data3 >> 4];
      var count1 = COUNT[data0 & 15] + COUNT[data1 & 15] +
          COUNT[data2 & 15] + COUNT[data3 & 15];
      uri.write((COLOR[count0] << 4) | COLOR[count1]);
    }
  }
  return uri.close();
};

/**
 * Measures the width of the specified text.
 * @param {string} text
 * @param {number} fontSize
 * @return {Array.<number>}
 */
org.jstype.FontReader.prototype.measure = function(text, fontSize) {
  if (!this.openFont_(0)) {
    return [];
  }
  var x = 0;
  var widths = [0];
  var length = text.length;
  for (var i = 0; i < length; ++i) {
    var glyph = this.getGlyph_(text.charCodeAt(i));
    var advance = glyph.getAdvance();
    x += advance;
    widths.push(x * fontSize * this.fontScale_);
  }
  return widths;
};

/**
 * Draws text to the given byte array.
 * @param {string} text
 * @param {number} fontSize
 * @param {Uint8Array} data
 * @param {number} width
 * @param {number} height
 * @return {number}
 */
org.jstype.FontReader.prototype.draw = function(text,
                                                fontSize,
                                                data,
                                                width,
                                                height) {
  if (!this.openFont_(0)) {
    return 0;
  }
  var run = new org.jstype.CharacterIterator(text, this.rewriter_);
  var length = run.length;
  var fontScale = fontSize * this.fontScale_;
  var bitmap = new org.jstype.Bitmap(data, width, height);
  if (this.isVertical_) {
    var x = width - fontSize;
    var y = height - fontSize * this.fontAscender_;
    for (var i = 0; i < length && x < width; ++i) {
      var glyph = this.getGlyph_(run.charCodeAt(i));
      glyph.draw(fontScale, bitmap, x, y, ++this.glyphFrame_);
      y -= fontSize;
    }
  } else {
    var x = 0;
    var y = height - fontSize * this.fontAscender_;
    for (var i = 0; i < length && x < width; ++i) {
      var glyph = this.getGlyph_(run.charCodeAt(i));
      var advance = glyph.draw(fontScale, bitmap, x, y, ++this.glyphFrame_);
      x += advance;
    }
  }
  org.jstype.log(bitmap.getString());
  return x;
};

/**
 * Creates a Data URI of the specified text.
 * @param {string} text
 * @param {number} fontSize
 * @param {number} width
 * @param {number} height
 * @param {Array.<number>=} opt_colors
 * @return {string}
 */
org.jstype.FontReader.prototype.getBitmap = function(text,
                                                     fontSize,
                                                     width,
                                                     height,
                                                     opt_colors) {
  var colors = opt_colors || [0xffffff, 0x000000];
  var depth = org.jstype.getDepth(colors.length);
  if (depth == 1) {
    width = (width + 31) & ~31;
  } else if (depth == 4) {
    width = ((width + 1) >> 1) << 3;
    height <<= 2;
    fontSize <<= 2;
  }
  var data = new Uint8Array((width >> 3) * height);
  if (this.draw(text, fontSize, data, width, height)) {
    if (depth == 1) {
      return org.jstype.FontReader.getMonoBitmap_(data, width, height, colors);
    } else if (depth == 4) {
      return org.jstype.FontReader.getGrayBitmap_(data, width, height, colors);
    }
  }
  return '';
};

/**
 * Sets font-rendering options.
 * @param {boolean} isVertical
 */
org.jstype.FontReader.prototype.setOptions = function(isVertical) {
  this.isVertical_ = isVertical;
  if (isVertical) {
    this.rewriter_ = new org.jstype.CharacterIterator.VerticalCodeRewriter();
  } else {
    this.rewriter_ = null;
  }
};

// Export the org.jstype.FontReader class and its public methods.
org.jstype.exportObject(
    'org.jstype.FontReader',
    org.jstype.FontReader,
    {
      'setOptions': org.jstype.FontReader.prototype.setOptions,
      'draw': org.jstype.FontReader.prototype.draw,
      'getBitmap': org.jstype.FontReader.prototype.getBitmap,
      'measure': org.jstype.FontReader.prototype.measure
    }
);
