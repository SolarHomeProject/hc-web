define(['jquery', 'underscore', 'backbone'],
function($, _, Backbone) {
    'use strict';
    var SolarModel = Backbone.Model.extend({
      url: '/solar'
    });

    return SolarModel;
  });
