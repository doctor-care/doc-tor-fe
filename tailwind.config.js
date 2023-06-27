/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        extend: {
            colors: {
                primary: '#1977CC', // Thêm màu primary
                custom: {
                    100: '#F0F4F8', // Tùy chỉnh màu custom với các biến thay đổi độ đậm
                    200: '#D9E2EC',
                    300: '#BCCCDC',
                    // Thêm các giá trị màu khác
                },
            },
        },
    },
    plugins: [],
};
