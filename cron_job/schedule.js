const cron = require('node-cron');



setInterval(() => {
    const now = new Date().getTime();
    const seconds = String(Math.floor((now % (1000 * 60)) / 1000));
    // console.clear()
    console.log(`now >> ${seconds}s`);
}, 1000);

cron.schedule('* * * * * *', () => {
    console.log('running a task every second');
});