var callfile = require('child_process');

callfile.exec('git config --get remote.origin.url', function(err, stdout) {
    var url = stdout.replace(/\.git/, '').replace(/\s/, '');
    callfile.exec(__dirname + '/allCommitLog.sh ' + url + ' develop ',function (err, stdout, stderr) {
        console.log(err, stdout, stderr);
    });
});

