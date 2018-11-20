// const parser = require('rapla-parser-js');
// const moment = require('moment');
const fs = require('fs');

const FILE_LOCATION = '/usr/local/share/rablabla/ics.json';

function handleICSFile(req, res, data, url) {
  console.log(data);
  const savedLinks = JSON.parse(data);
  if (savedLinks.indexOf(url) !== -1) {
    res.status(409);
    res.send('Link already exists');
    // TODO: return existing ics
  } else {
    // TODO: write link into file
    // generate first ics
    // schedule future cronjobs
    res.status(200);
    res.json(req.query);
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
