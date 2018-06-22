const parser = require('rapla-parser-js');
const moment = require('moment');

function getEvents(req, res) {
  const { url, startDate, endDate } = req.query;
  res.header('Access-Control-Allow-Origin', 'https://rablabla.m320trololol.com');
  try {
    parser.fetchWeeks(url, moment(startDate), moment(endDate), (events) => {
      res.json(events);
    }, (err) => {
      res.status(942);
      res.send(err);
    });
  } catch (e) {
    res.status(943);
    res.send(e);
  }
}

module.exports = {
  getEvents,
};
