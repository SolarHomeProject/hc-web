define(['jquery', 'underscore', 'backbone', 'models/boiler', 'views/alert', 'helpers/swsc_state_translate', 'text!templates/boilerData.html'],
function($, _, Backbone, BoilerModel, AlertView, swsc_state_translate, boilerDataTemplate) {
    'use strict';
    var BoilerDataView = Backbone.View.extend({
      className: 'data-container',
      template: _.template(boilerDataTemplate),
      initialize: function() {
        this.model = new BoilerModel();
        this.interval = setInterval((this.update).bind(this), window.updateInterval);
      },
      deinitialize: function() {
        clearInterval(this.interval);
      },
      update: function() {
        this.model.fetch({
          success: function() {
            this.$('.boilertemp .value').text(this.model.get('boilertemp'));
            this.$('.state .value').text(swsc_state_translate.translate(this.model.get('state')));
            this.$('.csc .value').text(this.model.get('currentsolarcharge'));
            this.$('.nightstate .value').text(this.model.get('nightstate') ? 'EIN' : 'AUS');
            if (this.model.has('daystate')) {
              this.$('.daystate').show();
              this.$('.daystate .value').text(this.model.get('daystate') ? 'EIN' : 'AUS');
            }
            this.$('.overridestate .value').text(this.model.get('overridestate') ? 'EIN' : 'AUS');
          }.bind(this),
          error: function() {
            var alertView = new AlertView({
              type: 'danger',
              message: 'Daten konnten nicht geladen werden',
              dismissable: true
            });
            $('.alerts-container').append(alertView.render().el);
            this.addView(alertView);
          }.bind(this)
        });
      },
      render: function() {
        this.$el.html(this.template());
        this.update();
        return this;
      }
    });

    return BoilerDataView;
  });
