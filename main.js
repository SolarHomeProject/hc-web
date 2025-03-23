(function() {
    'use strict';
  
    window.slideTime = 100;
    window.updateInterval = 10000;
    window.tempdevicedisctemp = null;
  
    var xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        window.updateInterval = data.refresh_rate * 1000;
        window.tempdevicedisctemp = data.temp_dev_disconnected_c;
      }
    };
    xhr.open('GET', '/settings', false);
    xhr.send();
  
  }());
  
  require.config({
    paths: {
      backbone: 'node_modules/backbone/backbone',
      bootstrap: 'node_modules/bootstrap/dist/js/bootstrap.bundle',
      jquery: 'node_modules/jquery/dist/jquery',
      chart: 'node_modules/chart.js/dist/chart.umd',
      viewer: 'node_modules/viewerjs/dist/viewer',
      text: 'node_modules/text/text',
      underscore: 'node_modules/underscore/underscore',
    },
    shim: {
      bootstrap: ['jquery']
    }
  });
  
  require(['backbone'],
  function(Backbone) {
    'use strict';
    Backbone.View = Backbone.View.extend({
      deinitialize: function() {},
      addView: function(view) {
        this.children = this.children || {};
        var id = view.cid;
        this.children[id] = view;
        this.listenToOnce(view, 'destroy', function() {
          this.children[id] = null;
        }.bind(this));
      },
      destroy: function() {
        this.deinitialize();
        if (this.children) {
          for (var id in this.children) {
            if (this.children[id]) {
              this.children[id].destroy();
            }
          }
        }
        this.remove();
        this.trigger('destroy');
      }
    });
  });
  
  require(['jquery', 'underscore', 'views/header', 'routers/main'],
  function($, _, HeaderView, mainRouter) {
    'use strict';
  
    $(document).on('dblclick mousedown', '.no-select', false);
  
    var headerView = new HeaderView();
    $('body').prepend(headerView.render().el);
  
    mainRouter.initialize();
  });
