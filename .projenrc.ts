import { typescript } from 'projen';
import { TypeScriptJsxMode } from 'projen/lib/javascript';
const project = new typescript.TypeScriptAppProject({
  defaultReleaseBranch: 'main',
  name: 'TimelinesPlugin',
  projenrcTs: true,
  // deps: [],                /* Runtime dependencies of this module. */
  // description: "Timeline-ify your Discord, add filter tags and custom timelines.",  /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: [
    // Webpack
    'webpack',
    'webpack-cli',
    'raw-loader',
    // Babel
    '@babel/core',
    '@babel/preset-env',
    '@babel/preset-react',
    'babel-loader',
    // TypeScript
    'ts-loader',
    '@types/betterdiscord@github:zerthox/betterdiscord-types',
    '@types/react',
    // '@types/react-dom',
  ],
  tsconfigDev: {
    include: ['src/**/*.tsx'],
    compilerOptions: {
      declaration: false,
      jsx: TypeScriptJsxMode.REACT,
    },
  },
  tsconfig: {
    compilerOptions: {
      declaration: false,
      jsx: TypeScriptJsxMode.REACT,
    },
  },
  // packageName: undefined,  /* The "name" in package.json. */
});

project.tsconfig!.addInclude('src/**/*.tsx');
project.synth();