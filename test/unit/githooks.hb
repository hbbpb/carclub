var exec = require('child_process').exec;

exec('git status -s >temp/git_commit.txt', {
    cwd: '{{escapeBackslashes gruntfileDirectory}}'
}, function (err, stdout, stderr) {
    exec('{{escapeBackslashes command}}{{#if task}} {{escapeBackslashes task}}{{/if}}{{#if args}} {{{escapeBackslashes args}}}{{/if}} >temp/unit-test.txt', {
        cwd: '{{escapeBackslashes gruntfileDirectory}}'
    }, function (err, stdout, stderr) {
        console.log(stdout);

        var exitCode = 0;
        if (err) {
            console.error(stderr);
            exitCode = -1;
        }
        process.exit(exitCode);
    });
});