define(['jquery', 'underscore', 'backbone'],
function($, _, Backbone) {
    'use strict';
    var ImagesModel = Backbone.Model.extend({
      url: '/images'
    });

    return ImagesModel;
  });
