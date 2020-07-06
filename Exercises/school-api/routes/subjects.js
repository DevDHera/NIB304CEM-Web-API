const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

let subjectsArray = [
    { id: 1, name: 'Web API', code: 'NIB304CEM' },
    { id: 2, name: 'IOS', code: 'NIB301CEM' },
];

router.get('/', (req, res) => {
    res.status(200).json({ success: true, data: subjectsArray });
});

router.get('/:id', (req, res) => {
    const subjectId = Number(req.params.id);
    const subject = subjectsArray.find((subject) => subject.id === subjectId);

    if (!subject) {
        return res
            .status(404)
            .json({ success: false, data: null, errors: [{ msg: 'The given id does not exists on our server' }] });
    }

    res.status(200).json({ success: true, data: subject });
});

router.post(
    '/',
    [
        check('name').notEmpty().withMessage('Subject name should not be empty'),
        check('code').not().isEmpty().withMessage('Subject code should not be empty'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, data: null, errors: errors.array() });
        }

        const newSubject = {
            id: subjectsArray.length > 0 ? subjectsArray[subjectsArray.length - 1].id + 1 : subjectsArray.length + 1,
            name: req.body.name,
            code: req.body.code,
        };

        subjectsArray.push(newSubject);

        res.status(201).json({ success: true, data: newSubject });
    },
);

router.put(
    '/:id',
    [
        check('name').notEmpty().withMessage('Subject name should not be empty'),
        check('code').not().isEmpty().withMessage('Subject code should not be empty'),
    ],
    (req, res) => {
        const subjectId = Number(req.params.id);
        const subject = subjectsArray.find((subject) => subject.id === subjectId);

        if (!subject) {
            return res
                .status(404)
                .json({ success: false, data: null, errors: [{ msg: 'The given id does not exists on our server' }] });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, data: null, errors: errors.array() });
        }

        subject.name = req.body.name;
        subject.code = req.body.code;

        res.status(200).json({ success: true, data: subject });
    },
);

router.delete('/:id', (req, res) => {
    const subjectId = Number(req.params.id);
    const subject = subjectsArray.find((subject) => subject.id === subjectId);

    if (!subject) {
        return res
            .status(404)
            .json({ success: false, data: null, errors: [{ msg: 'The given id does not exists on our server' }] });
    }

    subjectsArray = subjectsArray.filter((subject) => subject.id !== subjectId);

    res.status(200).json({ success: true, data: null });
});

module.exports = router;
