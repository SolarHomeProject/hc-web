define('views/solar',['jquery', 'underscore', 'backbone', 'views/solarData', 'views/solarChart', 'text!templates/solar.html'],
function($, _, Backbone, SolarDataView, SolarChartView, solarTemplate) {
    'use strict';
    var SolarView = Backbone.View.extend({
      className: 'solar container',
      template: _.template(solarTemplate),
      initialize: function() {
        this.solarDataView = new SolarDataView();
        this.solarChartView = new SolarChartView();
        this.addView(this.solarDataView);
        this.addView(this.solarChartView);
      },
      render: function() {
        this.$el.html(this.template());
        this.$el.append(this.solarDataView.render().el);
        this.$el.append(this.solarChartView.render().el);
        return this;
      }
    });

    return SolarView;
  });