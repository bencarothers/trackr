require.config({
  paths: {
    react: '../libraries/react/react',
    jquery: '../libraries/jquery/dist/jquery.min',
    bootstrap: '../libraries/bootstrap/dist/js/bootstrap.min'
  },

  shim: {
    react: {
      exports: 'React'
    },

    jquery: {
      exports: '$'
    },

    bootstrap: {
      deps: ['jquery']
    }
  }
});

require([
  'react',
  'components/App',
  'jquery',
  'bootstrap'
  ],

function(React, App) {
  React.render(<App/>, document.getElementById('app'));
});
