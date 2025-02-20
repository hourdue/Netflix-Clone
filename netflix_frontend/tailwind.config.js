export default {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [function ({ addUtilities }) {
    addUtilities({
      ".hide-horizontal-scrollbar": {
        "&::-webkit-scrollbar": {
          display: "none",
          width: "0",
          height: "0",
        },
        "&::-webkit-scrollbar-track": {
          display: "none",
        },
        "&::-webkit-scrollbar-thumb": {
          display: "none",
        },
        "scrollbar-width": "none",
        "-ms-overflow-style": "none",
        "overflow-x": "scroll"
      },
      ".no-scrollbar": {
        "&::-webkit-scrollbar": {
          display: "none",
          width: "0",
          height: "0",
        },
        "scrollbar-width": "none",
        "-ms-overflow-style": "none",
        "overflow-x": "scroll"
      }
    });
  }],
}