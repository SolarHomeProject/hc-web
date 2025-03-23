define('views/energy',['jquery', 'underscore', 'backbone', 'views/energyData', 'views/energyChart', 'text!templates/energy.html'],
function($, _, Backbone, EnergyDataView, EnergyChartView, energyTemplate) {
    'use strict';
    var EnergyView = Backbone.View.extend({
      className: 'energy container',
      template: _.template(energyTemplate),
      initialize: function() {
        this.energyDataView = new EnergyDataView();
        this.energyChartView = new EnergyChartView();
        this.addView(this.energyDataView);
        this.addView(this.energyChartView);
      },
      render: function() {
        this.$el.html(this.template());
        this.$el.append(this.energyDataView.render().el);
        this.$el.append(this.energyChartView.render().el);
        return this;
      }
    });

    return EnergyView;
  });