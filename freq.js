/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var mnf = {}, log2 = Math.log2;

if (!log2) {
  log2 = (function () {
    var ln2 = Math.log(2);
    return function (x) { return Math.log(x) / ln2; };
  }());
}

mnf.sciCustom2midiNote = function sci2midi(dict, note, sciOctave) {
  if (note.map) {
    return note.map(function (n) { return sci2midi(dict, n, sciOctave); });
  }
  if (sciOctave !== +sciOctave) {
    note = note.split(/(\-?\d+)$/);
    sciOctave = (+(note[1]) || 0);
    note = note[0];
  }
  note = dict[note];
  return (note >= 0 ? (note + ((sciOctave + 1) * 12)) : null);
};

mnf.midiNote2sciCustom = function midi2sci(dict, midiNote) {
  if (midiNote.map) {
    return midiNote.map(function (n) { return midi2sci(dict, n); });
  }
  var w = dict.length, n = dict[midiNote % w], o;
  if (!n) { return false; }
  o = Math.floor(midiNote / w) - 1;
  return n + String(o);
};

mnf.makeNoteNamesDict = function (names) {
  var notes = [];
  names.replace(/[A-Z]#?/g, function (n) {
    var i = notes.length;
    notes[i] = n;
    notes[n] = i;
  });
  return notes;
};

mnf.noteNamesUK = mnf.makeNoteNamesDict('CC#DD#EFF#GG#AA#B');
mnf.uk = mnf.sciUK2midiNote = function (name, sciOctave) {
  return mnf.sciCustom2midiNote(mnf.noteNamesUK, name, sciOctave);
};
mnf.ku = mnf.midiNote2sciUK = function (midiNote) {
  return mnf.midiNote2sciCustom(mnf.noteNamesUK, midiNote);
};

mnf.refMidiNote = mnf.sciUK2midiNote('A', 4);
mnf.refFreqHz = 440;

mnf.octaveDist2freqFactor = function (octaveDist) {
  return Math.pow(2, octaveDist);
};

mnf.midiNoteDist2freqFactor = function (midiNoteDist) {
  return mnf.octaveDist2freqFactor(midiNoteDist / 12);
};

mnf.hz = mnf.midiNote2freqHz = function (midiNote) {
  return mnf.midiNoteDist2freqFactor(midiNote - mnf.refMidiNote
    ) * mnf.refFreqHz;
};

mnf.freqFactor2octaveDist = log2;

mnf.freqFactor2midiNoteDist = function (freqFactor) {
  return mnf.freqFactor2octaveDist(freqFactor) * 12;
};

mnf.zh = mnf.freqHz2midiNote = function (freqHz) {
  return mnf.refMidiNote + mnf.freqFactor2midiNoteDist(freqHz / mnf.refFreqHz);
};

















module.exports = mnf;
