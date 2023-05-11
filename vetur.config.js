module.exports = {
  settings: {
    "vetur.useWorkspaceDependencies": true,
    "vetur.experimental.templateInterpolationService": true,
  },
  projects: [
    "./frontend",
    {
      root: "./frontend",
      package: "./frontend/package.json",
      tsconfig: "./frontend/tsconfig.ts",
      snippetFolder: "./.vscode/vetur/snippets",
      globalComponents: ["./frontend/components/**/*.vue"],
    },
  ],
};
