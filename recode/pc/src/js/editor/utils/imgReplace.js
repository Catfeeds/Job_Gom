 var rules = /^https?:/i;
 var https = /https/i;

 var imgReplace = function(src) {
     return src.replace(rules, '');
 }

 var imgProto = function(src) {
     if (src.indexOf(https) != -1) {
         return 'https:';
     } else {
         return 'https:'
     }

 }

 module.exports = {
     imgReplace: imgReplace,
     imgProto: imgProto
 };
