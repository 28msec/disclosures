'use script';

module.exports = {
    paths: {
        json: ['*.json'],
        js: ['gulpfile.js', 'www/**/*.js', '!www/lib/**/*.js'],
        sass: ['./scss/**/*.scss'],
        credentials: 'credentials.json'
    },
    credentials: {

    }
};