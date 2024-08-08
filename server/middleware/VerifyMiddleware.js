const jwt = require("jsonwebtoken");

const blacklistedTokens = new Map(); // Store tokens with expiry times


function verifyToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ error: "Access denied" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token missing" });

   // Check if token is blacklisted and not expired
   const blacklistEntry = blacklistedTokens.get(token);
  //  console.log('blacklistedTokens: ', blacklistedTokens);
  //  console.log('blacklistEntry: ', blacklistEntry);
   if (blacklistEntry && blacklistEntry.expiry > Date.now()) {
     return res.status(401).json({ error: "Token has been invalidated" });
   }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('decoded44: ', decoded);
    req.id = decoded.id;
    next();
  } catch (error) {
    // console.log('error: ', error);
    res.status(401).json({ error: "Invalid token" });
  }
}

// Middleware to check if the token is blacklisted
function checkTokenBlacklist(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (token && blacklistedTokens.has(token)) {
    return res.status(401).json({ error: "Token has been invalidated" });
  }
  next();
}


// Function to blacklist a token
function blacklistToken(token) {
  const expiryTime = Date.now() + 3600000; // 1 hour from now
  blacklistedTokens.set(token, { expiry: expiryTime });
}


// Cleanup function to remove expired tokens
function cleanupExpiredTokens() {
  const now = Date.now();
  for (const [token, entry] of blacklistedTokens) {
    if (entry.expiry <= now) {
      blacklistedTokens.delete(token);
    }
  }
}

// Set up periodic cleanup (e.g., every hour)
setInterval(cleanupExpiredTokens, 3600000); // Run every hour

module.exports = { verifyToken, checkTokenBlacklist,blacklistToken};
