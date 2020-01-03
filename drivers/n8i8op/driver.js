'use strict';

const Homey = require('homey');

module.exports = class n8i8opDriver extends Homey.Driver {




    onPair( socket ) {
        console.log('onPair');
        const discoveryStrategy = this.getDiscoveryStrategy();
      const discoveryResults = discoveryStrategy.getDiscoveryResults();
      
      const devices = Object.values(discoveryResults).map(discoveryResult => {
        return {
          name: 'HHC-N8I8OP (' + discoveryResult.address + ')',
          data: {
            id: discoveryResult.id,
            ipAddress: discoveryResult.address
          }
        };
      });
    
        socket.on('list_devices', function( data, callback ) {
          console.log('Emitting list_devices');
          // emit when devices are still being searched
          socket.emit('list_devices', devices );
    
          // fire the callback when searching is done
          callback( null, devices );
    
          // when no devices are found, return an empty array
          // callback( null, [] );
    
          // or fire a callback with Error to show that instead
          // callback( new Error('Something bad has occured!') );
        });
        
      }



    onPairListDevices(data, callback) {
      console.log('onPairListDevices:');
      const discoveryStrategy = this.getDiscoveryStrategy();
      const discoveryResults = discoveryStrategy.getDiscoveryResults();
      
      const devices = Object.values(discoveryResults).map(discoveryResult => {
        return {
          name: discoveryResult.txt.name,
          data: {
            id: discoveryResult.id,
            ipAddress: discoveryResult.address
          }
        };
      });
      callback(null, devices);
    }




  }