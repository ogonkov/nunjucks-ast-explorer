module.exports = function(api) {
    api.cache(true);

    return {
        sourceType: 'unambiguous',

        presets: [
            '@babel/preset-env'
        ],

        plugins: [
            '@babel/plugin-proposal-class-properties',
            ['@babel/plugin-transform-runtime', {
                corejs: 3
            }]
        ]
    };
}
