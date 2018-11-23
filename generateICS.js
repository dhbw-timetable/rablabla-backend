// usage: node generateICS.js https://rapla.dhbw-stuttgart.de/rapla?key=skhsfkusgfnskfjgndkfj-lcejo
// write one single ics file to the frontend shared folder https://rablabla.hobbytes.de/livecalendar/skhsfkusgfnskfjgndkfj-lcejo/calendar.ics
const parser = require('rapla-parser-js');
const moment = require('moment');
const crypto = require('crypto');

/**
 * CLI arguments. Expected arguments:
 * 0 - string - URL of the rabla table
 */
const args = process.argv;

if (args.length !== 1) {
  console.error(`ICS generation script called with ${args.length}, expected exactly one parameter!`);
} else {
  const url = args[0];
  const keyRegex = /key=?([-a-zA-Z0-9@:%_+.~#&//=]*)/;
  const key = url.match(keyRegex)[1];

  fetchData(key, (err, events) => {
    if (err) {
      console.error(err);
    } else {
      const hashedKey = hash(key);
      saveData(events, hashedKey);
    }
  });
}

/**
 * Fetches all calendar events of this year from the specified calendar.
 * @param {string} url Calendar url
 * @param {function} callback Callback that will be called with an Array of events.
 */
function fetchData(url, callback) {
  try {
    parser.fetchWeeks(url, moment().startOf('year'), moment().endOf('year'), (events) => {
      const eventsICS = [].concat(...Object.values(events)).map(event => ({
        start: convertToUnlovedFormat(moment(event.startDate, 'HH:mm DD.MM.YYYY')),
        end: convertToUnlovedFormat(moment(event.endDate, 'HH:mm DD.MM.YYYY')),
        title: event.title,
        description: event.ressources,
        location: 'Duale Hochschule Baden Württemberg',
        url,
      }));
      callback(eventsICS);
    }, (err) => {
      console.error(err);
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * Saves the given event array to a file.
 * @param {Array} data An array of events
 * @param {string} id Id of the .ics file to be saved.
 */
function saveData(data, id) {
  console.log(id);
}

/**
 * Hashes the given parameter
 * @param {string} s String to hash
 */
function hash(s) {
  const hash = crypto.createHash('sha256');
  hash.update(s);
  return hash.digest('hex');
}

/**
 * Nothing to see here - go ahead.
 * (This function converts nice MomentJs dates into an Array of numbers...
 * Like this is some Math class or what do I know ._.)
 * @param {object} beautifulMomentObj MomentJs date
 */
function convertToUnlovedFormat(beautifulMomentObj) {
  return [beautifulMomentObj.year(), beautifulMomentObj.month(), // Awww no moment.js
    beautifulMomentObj.day(), beautifulMomentObj.hours(), // Please save me from this hell
    beautifulMomentObj.minutes()]; // complete crap
}
