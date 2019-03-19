const {execSync} = require('child_process')
const conventionalRecommendedBump = require(`conventional-recommended-bump`);

conventionalRecommendedBump({
  preset: `angular`
}, (error, recommendation) => {
  console.log('recommendation: ', recommendation);
  const versionShell = `npm version ${recommendation.releaseType}`
  console.log('versionShell: ', versionShell);
  execSync(versionShell)

  const changelogShell = `npm run changelog`
  execSync(changelogShell)
});