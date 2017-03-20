
define( 'steal-svelte@1.0.0#template.html!steal-svelte-plugin', function () { 'use strict';

function applyComputations ( state, newState, oldState, isInitial ) {
	if ( isInitial || ( 'time' in newState && typeof state.time === 'object' || state.time !== oldState.time ) ) {
		state.hours = newState.hours = template.computed.hours( state.time );
	}

	if ( isInitial || ( 'time' in newState && typeof state.time === 'object' || state.time !== oldState.time ) ) {
		state.minutes = newState.minutes = template.computed.minutes( state.time );
	}

	if ( isInitial || ( 'time' in newState && typeof state.time === 'object' || state.time !== oldState.time ) ) {
		state.seconds = newState.seconds = template.computed.seconds( state.time );
	}
}

var template = (function () {
	return {
		data: function () {
			return {
				// clock face markers - major (every 5 minutes) and minor (every minute)
				major: new Array( 12 ),
				minor: new Array( 60 ),
				time: new Date()
			};
		},

		computed: {
			hours: time => time.getHours(),
			minutes: time => time.getMinutes(),
			seconds: time => time.getSeconds()
		},

		oncreate: function () {
			this.interval = setInterval( () => {
				this.set({ time: new Date() });
			}, 1000 );
		},

		ondestroy: function () {
			clearInterval( this.interval );
		}
	};
}());

var addedCss = false;
function addCss () {
	var style = createElement( 'style' );
	style.textContent = "\r\n\tsvg[svelte-545188150], [svelte-545188150] svg {\r\n\t\twidth: 100%;\r\n\t\theight: 100%;\r\n\t}\r\n\t[svelte-545188150].clock-face, [svelte-545188150] .clock-face {\r\n\t\tstroke: #333;\r\n\t\tfill: white;\r\n\t}\r\n\t[svelte-545188150].minor, [svelte-545188150] .minor {\r\n\t\tstroke: #999;\r\n\t\tstroke-width: 0.5;\r\n\t}\r\n\t[svelte-545188150].major, [svelte-545188150] .major {\r\n\t\tstroke: #333;\r\n\t\tstroke-width: 1;\r\n\t}\r\n\t[svelte-545188150].hour, [svelte-545188150] .hour {\r\n\t\tstroke: #333;\r\n\t}\r\n\t[svelte-545188150].minute, [svelte-545188150] .minute {\r\n\t\tstroke: #666;\r\n\t}\r\n\t[svelte-545188150].second, [svelte-545188150] .second, [svelte-545188150].second-counterweight, [svelte-545188150] .second-counterweight {\r\n\t\tstroke: rgb(180,0,0);\r\n\t}\r\n\t[svelte-545188150].second-counterweight, [svelte-545188150] .second-counterweight {\r\n\t\tstroke-width: 3;\r\n\t}\r\n";
	appendNode( style, document.head );

	addedCss = true;
}

function renderMainFragment ( root, component ) {
	var svg = createSvgElement( 'svg' )
	setAttribute( svg, 'svelte-545188150', '' );
	setAttribute( svg, 'viewBox', "0 0 100 100" );

	var g = createSvgElement( 'g' )
	setAttribute( g, 'svelte-545188150', '' );
	setAttribute( g, 'transform', "translate(50,50)" );

	appendNode( g, svg );

	var circle = createSvgElement( 'circle' )
	setAttribute( circle, 'svelte-545188150', '' );
	setAttribute( circle, 'class', "clock-face" );
	setAttribute( circle, 'r', "48" );

	appendNode( circle, g );
	var eachBlock_anchor = createComment();
	appendNode( eachBlock_anchor, g );
	var eachBlock_value = root.minor;
	var eachBlock_iterations = [];

	for ( var i1 = 0; i1 < eachBlock_value.length; i1 += 1 ) {
		eachBlock_iterations[i1] = renderEachBlock( root, eachBlock_value, eachBlock_value[i1], i1, component );
		eachBlock_iterations[i1].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
	}

	var eachBlock1_anchor = createComment();
	appendNode( eachBlock1_anchor, g );
	var eachBlock1_value = root.major;
	var eachBlock1_iterations = [];

	for ( var i2 = 0; i2 < eachBlock1_value.length; i2 += 1 ) {
		eachBlock1_iterations[i2] = renderEachBlock1( root, eachBlock1_value, eachBlock1_value[i2], i2, component );
		eachBlock1_iterations[i2].mount( eachBlock1_anchor.parentNode, eachBlock1_anchor );
	}

	var line = createSvgElement( 'line' )
	setAttribute( line, 'svelte-545188150', '' );
	setAttribute( line, 'class', "hour" );
	setAttribute( line, 'y1', "2" );
	setAttribute( line, 'y2', "-20" );
	setAttribute( line, 'transform', "rotate( " + ( 30 * root.hours + root.minutes / 2 ) + " )" );

	appendNode( line, g );

	var line1 = createSvgElement( 'line' )
	setAttribute( line1, 'svelte-545188150', '' );
	setAttribute( line1, 'class', "minute" );
	setAttribute( line1, 'y1', "4" );
	setAttribute( line1, 'y2', "-30" );
	setAttribute( line1, 'transform', "rotate( " + ( 6 * root.minutes + root.seconds / 10 ) + " )" );

	appendNode( line1, g );

	var g1 = createSvgElement( 'g' )
	setAttribute( g1, 'svelte-545188150', '' );
	setAttribute( g1, 'transform', "rotate( " + ( 6 * root.seconds ) + " )" );

	appendNode( g1, g );

	var line2 = createSvgElement( 'line' )
	setAttribute( line2, 'svelte-545188150', '' );
	setAttribute( line2, 'class', "second" );
	setAttribute( line2, 'y1', "10" );
	setAttribute( line2, 'y2', "-38" );

	appendNode( line2, g1 );

	var line3 = createSvgElement( 'line' )
	setAttribute( line3, 'svelte-545188150', '' );
	setAttribute( line3, 'class', "second-counterweight" );
	setAttribute( line3, 'y1', "10" );
	setAttribute( line3, 'y2', "2" );

	appendNode( line3, g1 );

	return {
		mount: function ( target, anchor ) {
			insertNode( svg, target, anchor );
		},

		update: function ( changed, root ) {
			var __tmp;

			var eachBlock_value = root.minor;

			for ( var i1 = 0; i1 < eachBlock_value.length; i1 += 1 ) {
				if ( !eachBlock_iterations[i1] ) {
					eachBlock_iterations[i1] = renderEachBlock( root, eachBlock_value, eachBlock_value[i1], i1, component );
					eachBlock_iterations[i1].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i1].update( changed, root, eachBlock_value, eachBlock_value[i1], i1 );
				}
			}

			teardownEach( eachBlock_iterations, true, eachBlock_value.length );

			eachBlock_iterations.length = eachBlock_value.length;

			var eachBlock1_value = root.major;

			for ( var i2 = 0; i2 < eachBlock1_value.length; i2 += 1 ) {
				if ( !eachBlock1_iterations[i2] ) {
					eachBlock1_iterations[i2] = renderEachBlock1( root, eachBlock1_value, eachBlock1_value[i2], i2, component );
					eachBlock1_iterations[i2].mount( eachBlock1_anchor.parentNode, eachBlock1_anchor );
				} else {
					eachBlock1_iterations[i2].update( changed, root, eachBlock1_value, eachBlock1_value[i2], i2 );
				}
			}

			teardownEach( eachBlock1_iterations, true, eachBlock1_value.length );

			eachBlock1_iterations.length = eachBlock1_value.length;

			setAttribute( line, 'transform', "rotate( " + ( 30 * root.hours + root.minutes / 2 ) + " )" );

			setAttribute( line1, 'transform', "rotate( " + ( 6 * root.minutes + root.seconds / 10 ) + " )" );

			setAttribute( g1, 'transform', "rotate( " + ( 6 * root.seconds ) + " )" );
		},

		teardown: function ( detach ) {
			teardownEach( eachBlock_iterations, false );

			teardownEach( eachBlock1_iterations, false );

			if ( detach ) {
				detachNode( svg );
			}
		}
	};
}

function renderEachBlock1 ( root, eachBlock1_value, tick, i, component ) {
	var line = createSvgElement( 'line' )
	setAttribute( line, 'svelte-545188150', '' );
	setAttribute( line, 'class', "major" );
	setAttribute( line, 'y1', "35" );
	setAttribute( line, 'y2', "45" );
	setAttribute( line, 'transform', "rotate( " + ( 360 * i / root.major.length ) + " )" );

	return {
		mount: function ( target, anchor ) {
			insertNode( line, target, anchor );
		},

		update: function ( changed, root, eachBlock1_value, tick, i ) {
			var __tmp;

			setAttribute( line, 'transform', "rotate( " + ( 360 * i / root.major.length ) + " )" );
		},

		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( line );
			}
		}
	};
}

function renderEachBlock ( root, eachBlock_value, tick, i, component ) {
	var line = createSvgElement( 'line' )
	setAttribute( line, 'svelte-545188150', '' );
	setAttribute( line, 'class', "minor" );
	setAttribute( line, 'y1', "42" );
	setAttribute( line, 'y2', "45" );
	setAttribute( line, 'transform', "rotate( " + ( 360 * i / root.minor.length ) + " )" );

	return {
		mount: function ( target, anchor ) {
			insertNode( line, target, anchor );
		},

		update: function ( changed, root, eachBlock_value, tick, i ) {
			var __tmp;

			setAttribute( line, 'transform', "rotate( " + ( 360 * i / root.minor.length ) + " )" );
		},

		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( line );
			}
		}
	};
}

function SvelteComponent ( options ) {
	options = options || {};
	this._state = Object.assign( template.data(), options.data );
	applyComputations( this._state, this._state, {}, true );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root;
	this._yield = options._yield;

	this._torndown = false;
	if ( !addedCss ) addCss();

	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );

	if ( options._root ) {
		options._root._renderHooks.push({ fn: template.oncreate, context: this });
	} else {
		template.oncreate.call( this );
	}
}

SvelteComponent.prototype.get = get;
SvelteComponent.prototype.fire = fire;
SvelteComponent.prototype.observe = observe;
SvelteComponent.prototype.on = on;
SvelteComponent.prototype.set = set;
SvelteComponent.prototype._flush = _flush;

SvelteComponent.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	applyComputations( this._state, newState, oldState, false )

	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

SvelteComponent.prototype.teardown = SvelteComponent.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );
template.ondestroy.call( this );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function setAttribute( node, attribute, value ) {
	node.setAttribute ( attribute, value );
}

function createSvgElement( name ) {
	return document.createElementNS( 'http://www.w3.org/2000/svg', name );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

function createComment() {
	return document.createComment( '' );
}

function teardownEach( iterations, detach, start ) {
	for ( var i = ( start || 0 ); i < iterations.length; i += 1 ) {
		iterations[i].teardown( detach );
	}
}

function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

function createElement( name ) {
	return document.createElement( name );
}

function get( key ) {
	return key ? this._state[ key ] : this._state;
}

function fire( eventName, data ) {
	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
	if ( !handlers ) return;

	for ( var i = 0; i < handlers.length; i += 1 ) {
		handlers[i].call( this, data );
	}
}

function observe( key, callback, options ) {
	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;

	( group[ key ] || ( group[ key ] = [] ) ).push( callback );

	if ( !options || options.init !== false ) {
		callback.__calling = true;
		callback.call( this, this._state[ key ] );
		callback.__calling = false;
	}

	return {
		cancel: function () {
			var index = group[ key ].indexOf( callback );
			if ( ~index ) group[ key ].splice( index, 1 );
		}
	};
}

function on( eventName, handler ) {
	if ( eventName === 'teardown' ) return this.on( 'destroy', handler );

	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
	handlers.push( handler );

	return {
		cancel: function () {
			var index = handlers.indexOf( handler );
			if ( ~index ) handlers.splice( index, 1 );
		}
	};
}

function set( newState ) {
	this._set( newState );
	( this._root || this )._flush();
}

function _flush() {
	if ( !this._renderHooks ) return;

	while ( this._renderHooks.length ) {
		var hook = this._renderHooks.pop();
		hook.fn.call( hook.context );
	}
}

return SvelteComponent;

});
