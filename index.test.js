const nock = require('nock');
const core = require('@actions/core');
const action = require('./lib');

test('returns expired and expiration date', async () => {
  // Given
  const inputs = {
    'api-key': 'test-key',
    name: 'opt',
    ext: 'nc',
  };
  jest.spyOn(core, 'getInput').mockImplementation(n => inputs[n]);

  const setOutput = jest.spyOn(core, 'setOutput');

  nock('https://domaine-nc.p.rapidapi.com', {
    reqheaders: {
      'x-rapidapi-host': 'domaine-nc.p.rapidapi.com',
      'x-rapidapi-key': 'test-key',
    },
  })
    .get('/opt/nc')
    .reply(200, {
      expired: false,
      dateExpiration: '2021-12-28',
      nbDaysBeforeExpires: 45
    });

  // When
  await action();

  // Then
  expect(setOutput).toBeCalledWith('expired', false);
  expect(setOutput).toBeCalledWith('expirationDate', "2021-12-28");
});
