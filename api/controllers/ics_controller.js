const fs = require('fs');

const FILE_LOCATION = '/usr/local/share/rablabla/ics.json';

function handleICSFile(req, res, data, url) {
  const savedLinks = JSON.parse(data);
  console.log(savedLinks);
  const reqICSObj = savedLinks.find(el => el.url === url);
  if (reqICSObj) {
    res.json({ link: reqICSObj.link });
  } else {
    // TODO construct link fail-safe
    const link = 'todo-notimplementedyet-ics-controller';
    savedLinks.push({ url, link });
    fs.writeFile(FILE_LOCATION, JSON.stringify(savedLinks), (wfErr) => {
      if (wfErr) {
        res.status(542);
        res.json(wfErr);
      } else {
        // TODO generate first ics
        // TODO schedule future cronjobs
        res.json({ link });
      }
    });
  }
}

function getICS(req, res) {
  const { url } = req.query;

  fs.readFile(FILE_LOCATION, (err, data) => {
    if (err) {
      fs.writeFile(FILE_LOCATION, '', (wfErr) => {
        if (wfErr) {
          res.status(542);
          res.json(wfErr);
        } else {
          handleICSFile(req, res, '', url);
        }
      });
    } else {
      handleICSFile(req, res, data, url);
    }
  });
}

module.exports = {
  getICS,
};
