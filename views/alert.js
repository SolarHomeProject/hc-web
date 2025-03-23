define('views/alert',['jquery', 'underscore', 'backbone', 'text!templates/alert.html'],
function($, _, Backbone, alertTemplate) {
    'use strict';
    var AlertView = Backbone.View.extend({
      template: _.template(alertTemplate),
      events: {
        'click .btn-close': 'onClose'
      },
      initialize: function(options) {
        this.type = options.type;
        this.message = options.message;
        this.dismissable = options.dismissable;
        this.render();
      },
      render: function() {
        this.$el.html(this.template({
          type: this.type,
          message: this.message,
          dismissable: this.dismissable
        }));
        this.$el.hide();
        this.$el.slideDown(window.slideTime);
        return this;
      },
      onClose: function() {
        this.close();
      },
      close: function(complete) {
        this.$el.slideUp(window.slideTime, function() {
          this.destroy();
          if (complete) {
            complete();
          }
        }.bind(this));
      }
    });

    return AlertView;
  });