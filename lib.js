const core = require('@actions/core');
var axios = require('axios').default;

module.exports = async function () {
  try {
    const apiKey = core.getInput('api-key');
    const name = core.getInput('name');
    const ext = core.getInput('ext');

    const response = await axios({
      method: 'GET',
      url: `https://domaine-nc.p.rapidapi.com/${name}/${ext}`,
      headers: {
        'x-rapidapi-host': 'domaine-nc.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
      },
    });

    if (response.data.expired) {
      core.wan(`⚠️ ${name}.${ext} is expired since ${response.data.dateExpiration} ⚠️`);
    } else {
      core.info(`✅ ${name}.${ext} expires within ${response.data.nbDaysBeforeExpires} day(s)`);
    }

    core.setOutput('expired', response.data.expired);
    core.setOutput('expirationDate', response.data.dateExpiration);
    core.setOutput('daysBeforeExpiration', response.data.nbDaysBeforeExpires);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      core.setFailed('HTTP 401 : maybe invalid api-key ?');
    } else {
      core.setFailed(error);
    }
  }
};
