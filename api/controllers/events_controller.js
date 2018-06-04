
var parser = require('rapla-parser-js');
var moment = require('moment');

function getEvents(req, res) {
  const { url, startDate, endDate } = req.query;
  parser.fetchWeeks(url, moment(startDate), moment(endDate), (events) => {
    res.json(events);
  }, (err) => {
    res.json(err);
  });
}

module.exports = {
  getEvents,
};
