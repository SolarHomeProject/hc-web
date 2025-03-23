define(['jquery', 'underscore', 'backbone'],
function($, _, Backbone) {
    'use strict';
    var AuthModel = Backbone.Model.extend({
      url: '/auth/session'
    });

    return AuthModel;
  });
