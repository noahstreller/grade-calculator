/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin')
const withSerwist = require("@serwist/next").default({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

module.exports = withSerwist(
    nextTranslate({
        reactStrictMode: false,
    })
);