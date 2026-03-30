import "@fontsource/bitter/300.css";
import "@fontsource/bitter/400.css";
import "@fontsource/bitter/500.css";
import "@fontsource/bitter/700.css";

export default {
  text: {
    base: "#ffffff", // main text (white on dark backgrounds)
    muted: "rgba(255,255,255,0.65)", // subtle text
    accent: "rgb(86,212,248)", // links, highlights
  },
  bg: {
    base: "rgb(43,19,90)", // main background
    surface: "rgb(55,30,110)", // cards, panels
    elevated: "rgb(67,41,130)", // popovers, overlays
  },
  border: "rgba(255,255,255,0.15)",
  fonts: {
    header: 'Bitter, "Helvetica Neue", Helvetica, Arial, sans-serif',
    text: 'Bitter, "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  fontSizes: {
    h1: "2.5cqw",
    h2: "1.667cqw",
    h3: "1.25cqw",
    text: "1.5cqw",
    monospace: "1cqw",
  },
  space: [8, 16, 24],
};
