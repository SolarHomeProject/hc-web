define(['jquery', 'underscore', 'backbone', 'views/boilerData', 'views/boilerChart', 'text!templates/boiler.html'],
function($, _, Backbone, BoilerDataView, BoilerChartView, boilerTemplate) {
    'use strict';
    var BoilerView = Backbone.View.extend({
      className: 'boiler container',
      template: _.template(boilerTemplate),
      initialize: function() {
        this.boilerDataView = new BoilerDataView();
        this.boilerChartView = new BoilerChartView();
        this.addView(this.boilerDataView);
        this.addView(this.boilerChartView);
      },
      render: function() {
        this.$el.html(this.template());
        this.$el.append(this.boilerDataView.render().el);
        this.$el.append(this.boilerChartView.render().el);
        return this;
      }
    });

    return BoilerView;
  });
