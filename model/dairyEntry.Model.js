import mongoose from 'mongoose';

const diaryEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  mood: String,
  content: String,
});

export default mongoose.model('DiaryEntry', diaryEntrySchema);
