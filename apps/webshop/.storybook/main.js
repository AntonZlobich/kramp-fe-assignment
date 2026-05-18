module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-actions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
};
