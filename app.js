'use strict';

const Homey = require('homey');
const net = require('net');
const { ManagerDiscovery } = require('homey');

class MyApp extends Homey.App {
	
	onInit() {
		this.log('Started HHC-N8I8OP Relay Controller Driver');
	
	// Register actions for flows
	this._actionSwitchTwoTurnOff = new Homey.FlowCardAction('action_turn_on_relay')
	.register()
	.registerRunListener((args, state) => {
		this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch on channel: ' + args.channel);
		var capability;
		if (args.channel == 1) {
			capability = 'onoff';
		}
		else {
			capability = 'onoff.' + (args.channel - 1);
		}
		return args.device.triggerCapabilityListener(capability, true, {});
	});
	// Register actions for flows
	this._actionSwitchTwoTurnOff = new Homey.FlowCardAction('action_turn_off_relay')
	.register()
	.registerRunListener((args, state) => {
		this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off channel: ' + args.channel);
		var capability;
		if (args.channel == 1) {
			capability = 'onoff';
		}
		else {
			capability = 'onoff.' + (args.channel - 1);
		}
		return args.device.triggerCapabilityListener(capability, false, {});
	});
	}
	
}

module.exports = MyApp;