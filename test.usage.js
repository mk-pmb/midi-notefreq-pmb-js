/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var equal = require('assert').deepStrictEqual, sciNotes;

function floatAlmostEqual(a, b) {
  var x = Math.max(a, b), n = Math.min(a, b), d = (x - n) / n;
  if (d < 1e-15) { return true; }
  equal({ floats: [a, b] }, { relDist: d });
}


(function readmeDemo() {
  //#u
  var mnf = require('midi-notefreq-pmb');

  function testNote(noteName, expectMidiNote, expectFreqHz) {
    var midiNote = mnf.sciUK2midiNote(noteName);
    equal(midiNote, expectMidiNote);
    equal(mnf.midiNote2freqHz(midiNote), expectFreqHz);
    equal(mnf.freqHz2midiNote(expectFreqHz), expectMidiNote);
  }
  testNote('C-1',   0,      8.175798915643707);
  testNote('C4',   60,    261.6255653005986);
  testNote('A4',   69,    440.0);
  testNote('A3',   57,    220.0);
  testNote('A5',   81,    880.0);
  testNote('G9',  127,  12543.853951415975);

  function testFreq(noteName, offset, freqHz) {
    var expectMidiNote = mnf.sciUK2midiNote(noteName) + offset;
    equal(mnf.freqHz2midiNote(freqHz), expectMidiNote);
    floatAlmostEqual(mnf.midiNote2freqHz(expectMidiNote), freqHz);
  }
  testFreq('A3',  0,                  220.0);
  testFreq('A4',  0,                  440.0);
  testFreq('A4',  0.42748691676866,   451.0);
  testFreq('F#9', 0.72430607743638, 12345.6789);
  //#r
}());









console.log("+OK usage test passed.");    //= "+OK usage test passed."
