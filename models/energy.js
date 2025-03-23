define(['jquery', 'underscore', 'backbone'],
function($, _, Backbone) {
    'use strict';
    var EnergyModel = Backbone.Model.extend({
      url: '/energy'
    });

    return EnergyModel;
  });
