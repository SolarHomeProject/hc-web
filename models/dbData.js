define(['jquery', 'underscore', 'backbone'],
function($, _, Backbone) {
    'use strict';
    var DBDataModel = Backbone.Model.extend({
      url: function() {
        return '/dbdata/' + this.get('type') + '/' + this.query;
      },
      setQuery: function(query) {
        this.query = query;
      }
    });

    return DBDataModel;
  });
