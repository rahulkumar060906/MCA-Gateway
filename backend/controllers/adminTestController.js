const Test = require('../models/Test');
const Question = require('../models/Question');

// List all tests (with pagination & filtering)
exports.listTests = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const search = req.query.search || '';
        const filter = search ? { title: { $regex: search, $options: 'i' } } : {};
        const tests = await Test.find(filter)
            .populate('questions')
            .skip((page - 1) * limit)
            .limit(limit);
        const total = await Test.countDocuments(filter);
        res.json({ tests, total, page, pages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single test by ID
exports.getTest = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id).populate('questions');
        if (!test) return res.status(404).json({ message: 'Test not found' });
        res.json(test);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new test
exports.createTest = async (req, res) => {
    try {
        const { title, description, questions, duration, subject } = req.body;
        const test = new Test({ title, description, questions, duration, subject });
        await test.save();
        res.status(201).json(test);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data', error: err.message });
    }
};

// Update a test
exports.updateTest = async (req, res) => {
    try {
        const { title, description, questions, duration, subject, isActive } = req.body;
        const test = await Test.findByIdAndUpdate(
            req.params.id,
            { title, description, questions, duration, subject, isActive },
            { new: true }
        );
        if (!test) return res.status(404).json({ message: 'Test not found' });
        res.json(test);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data', error: err.message });
    }
};

// Delete a test
exports.deleteTest = async (req, res) => {
    try {
        const test = await Test.findByIdAndDelete(req.params.id);
        if (!test) return res.status(404).json({ message: 'Test not found' });
        res.json({ message: 'Test deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a question to a test
exports.addQuestion = async (req, res) => {
    try {
        const { text, options, answer, explanation, subject, difficulty } = req.body;
        const question = new Question({ text, options, answer, explanation, subject, difficulty });
        await question.save();
        const test = await Test.findByIdAndUpdate(
            req.params.id,
            { $push: { questions: question._id } },
            { new: true }
        ).populate('questions');
        if (!test) return res.status(404).json({ message: 'Test not found' });
        res.status(201).json(test);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data', error: err.message });
    }
};

// Edit a question
exports.updateQuestion = async (req, res) => {
    try {
        const { text, options, answer, explanation, subject, difficulty } = req.body;
        const question = await Question.findByIdAndUpdate(
            req.params.qid,
            { text, options, answer, explanation, subject, difficulty },
            { new: true }
        );
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.json(question);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data', error: err.message });
    }
};

// Delete a question from a test
exports.deleteQuestion = async (req, res) => {
    try {
        const test = await Test.findByIdAndUpdate(
            req.params.id,
            { $pull: { questions: req.params.qid } },
            { new: true }
        ).populate('questions');
        await Question.findByIdAndDelete(req.params.qid);
        if (!test) return res.status(404).json({ message: 'Test not found' });
        res.json(test);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
