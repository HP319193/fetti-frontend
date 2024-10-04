module.exports = {
    presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript",
    ],
    plugins: [
        [
            "babel-plugin-module-resolver",
            {
                "alias": {
                    "@components": "./src/components",
                    "@styles": "./src/styles"
                }
            }
        ]
    ]
};
