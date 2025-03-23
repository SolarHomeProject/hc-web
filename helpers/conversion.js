define('helpers/conversion',[],function() {
    'use strict';
    return {
      wattsToKilowatts: function(watts) {
        var kilowatts = watts / 1000;
        if (kilowatts > 1) {
          return {value: kilowatts.toFixed(2), unit: 'kW'};
        } else {
          return {value: watts, unit: 'W'};
        }
      }
    };
  });