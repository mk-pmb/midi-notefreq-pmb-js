/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var mnf = require('.'), numRx = /^\d*(\.\d+|)$/;

function fail(why) { throw new Error(why); }
function tsv(t) { console.log(t.join('\t')); }

tsv(['NoteID', 'NameUK', 'FreqHz']);
process.argv.slice(2).forEach(function (a) {
  if (!a) { return; }
  if (a.substr(0, 1) === '-') {
    if (a === '--') { return; }
    fail('Unsupported option: ' + a);
  }
  var r = numRx.exec(a), n;
  if (!r) {   // string = note name
    n = mnf.sciUK2midiNote(a);
    return tsv([n, a, mnf.midiNote2freqHz(n)]);
  }
  if (r[1]) {   // float = frequency
    a = +a;
    n = mnf.freqHz2midiNote(a);
    return tsv([mnf.midiNote2sciUK(n), n, a]);
  }
  // integer = node ID
  n = +a;
  return tsv([mnf.midiNote2sciUK(n), n, mnf.midiNote2freqHz(n)]);
});
