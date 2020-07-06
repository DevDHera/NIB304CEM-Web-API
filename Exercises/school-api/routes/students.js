const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

let studentsArray = [
    { id: 1, surname: 'Dissanayake', initials: 'DMKG', batch: '19.1', course: 'BSc (Hons) Computing' },
    { id: 2, surname: 'Wijekoon', initials: 'CB', batch: '19.1', course: 'BSc (Hons) Computing' },
    { id: 3, surname: 'Fayik', initials: 'MM', batch: '19.1', course: 'BSc (Hons) Computing' },
];

router.get('/', (req, res) => {
    res.status(200).json({ success: true, data: studentsArray });
});

router.get('/:id', (req, res) => {
    const studentId = Number(req.params.id);
    const student = studentsArray.find((student) => student.id === studentId);

    if (!student) {
        return res
            .status(404)
            .json({ success: false, data: null, errors: [{ msg: 'The given id does not exists on our server' }] });
    }

    res.status(200).json({ success: true, data: student });
});

router.post(
    '/',
    [
        check('surname').notEmpty().withMessage('Surname should not be empty'),
        check('initials').not().isEmpty().withMessage('Initials should not be empty'),
        check('batch').not().isEmpty().withMessage('Batch should not be empty'),
        check('course').not().isEmpty().withMessage('Course should not be empty'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, data: null, errors: errors.array() });
        }

        const newStudent = {
            id: studentsArray.length > 0 ? studentsArray[studentsArray.length - 1].id + 1 : studentsArray.length + 1,
            surname: req.body.surname,
            initials: req.body.initials,
            batch: req.body.batch,
            course: req.body.course,
        };

        studentsArray.push(newStudent);

        res.status(201).json({ success: true, data: newStudent });
    },
);

router.put(
    '/:id',
    [
        check('surname').notEmpty().withMessage('Surname should not be empty'),
        check('initials').not().isEmpty().withMessage('Initials should not be empty'),
        check('batch').not().isEmpty().withMessage('Batch should not be empty'),
        check('course').not().isEmpty().withMessage('Course should not be empty'),
    ],
    (req, res) => {
        const studentId = Number(req.params.id);
        const student = studentsArray.find((student) => student.id === studentId);

        if (!student) {
            return res
                .status(404)
                .json({ success: false, data: null, errors: [{ msg: 'The given id does not exists on our server' }] });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, data: null, errors: errors.array() });
        }

        student.surname = req.body.surname;
        student.initials = req.body.initials;
        student.batch = req.body.batch;
        student.course = req.body.course;

        res.status(200).json({ success: true, data: student });
    },
);

router.delete('/:id', (req, res) => {
    const studentId = Number(req.params.id);
    const student = studentsArray.find((student) => student.id === studentId);

    if (!student) {
        return res
            .status(404)
            .json({ success: false, data: null, errors: [{ msg: 'The given id does not exists on our server' }] });
    }

    studentsArray = studentsArray.filter((student) => student.id !== studentId);

    res.status(200).json({ success: true, data: null });
});

module.exports = router;
