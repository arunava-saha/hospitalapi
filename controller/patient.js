const Report = require('../models/report');
const User = require('../models/users');

const register = async (req, res) => {
    try {
        let user = await User.findOne({ Username: req.body.number })
        console.log(user);
        if (user) {
            return res.status(200).json({
                message: 'User Already Registered',
                data: user
            })
        }

        user = await User.create({
            Username: req.body.number,
            Name: req.body.name,
            Password: req.body.number,
            isDoctor: false
        });
        console.log(user);
        return res.status(201).json({
            message: 'Patient registered successfully',
            data: user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
const createReport = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(422).json({
                message: "Patient Does not exist"
            })
        }

        const report = await Report.create({
            createdByDoctor: req.user.id,
            patient: req.params.id,
            status: req.body.status,
            date: new Date()
        })
        user.Report.push(report)

        return res.status(201).json({
            message: 'Report created successfully',
            data: report
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const allReports = async (req, res) => {
    try {
        const reports = await Report.findById({ patient: req.params.id }).populate('createdByDoctor').sort('date')

        const reportData = reports.map(report => {
            const originalDate = report.date;
            const dateObj = new Date(originalDate);

            const formattedDate = dateObj.toLocaleString("en-US", {
                year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false
            });

            return {
                createdByDoctor: report.createdByDoctor.name,
                status: report.status,
                date: formattedDate
            };
        });

        return res.status(200).json({
            message: `List of Reports of User with id -  ${req.params.id}`,
            reports: reportData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    register, createReport, allReports
}