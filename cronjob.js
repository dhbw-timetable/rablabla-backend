const { exec } = require('child_process');
const fs = require('fs');

const FILE_LOCATION = '/usr/local/share/rablabla/ics.json';

exec('sudo crontab -r', () => {
  fs.readFile(FILE_LOCATION, (err, data) => {
    if (err) {
      fs.writeFile(FILE_LOCATION, '[]', (wfErr) => {
        if (wfErr) {
          console.error(wfErr);
        }
      });
    } else {
      const icsJobs = JSON.parse(data);
      console.log(icsJobs);
      icsJobs.forEach((job) => {
        exec(`(sudo crontab -u root -l ; echo "0 0 * * * /usr/local/bin/node /usr/local/share/rablabla/generateICS.js ${job.url}") | sudo crontab -u root -`, (execErr) => {
          if (execErr) {
            console.error(err);
          }
          console.log(`Created cronjob for ${job.url}`);
        });
      });
    }
  });
});
