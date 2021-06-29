const { x_access_token } = require('../config/index')
const response = require('../utils/responses')

module.exports = (req, res, next) => {
    try {
        const accessToken = req.headers['x-access-token']

        if (!accessToken || accessToken !== x_access_token) throw new Error()
        return next()

    } catch (err) {
        return response.error(res, 'UNAUTHORIZED')
    }
}