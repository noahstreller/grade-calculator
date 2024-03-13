/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin')
const withSerwist = require("@serwist/next").default({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
});

module.exports = withSerwist(
    nextTranslate({
        reactStrictMode: false,
    })
);