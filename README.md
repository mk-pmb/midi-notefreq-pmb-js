
<!--#echo json="package.json" key="name" underline="=" -->
midi-notefreq-pmb
=================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Calculate frequency from MIDI note number and vice versa.
<!--/#echo -->

This lib comes with tests and instructive¹ source code.
(¹ at least for future me, hopefully.)


Usage
-----

from [test.usage.js](test.usage.js):

<!--#include file="test.usage.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
<!--#verbatim lncnt="26" -->
```javascript
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
```
<!--/include-->

```bash
$ midi-notefreq-pmb foo
bar
```


<!--#toc stop="scan" -->



Known issues
------------

* needs more/better tests and docs


See also
--------

* @kedromelon's packages [mtof](https://www.npmjs.com/package/mtof)
  and [ftom](https://www.npmjs.com/package/ftom).



&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
