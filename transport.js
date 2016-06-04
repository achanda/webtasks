/**
 * @param {secret} SLACK_WEBHOOK - Slack webhook
 * @param {secret} SLACK_CHANNEL - Channel to send notification to
 */

var words = ["delay", "delayed", "late", "terminated", "single tracking"];

module.exports = function(ctx, done) {
    var txt = ctx.data.text;
    var slack = require('slack-notify@0.1.4')(ctx.data.SLACK_WEBHOOK);
    for (var i in words) {
        if (txt.includes(words[i])) {
            console.log("Found a match for word " + words[i]);
            slack.send({
                channel: ctx.data.SLACK_CHANNEL,
                text: ctx.data.user + " raised an alert" + "\n" +
                      "Check it out at " + ctx.data.url
            });
        }
    }
    done(null, txt);
}
