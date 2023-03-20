require('dotenv-cra').config() // https://github.com/gsoft-inc/craco/issues/180

const {
  CracoTheme,
  CracoAppLessPlugin,
  CracoCompatibility,
  CracoWasm,
  CracoSilence,
  CracoAnalyzer,
} = require('@sentre/craco-plugins')

module.exports = {
  plugins: [
    {
      plugin: CracoAppLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
              '@ant-prefix': 'sentre-noti',
            },
          },
        },
      },
    },
    {
      plugin: CracoTheme,
      options: {
        theme: ['light', 'dark'],
        // uniqueName: process.env.REACT_APP_ID,
      },
    },
    {
      plugin: CracoCompatibility,
    },
    {
      plugin: CracoWasm,
    },
    {
      plugin: CracoSilence,
    },
    {
      plugin: CracoAnalyzer,
    },
  ],
}
