const defaultTheme = require('tailwindcss/defaultTheme');

/**
 * @type {import("tailwindcss").Config}
 */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            inset: {
                '1/2': '50%',
            },
        },
        fontFamily: {
            sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        },
    },
};