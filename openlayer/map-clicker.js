OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
	defaultHandlerOptions: {
	  'single': true,
	  'double': false,
	  'pixelTolerance': 0,
	  'stopSingle': false,
	  'stopDouble': false
	},

	initialize: function(options) {
	  this.handlerOptions = OpenLayers.Util.extend(
	      {}, this.defaultHandlerOptions
	  );
	  OpenLayers.Control.prototype.initialize.apply(
	      this, arguments
	  ); 
	  this.handler = new OpenLayers.Handler.Click(
	      this, {
	          'click': this.onMapClick
	      }, this.handlerOptions
	  );
	}, 

	onMapClick: function(evt) {
	  var output = document.getElementById(this.key + "Output");
	  position = map.getLonLatFromPixel(evt.xy);        
	  locationDiv.innerHTML = "Lat: " + Math.abs(position.lat) +
	  ((position.lat > 0) ? " N" : " S") + "</br>" +
	  "Lon: " + Math.abs(position.lon) +
	  ((position.lon > 0) ? " W" : " E");
	},
});

var map, controls, myControl; 

function init(){  
	map = new OpenLayers.Map({
	 div: "map",
	 layers: [
	     new OpenLayers.Layer.WMS(
	         "WMS", "http://vmap0.tiles.osgeo.org/wms/vmap0",
	         {layers: "basic"}
	     ),
	     new OpenLayers.Layer.Vector("KML", {
	         strategies: [new OpenLayers.Strategy.Fixed()],
	         protocol: new OpenLayers.Protocol.HTTP({
	             url: "tiputini_trails.kml",
	             format: new OpenLayers.Format.KML({
	                 extractStyles: true, 
	                 extractAttributes: true,
	                 maxDepth: 2
	             })
	         })
	     })
	 ],
	 center: new OpenLayers.LonLat(-76.15292,-0.63204),
	 zoom: 13
	});
	
	controls = {
	     "single": new OpenLayers.Control.Click({
	         handlerOptions: {
	             "single": true
	         }
	     })
	 };
	// get the map controls so you can route mouse clicks to then
    for(var key in controls) {
        myControl = controls[key];
        // only to route output here
        myControl.key = key;
        map.addControl(myControl);
    }
    
    controls['single'].activate();
}

function toggle(key) {
    var control = controls[key];
    if(control.active) {
        control.deactivate();
    } else {
        control.activate();
    }
    var status = document.getElementById(key + "Status");
    status.innerHTML = control.active ? "on" : "off";
    var output = document.getElementById(key + "Output");
    output.value = "";
}

function update() {
	// switch is a way of doing a value
	// that can be many discrete values:
	switch (quality.value) {
		case "1":		// when the value is 1
			// change the text inside the "label" div:
			label.innerHTML="Poor";
		break;
		case "2":		// when the value is 2
			label.innerHTML="Meh";
		break;
		case "3":		// when the value is 3 
			label.innerHTML="Good";
		break;
		case "4":		// when the value is 4
			label.innerHTML="Really Good";
		break;
		case "5":		// when the value is 5
			label.innerHTML="Excellent";
		break;	
		default:			// when it's none of the other values:
			label.innerHTML="Undecided";
		break;
	}			
}

