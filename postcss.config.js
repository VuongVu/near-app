module.exports = {
    plugins: {
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
        'postcss-flexbugs-fixes': {},
        'postcss-preset-env': {
            autoprefixer: {
                flexbox: 'no-2009',
            },
            stage: 3,
            features: {
                'nesting-rules': false,
            },
        },
        ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    },
};
