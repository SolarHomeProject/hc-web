define('routers/main',['jquery', 'underscore', 'backbone', 'models/auth', 'views/dashboard', 'views/energy', 'views/solar', 'views/boiler', 'views/camera', 'views/alert'],
function($, _, Backbone, AuthModel, DashboardView, EnergyView, SolarView, BoilerView, CameraView, AlertView) {
  'use strict';
  var Router = Backbone.Router.extend({
    routes: {
      '': 'dashboard',
      'dashboard': 'dashboard',
      'energy': 'energy',
      'solar': 'solar',
      'boiler': 'boiler',
      'camera': 'camera',
      'logout': 'logout'
    },
    initialize: function(data) {
      this.data = data;
    },
    dashboard: function() {
      $('header .navbar .nav a').removeClass('active');
      $('header .dashboard').addClass('active');
      this.loadPage(new DashboardView());
    },
    energy: function() {
      $('header .navbar .nav a').removeClass('active');
      $('header .energy').addClass('active');
      this.loadPage(new EnergyView());
    },
    solar: function() {
      $('header .navbar .nav a').removeClass('active');
      $('header .solar').addClass('active');
      this.loadPage(new SolarView());
    },
    boiler: function() {
      $('header .navbar .nav a').removeClass('active');
      $('header .boiler').addClass('active');
      this.loadPage(new BoilerView());
    },
    camera: function() {
      $('header .navbar .nav a').removeClass('active');
      $('header .camera').addClass('active');
      this.loadPage(new CameraView());
    },
    logout: function() {
      var authModel = new AuthModel({id: true});
      authModel.destroy({
        success: function() {
          if (window.sessionExpired) {
            window.location.replace('/login#expired');
          } else {
            window.location.replace('');
          }
        }.bind(this),
        error: function() {
          var alertView = new AlertView({
            type: 'danger',
            message: 'Logout fehlgeschlagen',
            dismissable: true
          });
          $('.alerts-container').append(alertView.render().el);
        }.bind(this)
      });
    },
    loadPage: function(view) {
      var curView = this.data.view;
      this.data.view = view;
      $(this.data.element).fadeOut(100, function() {
        if (curView) {
          curView = curView.destroy();
        }
        $(this.data.element).html(this.data.view.render().el);
        $(this.data.element).fadeIn(300);
      }.bind(this));
    }
  });

  var initialize = function() {
    var _ajax = Backbone.ajax;
    Backbone.ajax = function(options) {
      options.complete = function(response) {
        if (response.status === 401) {
          window.sessionExpired = true;
          Backbone.history.navigate('logout', {trigger: true});
        }
      };
      return _ajax.call(Backbone.$, options);
    };

    var data = {
      element: '#app',
      view: null
    };

    var router = new Router(data);
    Backbone.history.start();
    return router;
  };

  return {
    initialize: initialize
  };
});
