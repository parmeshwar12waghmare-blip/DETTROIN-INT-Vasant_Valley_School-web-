const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vasant_valley_school';

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

   cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
  console.log("✅ MongoDB Atlas Connected");
  return mongooseInstance;
});


  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
  console.error("❌ MongoDB Connection Error:", e);
  cached.promise = null;
  throw e;
}
  

  return cached.conn;
}

module.exports = connectToDatabase;
