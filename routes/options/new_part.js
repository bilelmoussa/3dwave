const validate_date = require("../../validations/date_validation");

function new_parts(req){
    const new_part ={
        printedPart: req.body.printedPart,
        workingHours: req.body.workingHours,
        timeAndDate: validate_date(req.body.timeAndDate),
        finishingTime: validate_date(req.body.finishingTime),
		failureCoef: req.body.failureCoef,
        actualWh: req.body.actualWh,
        weight:  req.body.weight,
        template: req.body.template,
        Remarks: req.body.Remarks,
		client_id: req.body.client_id,
    }
    return new_part;
}

module.exports = new_parts;