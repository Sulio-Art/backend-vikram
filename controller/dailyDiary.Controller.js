import DailyDiary from '../model/dairyEntry.Model.js';

export const createDiaryEntry = async (req, res) => {
  try {
    const entry = await DailyDiary.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getDiaryEntries = async (req, res) => {
  try {
    const entries = await DailyDiary.find();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
