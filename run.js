/**
 * Created by smskin on 06.04.17.
 */

var fontName = 'icofont';
var targetDir = 'icons/'+fontName;

var svgfont2svgicons = require('svgfont2svgicons');
var fs = require('fs');
var fontStream = fs.createReadStream(fontName+'.svg');
var iconProvider = svgfont2svgicons();
var mkdirp = require('mkdirp');

mkdirp(targetDir, function(err) {

});

// Piping the font
fontStream.pipe(iconProvider);

// Saving the SVG files
iconProvider.on('readable', function() {
    var icon;
    do {
        icon = iconProvider.read();
        if(icon) {
            console.log('New icon:', icon.metadata.name, icon.metadata.unicode);
            icon.pipe(fs.createWriteStream(targetDir+'/'+icon.metadata.name + '.svg'));
        }
    } while(null !== icon);
}).once('end', function() {
    console.log('No more icons !')
});