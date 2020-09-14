//node.js deps
var fs = require('fs');

//npm deps

//app deps

//begin module

/**
 * This is the exposed module.
 * This method facilitates copying a file.
 *
 * @param {String} fileSrc
 * @param {String} fileDest
 * @param {Function} cb
 * @access public
 */
module.exports = function(fileSrc, fileDest, cb) {
   var cbCalled = false;

   var rd = fs.createReadStream(fileSrc);
   rd.on("error", function(err) {
      err.fileName = fileSrc;
      done(err);
   });

   var wr = fs.createWriteStream(fileDest);
   wr.on("error", function(err) {
      err.fileName = fileDest;
      done(err);
   });

   wr.on("close", function(ex) {
      done();
   });
   rd.pipe(wr);

   function done(err) {
      if (!cbCalled) {
         cb(err);
         cbCalled = true;
      }
   }
};
