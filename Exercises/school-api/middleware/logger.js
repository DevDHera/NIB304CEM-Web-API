const colors = require('colors');
const stripAnsi = require('strip-ansi');

const logs = [];

colors.setTheme({
    info: 'cyan',
    warn: 'yellow',
    secondary: 'gray',
    error: 'red',
});

dateFormat = () => {
    return new Date(Date.now()).toUTCString();
};

isErrorLog = (statusCode) => {
    return statusCode === 200 || statusCode === 201 ? false : true;
};

logger = (req, res, next) => {
    res.on('finish', () => {
        const logMessage = `${dateFormat().secondary} | ${isErrorLog(res.statusCode) ? 'ERROR'.error : 'INFO'.info} | ${
            req.method.warn
        } | ${req.originalUrl} | ${res.statusCode}`;

        console.log(logMessage);

        logs.push(stripAnsi(logMessage));
        console.log(logs);
    });

    next();
};

module.exports = logger;
