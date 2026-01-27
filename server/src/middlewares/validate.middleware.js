const validate = (schema) => async (req, res, next) => {
    try {
        const parseData = await schema.parseAsync(req.body);
        req.body = parseData;
        next();
    }
    catch(err) {
        const issues = err.issues[0].message ?? err.errors[0].message ?? [{ message: err.message }];
        // console.log(issues);
        res.status(400).json({ msg: issues });
    }
}

module.exports = validate;
