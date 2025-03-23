define(['jquery', 'underscore', 'backbone', 'models/solar', 'views/alert', 'text!templates/solarData.html'],
function($, _, Backbone, SolarModel, AlertView, solarDataTemplate) {
    'use strict';
    var SolarDataView = Backbone.View.extend({
      className: 'data-container',
      template: _.template(solarDataTemplate),
      initialize: function() {
        this.model = new SolarModel();
        this.interval = setInterval((this.update).bind(this), window.updateInterval);
      },
      deinitialize: function() {
        clearInterval(this.interval);
      },
      update: function() {
        this.model.fetch({
          success: function() {
            if (this.model.get('error')) {
              this.$('.inverteravp').hide();
              this.$('.row-invdata').hide();
              this.$('.nodata').show();
            } else {
              this.$('.inverteravp').show();
              this.$('.row-invdata').show();
              this.$('.nodata').hide();
              this.$('.inverteravp .value').text(this.model.get('inverterAVP'));
              this.$('.inverterdec .value').text(this.model.get('inverterDEC'));
              this.$('.invertertec .value').text(this.model.get('inverterTEC'));
              this.$('.inverteracv .value').text(this.model.get('inverterACV'));
              this.$('.inverterdcv .value').text(this.model.get('inverterDCV'));
              this.$('.invertertemp .value').text(this.model.get('chassisSen1'));
              this.$('.inverterid .value').text(this.model.get('inverterID'));
              if ([this.model.get('P1sen1'), this.model.get('P2sen1'), this.model.get('P3sen1'), this.model.get('P4sen1')].indexOf(window.tempdevicedisctemp) +1) {
                this.$('.solararray').hide();
                this.$('.notempdata').show();
              } else {
                this.$('.solararray').show();
                this.$('.notempdata').hide();
                this.$('.solararray .p1 .temp').text(this.model.get('P1sen1') + ' °C');
                this.$('.solararray .p2 .temp').text(this.model.get('P2sen1') + ' °C');
                this.$('.solararray .p3 .temp').text(this.model.get('P3sen1') + ' °C');
                this.$('.solararray .p4 .temp').text(this.model.get('P4sen1') + ' °C');
              }
            }
          }.bind(this),
          error: function() {
            var alertView = new AlertView({
              type: 'danger',
              message: 'Daten konnten nicht geladen werden',
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

    return SolarDataView;
  });
