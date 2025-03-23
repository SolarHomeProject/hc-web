define('views/chart',['jquery', 'underscore', 'backbone', 'chart', 'models/dbData', 'views/alert', 'text!templates/chart.html'],
function($, _, Backbone, Chart, DBDataModel, AlertView, chartViewTemplate) {
    'use strict';
    var ChartView = Backbone.View.extend({
      className: 'chart-data-container',
      template: _.template(chartViewTemplate),
      initialize: function(options) {
        this.model = new DBDataModel({type: options.type});
      },
      update: function() {
        this.model.fetch({
          success: function() {
            this.chart.data.labels = this.model.get('time');
            this.chart.data.datasets[0].data = this.model.get('value');
            this.chart.update();
          }.bind(this),
          error: function() {
            var alertView = new AlertView({
              type: 'danger',
              message: 'Diagramm-Daten konnten nicht geladen werden',
              dismissable: true
            });
            $('.alerts-container').append(alertView.render().el);
            this.addView(alertView);
          }.bind(this)
        });
      },
      render: function() {
        this.$el.html(this.template());
        this.chart = new Chart(this.$('.chart'), {
          type: 'bar',
          data: {
            labels: [],
            datasets: [{
              label: 'W',
              data: []
            }]
          }
        });
        return this;
      },
      setLabel: function(label) {
        this.chart.data.datasets[0].label = label;
      },
      setQuery: function(query) {
        this.model.setQuery(query);
        this.update();
      }
    });

    return ChartView;
  });