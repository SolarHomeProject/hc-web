define('helpers/swsc_state_translate',[],function() {
    'use strict';
    return {
      translate: function(state) {
        var trans_dict = {
            'Override': 'Übersch.Ein',
            'Disabled': 'Deaktiviert',
            'Solar-Charge': 'Solar-Ladung',
            'Night-Charge': 'Nacht-Ladung',
            'Day-Charge': 'Tag-Ladung',
            'Idle': 'Aus'
        };
        if (state in trans_dict) {
            return trans_dict[state];
        } else {
            return false;
        }
      }
    };
  });