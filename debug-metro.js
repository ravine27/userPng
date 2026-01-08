const config = require('./metro.config.js');

console.log('--- Metro Config Debug ---');
if (config.resolver) {
    const assets = config.resolver.assetExts;
    const sources = config.resolver.sourceExts;

    const svgInAssets = assets.includes('svg');
    const svgInSources = sources.includes('svg');

    console.log(`SVG in assetExts: ${svgInAssets} (Should be false)`);
    console.log(`SVG in sourceExts: ${svgInSources} (Should be true)`);

    if (svgInAssets) {
        console.error('ERROR: SVG is still in assetExts! Metro will treat it as a number/asset.');
    }
    if (!svgInSources) {
        console.error('ERROR: SVG is NOT in sourceExts! Metro will not use the transformer.');
    }
} else {
    console.error('ERROR: Config does not have a resolver object.');
}
