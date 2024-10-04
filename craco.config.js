const path = require('path');
// const { compilerOptions } = require('./tsconfig.path.json');

module.exports = {
    webpack: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
        },
    },
};
