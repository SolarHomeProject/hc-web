define('views/energyChart',['jquery', 'underscore', 'backbone', 'views/chart', 'text!templates/energyChart.html'],
function($, _, Backbone, ChartView, energyChartTemplate) {
    'use strict';
    var EnergyChartView = Backbone.View.extend({
      className: 'chart-container',
      template: _.template(energyChartTemplate),
      events: {
        'click .chart-data-toggle': 'onDataToggle'
      },
      initialize: function() {
        this.chartView = new ChartView({type: 'energy'});
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
          this.chartView.setQuery('today');
        }
        else if ($(evt.target).hasClass('yesterday')) {
          this.chartView.setQuery('yesterday');
        }
      }
    });

    return EnergyChartView;
  });