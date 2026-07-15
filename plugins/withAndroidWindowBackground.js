const {
  withAndroidStyles,
  AndroidConfig,
} = require('@expo/config-plugins');

const SPLASH_COLOR = '@color/splashscreen_background';

function withAndroidWindowBackground(config) {
  return withAndroidStyles(config, (config) => {
    config.modResults = AndroidConfig.Styles.assignStylesValue(config.modResults, {
      add: true,
      parent: {
        name: 'AppTheme',
        parent: 'Theme.AppCompat.DayNight.NoActionBar',
      },
      name: 'android:windowBackground',
      value: SPLASH_COLOR,
    });
    return config;
  });
}

module.exports = withAndroidWindowBackground;
