module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  test: "/\.(png|svg|jpg|jpeg|gif|ico)$/",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
       
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
