if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'MusicTheoryJS'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'MusicTheoryJS'.");
}var MusicTheoryJS = function (_, Kotlin) {
  'use strict';
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var Map = Kotlin.kotlin.collections.Map;
  var toMutableSet = Kotlin.kotlin.collections.toMutableSet_7wnvza$;
  var HashMap_init = Kotlin.kotlin.collections.HashMap_init_73mtqc$;
  var emptyMap = Kotlin.kotlin.collections.emptyMap_q3lmfv$;
  var toMutableMap = Kotlin.kotlin.collections.toMutableMap_abgq59$;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var HashMap = Kotlin.kotlin.collections.HashMap;
  var to = Kotlin.kotlin.to_ujzrz7$;
  var reversed = Kotlin.kotlin.collections.reversed_7wnvza$;
  var equals = Kotlin.equals;
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var sortedWith = Kotlin.kotlin.collections.sortedWith_eknfly$;
  var wrapFunction = Kotlin.wrapFunction;
  var Comparator = Kotlin.kotlin.Comparator;
  var toString = Kotlin.toString;
  var Exception_init = Kotlin.kotlin.Exception_init_pdl1vj$;
  var Exception = Kotlin.kotlin.Exception;
  var toBoxedChar = Kotlin.toBoxedChar;
  var unboxChar = Kotlin.unboxChar;
  var mapOf = Kotlin.kotlin.collections.mapOf_qfcya0$;
  BiHashMap.prototype = Object.create(HashMap.prototype);
  BiHashMap.prototype.constructor = BiHashMap;
  NoteException.prototype = Object.create(Exception.prototype);
  NoteException.prototype.constructor = NoteException;
  ChordException.prototype = Object.create(Exception.prototype);
  ChordException.prototype.constructor = ChordException;
  KeyException.prototype = Object.create(Exception.prototype);
  KeyException.prototype.constructor = KeyException;
  function chordFromName_JS(name) {
    return Chord$Companion_getInstance().chordFromName_61zpoe$(name);
  }
  function keyFromName_JS(name) {
    return Key$Companion_getInstance().keyFromName_61zpoe$(name);
  }
  function chordFromString_JS(name) {
    return Chord$Companion_getInstance().chordFromString_61zpoe$(name);
  }
  function keyFromString_JS(name) {
    return Key$Companion_getInstance().keyFromString_61zpoe$(name);
  }
  function transposeChord_JS(chord, originKey, targetKey) {
    return chord.transpose_gyj958$(originKey, targetKey);
  }
  function BiMap() {
  }
  BiMap.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'BiMap',
    interfaces: [Map]
  };
  function BiHashMap(direct) {
    HashMap_init(direct, this);
    this.direct_0 = direct;
    var tmp$;
    var res = toMutableMap(emptyMap());
    tmp$ = this.direct_0.entries.iterator();
    while (tmp$.hasNext()) {
      var pair = tmp$.next();
      var key = pair.value;
      var value = pair.key;
      res.put_xwzc9p$(key, value);
    }
    this.reverse_0 = res;
  }
  Object.defineProperty(BiHashMap.prototype, 'values', {
    configurable: true,
    get: function () {
      return toMutableSet(this.direct_0.values);
    }
  });
  Object.defineProperty(BiHashMap.prototype, 'inverse', {
    configurable: true,
    get: function () {
      return new BiHashMap(this.reverse_0);
    }
  });
  BiHashMap.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'BiHashMap',
    interfaces: [BiMap, HashMap]
  };
  var compareBy$lambda = wrapFunction(function () {
    var compareValues = Kotlin.kotlin.comparisons.compareValues_s00gnj$;
    return function (closure$selector) {
      return function (a, b) {
        var selector = closure$selector;
        return compareValues(selector(a), selector(b));
      };
    };
  });
  function Chord(note, type) {
    Chord$Companion_getInstance();
    this.note = note;
    this.type = type;
    if (!Chord$Companion_getInstance().chordTypes.contains_11rb$(this.type))
      throw new ChordException(this.note, this.type);
    this.name = this.note.name + this.type;
  }
  function Chord$Companion() {
    Chord$Companion_instance = this;
    this.chordTypes = listOf(['', 'm', '7', 'm7', 'maj7', 'mmaj7', 'dim', 'sus4', 'sus2', 'dim7', '+5', '\xF8']);
  }
  function Chord$Companion$chordFromString$lambda(it) {
    return it.length;
  }
  Chord$Companion.prototype.chordFromString_61zpoe$ = function (name) {
    var tmp$ = Note$Companion_getInstance().noteFromString_61zpoe$(name);
    var note = tmp$.component1()
    , last_name = tmp$.component2();
    if (note == null)
      return to(null, name);
    var tmp$_0;
    tmp$_0 = reversed(sortedWith(this.chordTypes, new Comparator(compareBy$lambda(Chord$Companion$chordFromString$lambda)))).iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      var tmp$_1 = last_name.length >= element.length;
      if (tmp$_1) {
        var endIndex = element.length;
        tmp$_1 = equals(last_name.substring(0, endIndex), element);
      }if (tmp$_1) {
        var tmp$_2 = new Chord(note, element);
        var startIndex = element.length;
        return to(tmp$_2, last_name.substring(startIndex));
      }}
    return to(null, name);
  };
  Chord$Companion.prototype.chordFromName_61zpoe$ = function (name) {
    var tmp$ = this.chordFromString_61zpoe$(name);
    var chord = tmp$.component1()
    , rest = tmp$.component2();
    if (chord == null || !equals(rest, ''))
      throw new ChordException(void 0, void 0, name, 'Strict cast failed');
    return chord;
  };
  Chord$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Chord$Companion_instance = null;
  function Chord$Companion_getInstance() {
    if (Chord$Companion_instance === null) {
      new Chord$Companion();
    }return Chord$Companion_instance;
  }
  Chord.prototype.transpose_gyj958$ = function (origin, target) {
    return new Chord(this.note.transpose_gyj958$(origin, target), this.type);
  };
  Chord.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Chord',
    interfaces: []
  };
  function Chord_init(chord, $this) {
    $this = $this || Object.create(Chord.prototype);
    Chord.call($this, chord.note, chord.type);
    return $this;
  }
  function Chord_init_0(name, $this) {
    $this = $this || Object.create(Chord.prototype);
    Chord_init(Chord$Companion_getInstance().chordFromName_61zpoe$(name), $this);
    return $this;
  }
  function NoteException(noteId, natural, noteName, message) {
    if (noteId === void 0)
      noteId = null;
    if (natural === void 0)
      natural = null;
    if (noteName === void 0)
      noteName = null;
    if (message === void 0)
      message = null;
    Exception_init('Exception: note id ' + toString(noteId) + ', natural ' + toString(natural) + ', note name ' + toString(noteName) + ', message: ' + toString(message), this);
    this.noteId = noteId;
    this.natural = natural;
    this.noteName = noteName;
    this.name = 'NoteException';
  }
  NoteException.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'NoteException',
    interfaces: [Exception]
  };
  function ChordException(note, type, chordName, message) {
    if (note === void 0)
      note = null;
    if (type === void 0)
      type = null;
    if (chordName === void 0)
      chordName = null;
    if (message === void 0)
      message = null;
    Exception_init('Exception: note ' + toString(note != null ? note.name : null) + ', type ' + toString(type) + ', chord name ' + toString(chordName) + ', message: ' + toString(message), this);
    this.note = note;
    this.type = type;
    this.chordName = chordName;
    this.name = 'ChordException';
  }
  ChordException.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ChordException',
    interfaces: [Exception]
  };
  function KeyException(message) {
    Exception_init(message, this);
    this.message_cvfanm$_0 = message;
    this.name = 'KeyException';
  }
  Object.defineProperty(KeyException.prototype, 'message', {
    get: function () {
      return this.message_cvfanm$_0;
    }
  });
  KeyException.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'KeyException',
    interfaces: [Exception]
  };
  var compareBy$lambda_0 = wrapFunction(function () {
    var compareValues = Kotlin.kotlin.comparisons.compareValues_s00gnj$;
    return function (closure$selector) {
      return function (a, b) {
        var selector = closure$selector;
        return compareValues(selector(a), selector(b));
      };
    };
  });
  function Key(tonic, mode) {
    Key$Companion_getInstance();
    this.tonic = tonic;
    this.mode = mode;
    this.name = this.tonic.name + this.mode;
  }
  function Key$Companion() {
    Key$Companion_instance = this;
    this.modes = listOf(['', 'm']);
  }
  function Key$Companion$keyFromString$lambda(it) {
    return it.length;
  }
  Key$Companion.prototype.keyFromString_61zpoe$ = function (name) {
    var tmp$ = Note$Companion_getInstance().noteFromString_61zpoe$(name);
    var note = tmp$.component1()
    , last_name = tmp$.component2();
    if (note == null)
      return to(null, name);
    var tmp$_0;
    tmp$_0 = reversed(sortedWith(this.modes, new Comparator(compareBy$lambda_0(Key$Companion$keyFromString$lambda)))).iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      var tmp$_1 = last_name.length >= element.length;
      if (tmp$_1) {
        var endIndex = element.length;
        tmp$_1 = equals(last_name.substring(0, endIndex), element);
      }if (tmp$_1) {
        var tmp$_2 = new Key(note, element);
        var startIndex = element.length;
        return to(tmp$_2, last_name.substring(startIndex));
      }}
    return to(null, name);
  };
  Key$Companion.prototype.keyFromName_61zpoe$ = function (name) {
    var tmp$ = this.keyFromString_61zpoe$(name);
    var key = tmp$.component1()
    , rest = tmp$.component2();
    if (key == null || !equals(rest, ''))
      throw new KeyException('titovtima.MusicTheory.Key name = ' + name + ', Strict cast failed');
    return key;
  };
  Key$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Key$Companion_instance = null;
  function Key$Companion_getInstance() {
    if (Key$Companion_instance === null) {
      new Key$Companion();
    }return Key$Companion_instance;
  }
  Key.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Key',
    interfaces: []
  };
  function Key_init(key, $this) {
    $this = $this || Object.create(Key.prototype);
    Key.call($this, key.tonic, key.mode);
    return $this;
  }
  function Key_init_0(name, $this) {
    $this = $this || Object.create(Key.prototype);
    Key_init(Key$Companion_getInstance().keyFromName_61zpoe$(name), $this);
    return $this;
  }
  function Note(noteId, natural) {
    Note$Companion_getInstance();
    this.noteId = (noteId + 1200 | 0) % 12;
    this.natural = (natural + 700 | 0) % 7;
    var tmp$;
    tmp$ = Note$Companion_getInstance().nameFromId_vux9f0$(this.noteId, this.natural);
    if (tmp$ == null) {
      throw new NoteException(this.noteId, this.natural);
    }this.name = tmp$;
  }
  function Note$Companion() {
    Note$Companion_instance = this;
    this.sharp = toBoxedChar(9839);
    this.flat = toBoxedChar(9837);
    this.doubleSharp = '\uD834\uDD2A';
    this.doubleFlat = '\uD834\uDD2B';
    this.naturalToId = new BiHashMap(mapOf([to(0, 0), to(1, 2), to(2, 4), to(3, 5), to(4, 7), to(5, 9), to(6, 11)]));
    this.naturalToName = new BiHashMap(mapOf([to(0, toBoxedChar(67)), to(1, toBoxedChar(68)), to(2, toBoxedChar(69)), to(3, toBoxedChar(70)), to(4, toBoxedChar(71)), to(5, toBoxedChar(65)), to(6, toBoxedChar(66))]));
  }
  Note$Companion.prototype.nameFromId_vux9f0$ = function (noteId, natural) {
    var tmp$, tmp$_0, tmp$_1;
    tmp$ = unboxChar(this.naturalToName.get_11rb$(natural));
    if (tmp$ == null) {
      return null;
    }var naturalName = tmp$;
    tmp$_0 = this.naturalToId.get_11rb$(natural);
    if (tmp$_0 == null) {
      return null;
    }var naturalId = tmp$_0;
    switch ((noteId - naturalId + 12 | 0) % 12) {
      case 10:
        tmp$_1 = this.doubleFlat;
        break;
      case 11:
        tmp$_1 = String.fromCharCode(unboxChar(this.flat));
        break;
      case 0:
        tmp$_1 = '';
        break;
      case 1:
        tmp$_1 = String.fromCharCode(unboxChar(this.sharp));
        break;
      case 2:
        tmp$_1 = this.doubleSharp;
        break;
      default:return null;
    }
    var other = tmp$_1;
    return String.fromCharCode(naturalName) + other;
  };
  Note$Companion.prototype.noteFromString_61zpoe$ = function (name) {
    var tmp$, tmp$_0, tmp$_1;
    if (name.length === 0)
      return to(null, name);
    var naturalChar = name.charCodeAt(0);
    tmp$ = this.naturalToName.inverse.get_11rb$(toBoxedChar(naturalChar));
    if (tmp$ == null) {
      return to(null, name);
    }var natural = tmp$;
    tmp$_0 = this.naturalToId.get_11rb$(natural);
    if (tmp$_0 == null) {
      return to(null, name);
    }var noteId = tmp$_0;
    if (name.length >= 2 && name.charCodeAt(1) === unboxChar(this.sharp)) {
      tmp$_1 = to(new Note(noteId + 1 | 0, natural), name.substring(2));
    } else if (name.length >= 2 && name.charCodeAt(1) === unboxChar(this.flat)) {
      tmp$_1 = to(new Note(noteId - 1 | 0, natural), name.substring(2));
    } else {
      var tmp$_2 = name.length >= 3;
      if (tmp$_2) {
        tmp$_2 = equals(name.substring(1, 3), this.doubleSharp);
      }if (tmp$_2) {
        tmp$_1 = to(new Note(noteId + 2 | 0, natural), name.substring(3));
      } else {
        var tmp$_3 = name.length >= 3;
        if (tmp$_3) {
          tmp$_3 = equals(name.substring(1, 3), this.doubleFlat);
        }if (tmp$_3) {
          tmp$_1 = to(new Note(noteId - 2 | 0, natural), name.substring(3));
        } else {
          tmp$_1 = to(new Note(noteId, natural), name.substring(1));
        }
      }
    }
    return tmp$_1;
  };
  Note$Companion.prototype.noteFromName_61zpoe$ = function (name) {
    var tmp$ = this.noteFromString_61zpoe$(name);
    var note = tmp$.component1()
    , rest = tmp$.component2();
    if (note == null || !equals(rest, ''))
      throw new NoteException(void 0, void 0, name, 'Strict cast failed');
    return note;
  };
  Note$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Note$Companion_instance = null;
  function Note$Companion_getInstance() {
    if (Note$Companion_instance === null) {
      new Note$Companion();
    }return Note$Companion_instance;
  }
  Note.prototype.transpose_gyj958$ = function (origin, target) {
    if (!equals(origin.mode, target.mode))
      throw new KeyException('Try to transpose from ' + origin.name + ' to ' + target.name);
    else
      return new Note(this.noteId + (target.tonic.noteId - origin.tonic.noteId) | 0, this.natural + (target.tonic.natural - origin.tonic.natural) | 0);
  };
  Note.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Note',
    interfaces: []
  };
  function Note_init(note, $this) {
    $this = $this || Object.create(Note.prototype);
    Note.call($this, note.noteId, note.natural);
    return $this;
  }
  function Note_init_0(name, $this) {
    $this = $this || Object.create(Note.prototype);
    Note_init(Note$Companion_getInstance().noteFromName_61zpoe$(name), $this);
    return $this;
  }
  _.chordFromName = chordFromName_JS;
  _.keyFromName = keyFromName_JS;
  _.chordFromString = chordFromString_JS;
  _.keyFromString = keyFromString_JS;
  _.transposeChord = transposeChord_JS;
  var package$titovtima = _.titovtima || (_.titovtima = {});
  var package$musicTheory = package$titovtima.musicTheory || (package$titovtima.musicTheory = {});
  package$musicTheory.BiMap = BiMap;
  package$musicTheory.BiHashMap = BiHashMap;
  Object.defineProperty(Chord, 'Companion', {
    get: Chord$Companion_getInstance
  });
  package$musicTheory.Chord_init_2g26u1$ = Chord_init;
  package$musicTheory.Chord_init_61zpoe$ = Chord_init_0;
  package$musicTheory.Chord = Chord;
  package$musicTheory.NoteException = NoteException;
  package$musicTheory.ChordException = ChordException;
  package$musicTheory.KeyException = KeyException;
  Object.defineProperty(Key, 'Companion', {
    get: Key$Companion_getInstance
  });
  package$musicTheory.Key_init_tmx3tw$ = Key_init;
  package$musicTheory.Key_init_61zpoe$ = Key_init_0;
  package$musicTheory.Key = Key;
  Object.defineProperty(Note, 'Companion', {
    get: Note$Companion_getInstance
  });
  package$musicTheory.Note_init_4o0j9x$ = Note_init;
  package$musicTheory.Note_init_61zpoe$ = Note_init_0;
  package$musicTheory.Note = Note;
  Kotlin.defineModule('MusicTheoryJS', _);
  return _;
}(typeof MusicTheoryJS === 'undefined' ? {} : MusicTheoryJS, kotlin);
