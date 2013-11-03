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
                            'click': this.onClick,
                            'dblclick': this.onDblclick 
                        }, this.handlerOptions
                    );
                }, 

                onClick: function(evt) {
                    var output = document.getElementById(this.key + "Output");
                    var msg = "click " + evt.xy;
                    output.value = output.value + msg + "\r\n";
                },

                onDblclick: function(evt) {  
                    var output = document.getElementById(this.key + "Output");
                    var msg = "dblclick " + evt.xy;
                    output.value = output.value + msg + "\n";
                }   

            });

            var map, controls; 

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

                map.addLayers([layer]);
                
                controls = {
                    "single": new OpenLayers.Control.Click({
                        handlerOptions: {
                            "single": true
                        }
                    }),
                    "double": new OpenLayers.Control.Click({
                        handlerOptions: {
                            "single": false,
                            "double": true
                        }
                    }),
                    "both": new OpenLayers.Control.Click({
                        handlerOptions: {
                            "single": true,
                            "double": true
                        }
                    }),
                    "drag": new OpenLayers.Control.Click({
                        handlerOptions: {
                            "single": true,
                            "pixelTolerance": null
                        }
                    }),
                    "stopsingle": new OpenLayers.Control.Click({
                        handlerOptions: {
                            "single": true,
                            "stopSingle": true
                        }
                    }),
                    "stopdouble": new OpenLayers.Control.Click({
                        handlerOptions: {
                            "single": false,
                            "double": true,
                            "stopDouble": true
                        }
                    })
                };

                var props = document.getElementById("props");
                var control;
                for(var key in controls) {
                    control = controls[key];
                    // only to route output here
                    control.key = key;
                    map.addControl(control);
                }

                map.zoomToMaxExtent();
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