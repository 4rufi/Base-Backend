const { OAuth2Client } = require('google-auth-library');

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(googleClientId);

const googleVerify = async (idToken = '') => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: googleClientId,
  });
  // const payload = ticket.getPayload();
  // const userid = payload['sub'];
  const { email, name, picture: img } = ticket.getPayload();
  return { email, name, img };
};

module.exports = {
  googleVerify,
};
