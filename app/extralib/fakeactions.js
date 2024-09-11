"use strict";
exports.__esModule = true;
exports.genratekey = void 0;
var crypto_1 = require("crypto");
function genratekey() {
    var password = "I just keep moving forward until my enemies are destroyed.";
    var salt = "The talkative people will not hear the silent voice of the footsteps of time escaping.";
    var iter = 100000;
    // console.log('This is a test.');
    var keylen = 256;
    var digst = 'sha256';
    (0, crypto_1.pbkdf2)(password, salt, iter, keylen/8, digst, function (err, derivedkey) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(derivedkey.toString('hex'));
        }
    });
}
exports.genratekey = genratekey;
// crypto_1.generateKey()
genratekey();