define(['jquery', 'underscore', 'backbone'],
function($, _, Backbone) {
    'use strict';
    var BoilerModel = Backbone.Model.extend({
      url: '/boiler'
    });

    return BoilerModel;
  });
