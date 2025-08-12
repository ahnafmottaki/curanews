const admin = require("firebase-admin");

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SDK, "base64").toString("utf-8")
);

module.exports = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
};
