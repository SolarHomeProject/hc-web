define(['jquery', 'underscore', 'backbone', 'views/chart', 'text!templates/solarChart.html'],
function($, _, Backbone, ChartView, solarChartTemplate) {
    'use strict';
    var SolarChartView = Backbone.View.extend({
      className: 'chart-container',
      template: _.template(solarChartTemplate),
      events: {
        'click .chart-data-toggle': 'onDataToggle'
      },
      initialize: function() {
        this.chartView = new ChartView({type: 'solar'});
        this.addView(this.chartView);
      },
      render: function() {
        this.$el.html(this.template());
        this.$el.append(this.chartView.render().el);
        this.chartView.setQuery('today');
        return this;
      },
      onDataToggle: function(evt) {
        this.$('.chart-data-toggle').removeClass('active');
        $(evt.target).addClass('active');

        if ($(evt.target).hasClass('today')) {
          this.chartView.setLabel('W');
          this.chartView.setQuery('today');
        }
        else if ($(evt.target).hasClass('yesterday')) {
          this.chartView.setLabel('W');
          this.chartView.setQuery('yesterday');
        }
        else if ($(evt.target).hasClass('year')) {
          this.chartView.setLabel('kW/h');
          this.chartView.setQuery('year');
        }
      }
    });

    return SolarChartView;
  });
