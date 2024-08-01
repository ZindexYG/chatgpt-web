module.exports = {
  root: true,
  extends: ['@antfu/eslint-config'],
  rules: {
    'no-tabs': 'off', // 或者 'no-tabs': 0
    // 如果你想要允许 tabs 但只给出警告，可以使用：
    // 'no-tabs': 'warn', // 或者 'no-tabs': 1
  },
}
