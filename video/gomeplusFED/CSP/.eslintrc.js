module.exports = {
    root: true,
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    env: {
        "browser": true,
        "node": true
    },
    // add your custom rules here
    'rules': {
        "semi": ["error", "always"],
        "quotes": ["error", "single"],
        "indent": [2, 4],
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
