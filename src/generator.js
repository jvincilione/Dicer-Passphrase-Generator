/*!
** Diceware Passphrase Generator
** Created by Jacques Vincilione, CEO - Lucien Consulting, INC
**
** Standard MIT License
Copyright (c) 2015 Lucien Consulting, INC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**
*/

var dicer = {}; //global namespace

(function() {
    "use strict";
    var dice_generator = { version: "1.0" };

    // please be sure to include "dice.js" on your page if you use this.
    
    /**
     * Generates random password based on dice rolls
     * @param  {string/num} length      Number of words in pass phrase
     * @param  {string} separator       Separator (space, comma, period, etc)
     * @return {string || null}         Passphrase
     */
    dicer.run = function(length, separator, objectId) {
        var passphrase;

        if (!lc_dice_words || typeof lc_dice_words === 'undefined' || !lc_beale_words || typeof lc_beale_words === 'undefined') {
            throw new Error("This plugin requires the 'dice.js' and 'dice-beale.js' file included BEFORE this file if you are not using the minified, production version.");
        }

        length = length || 6;
        separator = separator || " ";

        // generate phrase, join with separator
        passphrase = generateWords(length);
        passphrase = passphrase.join(separator);

        // optionally add passphrase to object instead of returning it
        if (objectId) {
            document.getElementById(objectId).innerHTML = passphrase;
            return;
        }

        return passphrase;
    };

    var generateWords = function (length) {
        var i = 0,
            delta = Math.floor((Math.random() * 2)),
            words = delta ? lc_dice_words : lc_beale_words,
            diceRolls = [];

        for (i; i < length; i++) {
            var roll = [],
                n = 0,
                word = '';

            for (n; n < 5; n++) {
                roll.push(Math.floor((Math.random() * 6) + 1));
            }

            word = words[roll.join("")];
            diceRolls.push(word);
        }

        return diceRolls;
    };
}());