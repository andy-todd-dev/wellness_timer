module.export = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["react-app", "react-app/jest"],
  parser: "@typescript-eslint/parser",
  parserOptions: { project: ["./tsconfig.json"] },
  plugins: ["react", "@typescript-eslint"],
  root: true
};
