import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: String,
  avatar: String,
  socialLinks: {
    instagram: String,
    twitter: String,
    portfolio: String
  }
});

export default mongoose.model('Profile', profileSchema);
