const Joi = require("joi");

class ReportValidation {
    setId() {
        this.id = Joi.number();
        return this
    }
    setStartTime() {
        this.start_time = Joi.date();
        return this
    }
    setEndTime(){
        this.end_time = Joi.date().min(Joi.ref('start_time'));
        return this
    }
}
const getIncomeReportJoiValidation = Joi.object(
    new ReportValidation()
    .setStartTime()
    .setEndTime()
).with('start_time','end_time');
const getDriverReportJoiValidation = Joi.object(
    new ReportValidation()
    .setId()
    .setStartTime()
    .setEndTime()
).with('start_time','end_time');
const getCarReportJoiValidation = Joi.object(
    new ReportValidation()
    .setId()
    .setStartTime()
    .setEndTime()
).with('start_time','end_time');


module.exports = {
    getIncomeReportJoiValidation,
    getDriverReportJoiValidation,
    getCarReportJoiValidation
}
