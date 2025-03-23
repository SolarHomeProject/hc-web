define(['jquery', 'underscore', 'backbone', 'bootstrap', 'text!templates/header.html'],
function($, _, Backbone, Bootstrap, headerTemplate) {
    'use strict';
    var HeaderView = Backbone.View.extend({
      tagName: 'header',
      template: _.template(headerTemplate),
      initialize: function() {
        HeaderView.__super__.initialize.call(this);
      },
      render: function() {
        this.$el.html(this.template());
        return this;
      }
    });

    return HeaderView;
  });
