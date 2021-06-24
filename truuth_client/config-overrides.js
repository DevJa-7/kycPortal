var path = require ('path');
var fs = require ('fs');
const {
    override,
    addDecoratorsLegacy,
    babelInclude,
    disableEsLint,
    addWebpackModuleRule
} = require("customize-cra");

module.exports = function (config, env) {
    return Object.assign(config, override(
        disableEsLint(),
        addDecoratorsLegacy(),
        /*Make sure Babel compiles the stuff in the common folder*/
        babelInclude([
            path.resolve('src'), // don't forget this
            // path.resolve('node_modules/shared_components/src')
            fs.realpathSync('node_modules/shared_components/src')
        ]),
        /* webpack module rule config */
        addWebpackModuleRule({
            test: /\.(gif|png|jpe?g|svg)$/, 
            use: [ 'file-loader' ]
        })
        )(config, env)
    )
}