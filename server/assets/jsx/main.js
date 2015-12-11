require.config({
  paths: {
    react: '../libraries/react/react',
    jquery: '../libraries/jquery/dist/jquery.min',
    lodash: '../libraries/lodash/dist/lodash.min',
    bootstrap: '../libraries/bootstrap/dist/js/bootstrap.min'
  },

  shim: {
    react: {
      exports: 'React'
    },

    jquery: {
      exports: '$'
    },

    lodash: {
      exports: '_'
    },

    bootstrap: {
      deps: ['jquery']
    }
  }
});

require([
  'react',
  'components/Demo',
  'jquery',
  'lodash',
  'bootstrap'
  ],
function(React, Demo) {
  React.renderComponent(Demo(), document.getElementById('app'));
});
