define(['jquery', 'underscore', 'backbone'],
function($, _, Backbone) {
    'use strict';
    var DashboardModel = Backbone.Model.extend({
      url: '/dashboard'
    });

    return DashboardModel;
  });
