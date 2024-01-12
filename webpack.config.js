const fs = require('fs')
const path = require('path');
const pkg = require("./package.json");
const pluginConfig = require("./src/config.json");
const webpack = require('webpack');
pluginConfig.version = pkg.version;

// Adds BetterDiscord MetaData to the top of the emitted asset
const meta = (() => {
  const lines = ["/**"];
  for (const key in pluginConfig) {
    lines.push(` * @${key} ${pluginConfig[key]}`);
  }
  lines.push(" */");
  return lines.join("\n");
})();

// Locates BetterDiscord plugins folder and appends to it the emitted asset
const copyPlugin = {
apply: (compiler) => {
  compiler.hooks.assetEmitted.tap("ZigiPlugin", (filename, info) => {
    // console.log(info);
    // Check if the emitted asset is a .js file
    if (filename.endsWith('.js')) {
      const userConfig = (() => {
        if (process.platform === "win32") return process.env.APPDATA;
        if (process.platform === "darwin") return path.join(process.env.HOME, "Library", "Application Support");
        if (process.env.XDG_CONFIG_HOME) return process.env.XDG_CONFIG_HOME;
        return path.join(process.env.HOME, "Library", ".config");
      })();
      
      const bdFolder = path.join(userConfig, "BetterDiscord");
      const destinationPath = path.join(bdFolder, "plugins", filename);

      // Check if the .d.ts file exists before copying
      if (!fs.existsSync(info.targetPath)) {
        console.error(`❌ Source file does not exist: ${info.targetPath}`);
        return;
      }

      // Copy the file
      fs.copyFileSync(info.targetPath, destinationPath);
      console.log(`\n\n✅ Copied to BD folder\n`);
      console.log(`Emitted asset: ${filename}`);
      console.log(`Asset size: ${info.size} bytes`);
    }
  });
}

}

module.exports = {
  mode: "development",
  target: "node",
  devtool: false,
  entry: "./src/ZigiPlugin.js",
  output: {
    filename: "ZigiPlugin.plugin.js",
    path: path.join(__dirname, "dist"),
    libraryTarget: "commonjs2",
    libraryExport: "default",
    compareBeforeEmit: false
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
  },
  plugins: [
	new webpack.BannerPlugin({raw: true, banner: meta}),
	copyPlugin,
  ],
  module: {
	rules: [
		{test: /\.jsx$/, exclude: /node_modules/, use: "babel-loader"},
		{test: /\.ts|tsx$/, exclude: /node_modules/, use: "ts-loader"},
		{test: /\.css$/, use: "raw-loader"}
	],
  },
};