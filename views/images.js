define('views/images',['jquery', 'underscore', 'backbone', 'viewer', 'collections/images', 'views/image', 'views/alert', 'text!templates/images.html'],
function($, _, Backbone, Viewer, ImagesCollection, ImageView, AlertView, imagesTemplate) {
    'use strict';
    var ImagesView = Backbone.View.extend({
      className: 'images-container',
      template: _.template(imagesTemplate),
      initialize: function() {
        this.collection = new ImagesCollection();
        this.viewer = null;
      },
      deinitialize: function() {
        if (this.viewer) {
          this.viewer.destroy();
        }
      },
      update: function() {
        this.collection.fetch({
          success: function() {
            this.collection.each(function(model) {
              this.$('.row-images').append(new ImageView({url: model.get('url'), date: model.get('date')}).render().el);
            }, this);
            this.viewer = new Viewer(this.$('.row-images')[0]);
          }.bind(this),
          error: function() {
            var alertView = new AlertView({
              type: 'danger',
              message: 'Galerie konnte nicht geladen werden',
              dismissable: true
            });
            $('.alerts-container').append(alertView.render().el);
            this.addView(alertView);
          }.bind(this)
        });
      },
      render: function() {
        this.$el.html(this.template());
        this.update();
        return this;
      }
    });

    return ImagesView;
  });