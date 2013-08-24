// Copyright 2013 Hironori Bono. All Rights Reserved.
// @author {Hironori Bono}

// Create a namespace 'org.jstype' used in this file.
var org = org || {};
org.jstype = org.jstype || {};

/**
 * Whether this file is compiled by the closure compiler.
 * @define {boolean}
 */
org.jstype.COMPILED = false;

/**
 * @define {boolean}
 */
org.jstype.DEBUG = false;

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
 * Rounds down to an integer.
 * @param {number} n
 * @return {number}
 */
org.jstype.floor = function(n) {
  return n | 0;
};

/**
 * Rounds to the nearest integer.
 * @param {number} n
 * @return {number}
 */
org.jstype.round = function(n) {
  return org.jstype.floor(n + 0.5);
};

/**
 * Returns the depth of the colors.
 * @param {number} n
 * @return {number}
 */
org.jstype.getDepth = function (n) {
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
 * A class representing an offset Table.
 * @param {Uint8Array} data
 * @constructor
 */
org.jstype.OffsetTable = function(data) {
  /**
   * @const {number}
   */
  this.version = org.jstype.read32(data, 0);

  /**
   * @const {number}
   */
  this.numTables = org.jstype.read16(data, 4);

  /**
   * @const {number}
   */
  this.searchRange = org.jstype.read16(data, 6);

  /**
   * @const {number}
   */
  this.entrySelector = org.jstype.read16(data, 8);

  /**
   * @const {number}
   */
  this.rangeShift = org.jstype.read16(data, 10);
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
 * A class representing a HEAD table.
 * @param {Uint8Array} data
 * @param {Object.<string, org.jstype.TableRecord>} records
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
 * A class representing a MAXP table.
 * @param {Uint8Array} data
 * @param {Object.<string, org.jstype.TableRecord>} records
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
 * A class representing a LOCA table.
 * @param {Uint8Array} data
 * @param {Object.<string, org.jstype.TableRecord>} records
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
   * @const {Array.<number>}
   */
  this.offsets = (format == 0) ?
      org.jstype.LocaTable.readShortOffsets_(data, offset, numGlyphs) :
      org.jstype.LocaTable.readLongOffsets_(data, offset, numGlyphs);
};

/**
 * Reads a list of short (16-bit) offsets.
 * @param {Uint8Array} data
 * @param {number} offset
 * @param {number} numGlyphs
 * @return {Array.<number>}
 * @private
 */
org.jstype.LocaTable.readShortOffsets_ = function(data, offset, numGlyphs) {
  var offsets = [];
  for (var i = 0; i <= numGlyphs; ++i) {
    offsets.push(org.jstype.read16(data, offset) << 1);
    offset += 2;
  }
  return offsets;
};


/**
 * Reads a list of long (32-bit) offsets.
 * @param {Uint8Array} data
 * @param {number} offset
 * @param {number} numGlyphs
 * @return {Array.<number>}
 * @private
 */
org.jstype.LocaTable.readLongOffsets_ = function(data, offset, numGlyphs) {
  var offsets = [];
  for (var i = 0; i <= numGlyphs; ++i) {
    offsets.push(org.jstype.read32(data, offset));
    offset += 4;
  }
  return offsets;
};

/**
 * A class representing a mapping table from a Unicode character to the offset
 * to a glyph.
 * @constructor
 */
org.jstype.CmapTable = function() {
  /**
   * A mapping table from a character code to an offset to its glyph.
   * @type {Array.<Array.<number>>}
   * @private
   */
  this.codeMap_ = org.jstype.CmapTable.createMap_(null);

  /**
   * A mapping table from a glyph ID to an offset to the glyph.
   * @type {Array.<Array.<number>>}
   * @private
   */
  this.glyphMap_ = org.jstype.CmapTable.createMap_(null);
};

/**
 * Creates a mapping table used in this object.
 * @param {?number} v
 * @return {Array.<?number>|Array.<Array.<number>>}
 * @private
 */
org.jstype.CmapTable.createMap_ = function(v) {
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
org.jstype.CmapTable.Format4 = function(data, offset) {
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
   * @const {Array.<number>}
   */
  this.endCount = org.jstype.CmapTable.Format4.readCodes_(data,
                                                          offset + 14,
                                                          segCount);
  offset += 14 + segCountX2;

  /**
   * @const {number}
   */
  this.resevedPad = org.jstype.read16(data, offset);

  /**
   * @const {Array.<number>}
   */
  this.startCount = org.jstype.CmapTable.Format4.readCodes_(data,
                                                            offset + 2,
                                                            segCount);
  offset += 2 + segCountX2;

  /**
   * @const {Array.<number>}
   */
  this.idDelta = org.jstype.CmapTable.Format4.readDeltas_(data,
                                                          offset,
                                                          segCount);
  offset += segCountX2;

  /**
   * @const {Array.<number>}
   */
  this.idRangeOffset = org.jstype.CmapTable.Format4.readRangeOffsets_(
      data,
      offset,
      segCount,
      offset + segCountX2);
  offset += segCountX2;

  /**
   * @const {Array.<number>}
   */
  this.glyphIdArray = org.jstype.CmapTable.Format4.readCodes_(data,
                                                              offset,
                                                              glyphCount);
};

/**
 * Reads a list of character codes.
 * @param {Uint8Array} data
 * @param {number} offset
 * @param {number} count
 * @return {Array.<number>}
 * @private
 */
org.jstype.CmapTable.Format4.readCodes_ = function(data, offset, count) {
  var codes = [];
  for (var i = 0; i < count; ++i) {
    codes.push(org.jstype.read16(data, offset));
    offset += 2;
  }
  return codes;
};

/**
 * Reads a list of delta offsets.
 * @param {Uint8Array} data
 * @param {number} offset
 * @param {number} count
 * @return {Array.<number>}
 * @private
 */
org.jstype.CmapTable.Format4.readDeltas_ = function(data, offset, count) {
  var codes = [];
  for (var i = 0; i < count; ++i) {
    codes.push(org.jstype.read16s(data, offset));
    offset += 2;
  }
  return codes;
};

/**
 * Reads a list of offsets to an array of glyph IDs.
 * @param {Uint8Array} data
 * @param {number} offset
 * @param {number} count
 * @param {number} arrayOffset
 * @return {Array.<number>} offset
 * @private
 */
org.jstype.CmapTable.Format4.readRangeOffsets_ = function(data,
                                                          offset,
                                                          count,
                                                          arrayOffset) {
  var offsets = [];
  for (var i = 0; i < count; ++i) {
    var value = org.jstype.read16(data, offset);
    offsets.push(value == 0 ? 0 : (offset + value - arrayOffset) >> 1);
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
org.jstype.CmapTable.prototype.openFormat4_ = function(data,
                                                       records,
                                                       loca,
                                                       offset) {
  var table = new org.jstype.CmapTable.Format4(data, offset);
  if (table.format != 4) {
    return false;
  }
  var glyfOffset =  records['glyf'].tableOffset;
  for (var i = 0; i < table.segCount; ++i) {
    var startCode = table.startCount[i];
    var endCode = table.endCount[i];
    var idDelta = table.idDelta[i];
    if (idDelta == 0) {
      var idRangeOffset = table.idRangeOffset[i];
      for (var code = startCode; code <= endCode; ++code) {
        var glyphId = table.glyphIdArray[idRangeOffset + code - startCode];
        this.setMap_(code, glyphId, glyfOffset + loca.offsets[glyphId]);
      }
    } else {
      for (var code = startCode; code <= endCode; ++code) {
        var glyphId = code + idDelta;
        this.setMap_(code, glyphId, glyfOffset + loca.offsets[glyphId]);
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
org.jstype.CmapTable.prototype.setMap_ = function(code, glyphId, offset) {
  var codeHigh = code >> 8;
  if (!this.codeMap_[codeHigh]) {
    this.codeMap_[codeHigh] = org.jstype.CmapTable.createMap_(0);
  }
  this.codeMap_[codeHigh][code & 0xff] = offset;

  var glyphHigh = glyphId >> 8;
  if (!this.glyphMap_[glyphHigh]) {
    this.glyphMap_[glyphHigh] = org.jstype.CmapTable.createMap_(0);
  }
  this.glyphMap_[glyphHigh][glyphId & 0xff] = offset;
};

/**
 * @param {number} code
 * @return {number}
 */
org.jstype.CmapTable.prototype.getCodeOffset = function(code) {
  var map = this.codeMap_[code >> 8];
  return map ? map[code & 0xff] : 0;
};

/**
 * @param {number} glyphId
 * @return {number}
 */
org.jstype.CmapTable.prototype.getGlyphOffset = function(glyphId) {
  var map = this.glyphMap_[glyphId >> 8];
  return map ? map[glyphId & 0xff] : 0;
};

/**
 * @param {Uint8Array} data
 * @param {Object.<string,org.jstype.TableRecord>} records
 * @param {org.jstype.LocaTable} loca
 * @return {boolean}
 */
org.jstype.CmapTable.prototype.loadTable = function(data, records, loca) {
  var record = records['cmap'];
  var version = org.jstype.read16(data, record.tableOffset);
  var numTables = org.jstype.read16(data, record.tableOffset + 2);
  var offset = record.tableOffset + 4;
  for (var i = 0; i < numTables; ++i) {
    /**
     * @enum {number}
     * @const
     */
    var EncodingId = {
      SYMBOL: 0x00030001,
      UNICODE_BMP: 0x00030001,
      SHIFT_JIS: 0x00030002,
      PRC: 0x00030003,
      BIG5: 0x00030004,
      WANSUNG: 0x00030005,
      JOHAB: 0x00030006,
      UNICODE_UCS4: 0x0003000a
    }
    var encoding = org.jstype.read32(data, offset);
    if (encoding == EncodingId.UNICODE_BMP) {
      var subTableOffset =
          record.tableOffset + org.jstype.read32(data, offset + 4);
      return this.openFormat4_(data, records, loca, subTableOffset);
    }
    offset += 8;
  }
  return false;
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
   * @const {Uint8Array}
   * @private
   */
  this.data_ = data;

  /**
   * @const {number}
   * @private
   */
  this.lineSize_ = (width + 7) >> 3;

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
  if (org.jstype.DEBUG) {
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
 * @param {string} prefix
 * @constructor
 */
org.jstype.BitmapWriter = function(prefix) {
  /**
   * @type {string}
   * @private
   */
  this.text_ = prefix;

  /**
   * @type {number}
   * @private
   */
  this.data_ = 0;

  /**
   * @type {number}
   * @private
   */
  this.bits_ = 0;
}

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
 * Writes one byte of data.
 * @param {number} n
 */
org.jstype.BitmapWriter.prototype.write = function(n) {
  this.data_ = (this.data_ << 8) | n;
  this.bits_ += 8;
  if (this.bits_ == 24) {
    this.text_ += org.jstype.BitmapWriter.BASE64_[(this.data_ >> 18) & 0x3f];
    this.text_ += org.jstype.BitmapWriter.BASE64_[(this.data_ >> 12) & 0x3f];
    this.text_ += org.jstype.BitmapWriter.BASE64_[(this.data_ >> 6) & 0x3f];
    this.text_ += org.jstype.BitmapWriter.BASE64_[this.data_ & 0x3f];
    this.bits_ = 0;
    this.data_ = 0;
  }
};

/**
 * Closes this output stream.
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
 * @param {number} t
 * @constructor
 */
org.jstype.QuadraticBezierPoint = function(path, t) {
  /**
   * @const {number}
   */
  this.t = t;

  /**
   * @const {number}
   */
  this.x = org.jstype.QuadraticBezierPoint.calculate_(
      path[0].x, path[1].x, path[2].x, t);

  /**
   * @const {number}
   */
  this.y = org.jstype.QuadraticBezierPoint.calculate_(
      path[0].y, path[1].y, path[2].y, t);
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
 * @param {number} t
 * @constructor
 */
org.jstype.CubicBezierPoint = function(path, t) {
  /**
   * @const {number}
   */
  this.t = t;

  /**
   * @const {number}
   */
  this.x = org.jstype.CubicBezierPoint.calculate_(
      path[0].x, path[1].x, path[2].x, path[3].x, t);

  /**
   * @const {number}
   */
  this.y = org.jstype.CubicBezierPoint.calculate_(
      path[0].y, path[1].y, path[2].y, path[3].y, t);
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
 * @param {number} t
 * @constructor
 */
org.jstype.FourthBezierPoint = function(path, t) {
  /**
   * @const {number}
   */
  this.t = t;

  /**
   * @const {number}
   */
  this.x = org.jstype.FourthBezierPoint.calculate_(
      path[0].x, path[1].x, path[2].x, path[3].x, path[4].x, t);

  /**
   * @const {number}
   */
  this.y = org.jstype.FourthBezierPoint.calculate_(
      path[0].y, path[1].y, path[2].y, path[3].y, path[4].y, t);
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
 * includes intersections between a horizontal line 'y = k' and a curve.
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
 * Defines a sort order of x coordinates in a scan. This function sorts the x
 * coordinates in the ascending order.
 * @param {number} a
 * @param {number} b
 * @return {number}
 * @private
 */
org.jstype.Scan.sort_ = function (a, b) {
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
 * @param {org.jstype.QuadraticBezierPoint} p0
 * @param {org.jstype.QuadraticBezierPoint} p1
 * @private
 */
org.jstype.Scan.prototype.drawQuadraticBezier_ = function(path, p0, p1) {
  if (org.jstype.floor(p0.x) != org.jstype.floor(p1.x)) {
    if (org.jstype.floor(p0.y) == org.jstype.floor(p1.y)) {
      return;
    }
    var p = new org.jstype.QuadraticBezierPoint(path, (p0.t + p1.t) * 0.5);
    this.drawQuadraticBezier_(path, p0, p);
    this.drawQuadraticBezier_(path, p, p1);
    return;
  }
  this.drawLine_(p0.x, p0.y, p1.x, p1.y);
};

/**
 * Draws a cubic Bezier curve.
 * @param {Array.<org.jstype.GlyphPoint>} path
 * @param {org.jstype.CubicBezierPoint} p0
 * @param {org.jstype.CubicBezierPoint} p1
 * @private
 */
org.jstype.Scan.prototype.drawCubicBezier_ = function(path, p0, p1) {
  if (org.jstype.floor(p0.x) != org.jstype.floor(p1.x)) {
    if (org.jstype.floor(p0.y) == org.jstype.floor(p1.y)) {
      return;
    }
    var p = new org.jstype.CubicBezierPoint(path, (p0.t + p1.t) * 0.5);
    this.drawCubicBezier_(path, p0, p);
    this.drawCubicBezier_(path, p, p1);
    return;
  }
  this.drawLine_(p0.x, p0.y, p1.x, p1.y);
};

/**
 * Draws a fourth-order Bezier curve.
 * @param {Array.<org.jstype.GlyphPoint>} path
 * @param {org.jstype.FourthBezierPoint} p0
 * @param {org.jstype.FourthBezierPoint} p1
 * @private
 */
org.jstype.Scan.prototype.drawFourthBezier_ = function(path, p0, p1) {
  if (org.jstype.floor(p0.x) != org.jstype.floor(p1.x)) {
    if (org.jstype.floor(p0.y) == org.jstype.floor(p1.y)) {
      return;
    }
    var p = new org.jstype.FourthBezierPoint(path, (p0.t + p1.t) * 0.5);
    this.drawFourthBezier_(path, p0, p);
    this.drawFourthBezier_(path, p, p1);
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
  var length = path.length;
  if (length == 2) {
    this.drawLine_(path[0].x, path[0].y, path[1].x, path[1].y);
  } else if (length == 3) {
    var p0 = new org.jstype.QuadraticBezierPoint(path, 0);
    var p1 = new org.jstype.QuadraticBezierPoint(path, 0.5);
    var p2 = new org.jstype.QuadraticBezierPoint(path, 1);
    this.drawQuadraticBezier_(path, p0, p1);
    this.drawQuadraticBezier_(path, p1, p2);
  } else if (length == 4) {
    var p0 = new org.jstype.CubicBezierPoint(path, 0);
    var p1 = new org.jstype.CubicBezierPoint(path, 0.25);
    var p2 = new org.jstype.CubicBezierPoint(path, 0.75);
    var p3 = new org.jstype.CubicBezierPoint(path, 1);
    this.drawCubicBezier_(path, p0, p1);
    this.drawCubicBezier_(path, p1, p2);
    this.drawCubicBezier_(path, p2, p3);
  } else if (length == 5) {
    var p0 = new org.jstype.FourthBezierPoint(path, 0);
    var p1 = new org.jstype.FourthBezierPoint(path, 0.25);
    var p2 = new org.jstype.FourthBezierPoint(path, 0.5);
    var p3 = new org.jstype.FourthBezierPoint(path, 0.75);
    var p4 = new org.jstype.FourthBezierPoint(path, 1);
    this.drawFourthBezier_(path, p0, p1);
    this.drawFourthBezier_(path, p1, p2);
    this.drawFourthBezier_(path, p2, p3);
    this.drawFourthBezier_(path, p3, p4);
  } else if (!org.jstype.COMPILED && org.jstype.DEBUG) {
    // This curve seems to be a Bezier curve of the fifth order or more, which
    // is not supported by this function.
    debugger;
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
 * A class representing a font glyph of an OpenType font, which consists of a
 * bounding box and a set of contours.
 * @param {number} code
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
 * @param {org.jstype.CmapTable} cmap
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
  return true;
};

/**
 * Loads the outline of a glyph. This function reads the glyph data from the
 * specified location and creates its outline.
 * @param {Uint8Array} data
 * @param {number} offset
 * @param {number} dx
 * @param {number} dy
 * @param {org.jstype.CmapTable} cmap
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

/**
 * Draws a glyph.
 * @param {number} scale
 * @param {org.jstype.Bitmap} bitmap
 * @param {number} x
 * @param {number} y
 * @param {number} frame
 * @return {number}
 */
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
  this.scan_.writeBitmap(bitmap, x, y);
  this.frame_ = frame;
  return this.xMax_ * scale;
};

/**
 * Returns the horizontal width of this glyph.
 * @return {number}
 */
org.jstype.Glyph.prototype.measure = function() {
  return this.xMax_;
};

/**
 * Defines the sort order of glyph objects. This function is used for sorting
 * Glyph objects in the least-recently-used order.
 * @param {org.jstype.Glyph} a
 * @param {org.jstype.Glyph} b
 * @return {number}
 */
org.jstype.Glyph.sort = function(a, b) {
  return a.frame_ - b.frame_;
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
   * @type {number}
   * @private
   */
  this.fontScale_ = 0;

  /**
   * @type {org.jstype.CmapTable}
   * @private
   */
  this.cmap_ = null;

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
};

/**
 * Opens the specified font.
 * @return {boolean}
 * @private
 */
org.jstype.FontReader.prototype.openFont_ = function() {
  if (this.cmap_) {
    return true;
  }
  // Reset internal variables.
  this.cmap_ = new org.jstype.CmapTable;
  this.glyphMap_ = {};
  this.glyphList_ = [];
  this.glyphFrame_ = 0;

  // Read TrueType headers required for creating a mapping table.
  var offsetTable = new org.jstype.OffsetTable(this.data_);
  if (offsetTable.version != 0x00010000) {
    return false;
  }
  /**
   * @type {Object.<string,org.jstype.TableRecord>}
   */
  var records = {};
  var offset = 12;
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
  return this.cmap_.loadTable(this.data_, records, loca);
};

/**
 * @param {number} code
 * @return {org.jstype.Glyph} glyph
 * @private
 */
org.jstype.FontReader.prototype.getGlyph_ = function(code) {
  var glyph = this.glyphMap_[code];
  if (!glyph) {
    var offset = this.cmap_.getCodeOffset(code);
    if (!offset) {
      return null;
    }
    glyph = new org.jstype.Glyph(code);
    if (!glyph.loadGlyph(this.data_, offset, 0, 0, this.cmap_)) {
      return null;
    }
    var length = this.glyphList_.length;
    if (length >= this.glyphQuota_) {
      length >>= 1;
      this.glyphList_.sort(org.jstype.Glyph.sort);
      this.glyphList_.splice(0, length);
      this.glyphMap_ = {};
      for (var i = 0; i < length; ++i) {
        this.glyphMap_[this.glyphList_[i].code] = this.glyphList_[i];
      }
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
   * @type {Array.<number>}
   */
  var header = [
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
  ];

  // Overwrite five fields (bfSize, biWidth, biHeight, biSizeImage, and
  // bmiColors[]) so the generated BMP file represents the input image.
  var biWidth = width;
  var biHeight = height;
  var biSizeImage = ((biWidth + 7) >> 3) * biHeight;
  var bfSize = header.length + biSizeImage;
  header[2] = bfSize & 0xff;
  header[3] = (bfSize >> 8) & 0xff;
  header[4] = (bfSize >> 16) & 0xff;
  header[5] = (bfSize >> 24) & 0xff;
  header[18] = biWidth & 0xff;
  header[19] = (biWidth >> 8) & 0xff;
  header[22] = biHeight & 0xff;
  header[23] = (biHeight >> 8) & 0xff;
  header[34] = biSizeImage & 0xff;
  header[35] = (biSizeImage >> 8) & 0xff;
  header[36] = (biSizeImage >> 16) & 0xff;
  header[37] = (biSizeImage >> 24) & 0xff;
  var offset = 54;
  for (var i = 0; i < 2; ++i) {
    header[offset] = (colors[i] >> 16) & 0xff;
    header[offset + 1] = (colors[i] >> 8) & 0xff;
    header[offset + 2] = colors[i] & 0xff;
    offset += 4;
  }

  // Write the BMP header and the given data to the output stream.
  var uri = new org.jstype.BitmapWriter('data:image/bmp;base64,');
  for (var i = 0; i < header.length; ++i) {
    uri.write(header[i]);
  }
  for (var i = 0; i < data.length; ++i) {
    uri.write(data[i]);
  }
  return uri.close();
};

/**
 * Creates a Data URI representing a gray bitmap of the specified data.
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
   * @type {Array.<number>}
   */
  var header = [
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
  ];

  // Overwrite six fields (bfSize, biWidth, biHeight, biSizeImage, bmiColors[0],
  // and bmiColors[1]) so the generated BMP file represents the input image.
  var biWidth = width >> 2;
  var biHeight = height >> 2;
  var biSizeImage = (biWidth >> 1) * biHeight;
  var bfSize = header.length + biSizeImage;
  header[2] = bfSize & 0xff;
  header[3] = (bfSize >> 8) & 0xff;
  header[4] = (bfSize >> 16) & 0xff;
  header[5] = (bfSize >> 24) & 0xff;
  header[18] = biWidth & 0xff;
  header[19] = (biWidth >> 8) & 0xff;
  header[22] = biHeight & 0xff;
  header[23] = (biHeight >> 8) & 0xff;
  header[34] = biSizeImage & 0xff;
  header[35] = (biSizeImage >> 8) & 0xff;
  header[36] = (biSizeImage >> 16) & 0xff;
  header[37] = (biSizeImage >> 24) & 0xff;
  var offset = 54;
  for (var i = 0; i < 16; ++i) {
    header[offset] = (colors[i] >> 16) & 0xff;
    header[offset + 1] = (colors[i] >> 8) & 0xff;
    header[offset + 2] = colors[i] & 0xff;
    offset += 4;
  }

  // Write the BMP header and the given data to the output stream. (This code
  // assumes the given width is a multiple of eight.)
  var uri = new org.jstype.BitmapWriter('data:image/bmp;base64,');
  for (var i = 0; i < header.length; ++i) {
    uri.write(header[i]);
  }
  var line0 = 0;
  for (var y = 0; y < height; y += 4) {
    for (var x = 0; x < width; x += 4, line0 += 4) {
      var line1 = line0 + width;
      var line2 = line1 + width;
      var line3 = line2 + width;
      var shift = 8 - (line0 & 7) - 4;
      /**
       * An array enumerating the counts of 1's for each number between 0 and 15.
       * @const {Array.<number>}
       */
      var COUNT = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];
      var count = COUNT[(data[line0 >> 3] >> shift) & 0xf];
      count += COUNT[(data[line1 >> 3] >> shift) & 0xf];
      count += COUNT[(data[line2 >> 3] >> shift) & 0xf];
      count += COUNT[(data[line3 >> 3] >> shift) & 0xf];
      /**
       * An array enumerating palette indices. Math.round(i * 15 / 16).
       * @const {Array.<number>}
       */
      var COLOR = [0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10, 11, 12, 13, 14, 15];
      uri.write(COLOR[count]);
    }
  }
  return uri.close();
};

/**
 * Measures the width of text.
 * @param {string} text
 * @param {number} fontSize
 * @return {number}
 */
org.jstype.FontReader.prototype.measure = function(text, fontSize) {
  if (!this.openFont_()) {
    return 0;
  }
  var x = 0;
  var length = text.length;
  for (var i = 0; i < length; ++i) {
    var glyph = this.getGlyph_(text.charCodeAt(i));
    if (!glyph) {
      return 0;
    }
    var advance = glyph.measure();
    if (!advance) {
      return 0;
    }
    x += advance;
  }
  return x * fontSize * this.fontScale_;
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
  if (!this.openFont_()) {
    return 0;
  }
  var bitmap = new org.jstype.Bitmap(data, width, height);
  var x = 0;
  var y = 0;
  var fontScale = fontSize * this.fontScale_;
  var length = text.length;
  for (var i = 0; i < length; ++i) {
    var glyph = this.getGlyph_(text.charCodeAt(i));
    if (!glyph) {
      return 0;
    }
    var advance = glyph.draw(fontScale, bitmap, x, y, ++this.glyphFrame_);
    if (!advance) {
      return 0;
    }
    x += advance;
  }
  window.console.log(bitmap.getString());
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

// Export the org.jstype.FontReader class and its public methods.
org.jstype.exportObject(
    'org.jstype.FontReader',
    org.jstype.FontReader,
    {
      'draw': org.jstype.FontReader.prototype.draw,
      'getBitmap': org.jstype.FontReader.prototype.getBitmap,
      'measure': org.jstype.FontReader.prototype.measure
    }
);
