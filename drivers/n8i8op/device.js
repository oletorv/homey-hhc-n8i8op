'use strict';

const Homey = require('homey');
const net = require('net');


var ipAddress;

module.exports = class n8i8op extends Homey.Device {

    onInit() {
        console.log('Device On Init: ' + this.getName());
        console.log('Device Capabilities: ' + this.getCapabilities());
        console.log('Device address: ' + this.getData().ipAddress);

        this.registerCapabilityListener('onoff', ( value, opts ) => {
            this.log('value', value);
            this.log('opts', opts);
            this.setRelayChannelToValue(1,value);
            return Promise.resolve();
          });
          this.registerCapabilityListener('onoff.1', ( value, opts ) => {
            this.log('value', value);
            this.log('opts', opts);
            this.setRelayChannelToValue(2,value);
            return Promise.resolve();
          });
          this.registerCapabilityListener('onoff.2', ( value, opts ) => {
            this.log('value', value);
            this.log('opts', opts);
            this.setRelayChannelToValue(3,value);
            return Promise.resolve();
          });
          this.registerCapabilityListener('onoff.3', ( value, opts ) => {
            this.log('value', value);
            this.log('opts', opts);
            this.setRelayChannelToValue(4,value);
            return Promise.resolve();
          });
          this.registerCapabilityListener('onoff.4', ( value, opts ) => {
            this.log('value', value);
            this.log('opts', opts);
            this.setRelayChannelToValue(5,value);
            return Promise.resolve();
          });
          this.registerCapabilityListener('onoff.5', ( value, opts ) => {
            this.log('value', value);
            this.log('opts', opts);
            this.setRelayChannelToValue(6,value);
            return Promise.resolve();
          });
          this.registerCapabilityListener('onoff.6', ( value, opts ) => {
            this.log('value', value);
            this.log('opts', opts);
            this.setRelayChannelToValue(7,value);
            return Promise.resolve();
          });
          this.registerCapabilityListener('onoff.7', ( value, opts ) => {
            this.log('value', value);
            this.log('opts', opts);
            this.setRelayChannelToValue(8,value);
            return Promise.resolve();
          });
         this.setNamesBasedOnSettings();
          

    }

    setNamesBasedOnSettings() {
        const settings = this.getSettings();
        var capOptions = this.getCapabilityOptions('onoff');
        this.log('Options ', capOptions['title']['en']);
        capOptions['title']['en'] = settings['relay_1_name'];
        this.setCapabilityOptions('onoff', capOptions);

        var ii;
        for (ii = 1; ii < 8; ii++) {
            capOptions = this.getCapabilityOptions('onoff.' + ii);
            this.log('Options ', capOptions['title']['en']);
            capOptions['title']['en'] = settings['relay_' + (ii + 1) + '_name'];
            this.setCapabilityOptions('onoff.' + ii, capOptions);
        }
    }

    async onSettings( oldSettingsObj, newSettingsObj, changedKeysArr ) {
        console.log('onSettings');
        this.setNamesBasedOnSettings();
    }

    onDiscoveryResult(discoveryResult) {
        console.log('Discovered device: ' + this.getData().id + ' ' + this.getName() + ' ' + discoveryResult.address);
        ipAddress = discoveryResult.address;
        return discoveryResult.id == this.getData().id;
    }

    async onDiscoveryAvailable(discoveryResult) {
        console.log('Device is available: ' + this.getData().id + ' ' + this.getName() + ' ' + discoveryResult.address);
        ipAddress = discoveryResult.address;
        /* Read the relay status at the start ! */
        this.readAndStoreRelayStatus();

    }
    onDiscoveryAddressChanged(discoveryResult) {
    // Update your connection details here, reconnect when the device is offline
    console.log('Address Changed');
    }
  
  onDiscoveryLastSeenChanged(discoveryResult) {
    // When the device is offline, try to reconnect here
    console.log('Last Seen Changed');
  }


  readAndStoreRelayStatus() {
    var client = new net.Socket();
    var mThis = this;
    client.connect(5000, ipAddress, function() {
        console.log('Connected !');
        client.write('read');
    });
    
    client.on('data', function(data) {
        console.log('RX: ' + data);
        var relay = String(data);
        var i;
        for (i = 0; i < 8; i++) {
            console.log('Channel ' + (i +1) + ':' + relay.split('relay')[1].charAt(7 - i));
            if (i == 0) mThis.setCapabilityValue('onoff', relay.split('relay')[1].charAt(7 - i) == '1');
            else mThis.setCapabilityValue('onoff.' + i, relay.split('relay')[1].charAt(7 - i) == '1');
        }
        
        client.destroy();
    });
    client.on('close', function() {
        console.log('Connection Closed');
    });
    client.on('error', function() {
        console.log('Connection failed');
    })
  }

  setRelayChannelToValue(channel,value) {
    var client = new net.Socket();
    var mThis = this;

    var request;
    
    if (value == true) {
        request = 'on' + channel;
    }
    else {
        request = 'off' + channel;
    }

    client.connect(5000, ipAddress, function() {
        console.log('Connected !');
        client.write(request);
    });

    client.on('data', function(data) {
        console.log('RX: ' + data);      
        client.destroy();
    });
    client.on('close', function() {
        console.log('Connection Closed');
    });
    client.on('error', function() {
        console.log('Connection failed');
    })
  }


}