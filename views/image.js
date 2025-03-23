define(['jquery', 'underscore', 'backbone', 'text!templates/image.html'],
function($, _, Backbone, imageTemplate) {
    'use strict';
    var ImageView = Backbone.View.extend({
      className: 'image',
      template: _.template(imageTemplate),
      initialize: function(options) {
        this.options = options;
      },
      render: function() {
        this.$el.html(this.template({url: this.options.url, date: this.options.date}));
        return this;
      }
    });

    return ImageView;
  });
