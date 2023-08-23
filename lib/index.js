const axios = require('axios').default,   Jwt = require('./jwt'),querystring = require('querystring');

module.exports.getToken = async function (params, cb) {
  let jwt = new Jwt(params);
  try {
    const response = await axios.post(
      jwt.postUrl,
     {
        "grant_type": 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        "assertion": jwt.token
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
    );

    if(response.status === 200) {
      return cb(null, response.data);
    } else {
      return cb(response.data, null);
    }
  } catch (error) {
    return cb(error,null);
  }
}
