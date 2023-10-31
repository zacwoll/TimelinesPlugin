import { typescript } from 'projen';
const project = new typescript.TypeScriptAppProject({
  defaultReleaseBranch: 'main',
  name: 'TimelinesPlugin',
  projenrcTs: true,
  // deps: [],                /* Runtime dependencies of this module. */
  // description: "Timeline-ify your Discord, add filter tags and custom timelines.",  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();