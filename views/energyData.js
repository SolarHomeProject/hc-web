define('views/energyData',['jquery', 'underscore', 'backbone', 'models/energy', 'views/alert', 'helpers/conversion', 'text!templates/energyData.html'],
function($, _, Backbone, EnergyModel, AlertView, conversion, energyDataTemplate) {
    'use strict';
    var EnergyDataView = Backbone.View.extend({
      className: 'data-container',
      template: _.template(energyDataTemplate),
      initialize: function() {
        this.model = new EnergyModel();
        this.interval = setInterval((this.update).bind(this), window.updateInterval);
      },
      deinitialize: function() {
        clearInterval(this.interval);
      },
      update: function() {
        this.model.fetch({
          success: function() {
            var conv = conversion.wattsToKilowatts(this.model.get('total_power'));
            this.$('.total_power .value').text(conv.value);
            this.$('.total_power .unit').text(conv.unit);
            this.$('.p1 .power .value').text(this.model.get('emeters')[0].power);
            this.$('.p1 .amps .value').text(this.model.get('emeters')[0].current);
            this.$('.p1 .voltage .value').text(this.model.get('emeters')[0].voltage);
            this.$('.p2 .power .value').text(this.model.get('emeters')[1].power);
            this.$('.p2 .amps .value').text(this.model.get('emeters')[1].current);
            this.$('.p2 .voltage .value').text(this.model.get('emeters')[1].voltage);
            this.$('.p3 .power .value').text(this.model.get('emeters')[2].power);
            this.$('.p3 .amps .value').text(this.model.get('emeters')[2].current);
            this.$('.p3 .voltage .value').text(this.model.get('emeters')[2].voltage);
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

    return EnergyDataView;
  });