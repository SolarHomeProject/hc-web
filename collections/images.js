define('collections/images',['jquery', 'underscore', 'backbone', 'models/images'],
    function($, _, Backbone, ImagesModel) {
        'use strict';
        var ImagesCollection = Backbone.Collection.extend({
          model: ImagesModel,
          url: '/images'
        });
      
        return ImagesCollection;
      });