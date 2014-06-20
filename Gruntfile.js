module.exports = function(grunt) {


    require("grunt-load-gruntfile")(grunt);

    var dir;

    process.chdir('./src/sponsor');
    require(process.cwd() + "/Gruntfile.js")(grunt);

};