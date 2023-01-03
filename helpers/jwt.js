const { expressjwt: jwt } = require('express-jwt');
const secret = process.env.JWT_SECRET;
const api    = process.env.API_URL;

const authJwt = jwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path: [
            {
                url: `${api}/users/login`,
                methods: ['POST']
            },
            {
                url: `${api}/users/register`,
                methods: ['POST']
            }
        ]
    });

module.exports = authJwt;