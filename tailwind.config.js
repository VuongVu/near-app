const defaultTheme = require('tailwindcss/defaultTheme');

/**
 * @type {import("tailwindcss").Config}
 */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    theme: {
        extend: {
            inset: {
                '1/2': '50%',
            },
        },
        fontFamily: {
            sans: ['Inter', ...defaultTheme.fontFamily.sans],
        },
    },
    daisyui: {
        themes: ['garden'],
    },
};
