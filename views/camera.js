define(['jquery', 'underscore', 'backbone', 'views/images', 'text!templates/camera.html'],
function($, _, Backbone, ImagesView, cameraTemplate) {
    'use strict';
    var CameraView = Backbone.View.extend({
      className: 'camera container',
      template: _.template(cameraTemplate),
      initialize: function() {
        this.imagesView = new ImagesView();
        this.addView(this.imagesView);
      },
      render: function() {
        this.$el.html(this.template());
        this.$el.append(this.imagesView.render().el);
        return this;
      }
    });

    return CameraView;
  });
