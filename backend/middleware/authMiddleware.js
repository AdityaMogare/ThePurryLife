const admin = require('firebase-admin');

const authMiddleware = async (req, res, next) => {
  // 1. Get the token from the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // If no token is provided, deny access
    return res.status(401).send({ message: 'Unauthorized: No token provided' });
  }

  // 2. Extract the token
  const idToken = authHeader.split('Bearer ')[1];

  try {
    // 3. Verify the token using Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // 4. Token is valid! Attach the user's info to the request object
    // We'll use the 'uid' (Firebase UID) to find our user
    req.user = decodedToken; 

    // 5. Pass control to the next function (the actual route logic)
    next();

  } catch (error) {
    // Token is invalid (expired, wrong signature, etc.)
    console.error('Error verifying Firebase token:', error);
    return res.status(403).send({ message: 'Forbidden: Invalid token' });
  }
};

module.exports = authMiddleware;