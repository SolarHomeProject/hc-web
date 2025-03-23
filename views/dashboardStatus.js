define('views/dashboardStatus',['jquery', 'underscore', 'backbone', 'models/dashboard', 'views/alert', 'helpers/conversion', 'helpers/swsc_state_translate', 'text!templates/dashboardStatus.html'],
function($, _, Backbone, DashboardModel, AlertView, conversion, swsc_state_translate, dashboardStatusTemplate) {
    'use strict';
    var DashboardStatusView = Backbone.View.extend({
      className: 'status-container',
      template: _.template(dashboardStatusTemplate),
      initialize: function() {
        this.model = new DashboardModel();
        this.interval = setInterval((this.update).bind(this), window.updateInterval);
      },
      deinitialize: function() {
        clearInterval(this.interval);
      },
      update: function() {
        this.model.fetch({
          success: function() {
            this.$('.inverteravp .value').text(this.model.get('inverterAVP'));
            this.$('.inverterdec .value').text(this.model.get('inverterDEC'));
            var conv = conversion.wattsToKilowatts(this.model.get('total_power'));
            this.$('.total_power .value').text(conv.value);
            this.$('.total_power .unit').text(conv.unit);
            this.$('.boilerstatus .value').text(swsc_state_translate.translate(this.model.get('state')));
            this.$('.boilertemp .value').text(this.model.get('boilertemp'));
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

    return DashboardStatusView;
  });