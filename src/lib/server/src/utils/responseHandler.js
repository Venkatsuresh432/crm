exports.success = (res, message, data = null, status = 200) => {
    return res.status(status).json({ success: true, message, data});
}

exports.error = (res, message, status = 500) => {
    return res.status(status).json({ success: false, message });
}

exports.notFound = (res, message = "Not Found", status = 404) => {
    return res.status(status).json({ success: false, message });
}