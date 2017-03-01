(function (){
	/* v1.2 Updated 13/11/2014 */
var appleDeviceModel = function (dcs, options) {
                                if (/ipad/i.test(navigator.userAgent.toLowerCase())) { dcs.addTransform(function (dcsObject, o) { dcsObject.DCSext.apple_dm = getDeviceModel("iPad");}, "all");}
                                else if (/iphone/i.test(navigator.userAgent.toLowerCase())) { dcs.addTransform(function (dcsObject, o) { dcsObject.DCSext.apple_dm = getDeviceModel("iPhone");}, "all");}
                };
                var getDeviceModel = function (device) {
                                var d = device;
                                var mq1 = "screen and (min-device-width: 768px) and (max-device-width: 1024px) and (max-device-height: 1024px) and (-webkit-device-pixel-ratio: 1)"; //iPad 1-2-Mini
                                var mq2 = "screen and (min-device-width: 768px) and (max-device-width: 1024px) and (max-device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"; //iPad 3-4-Air
                                var mq3 = "screen and (device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)"; //iPhone 2G-3G-3GS
                                var mq4 = "only screen and (-webkit-min-device-pixel-ratio : 1.5)and (device-aspect-ratio: 2/3), only screen and (min-device-pixel-ratio : 1.5) and (device-aspect-ratio: 2/3)"; //iPhone 4-4S  
                                var mq5 = "screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"; //iPhone 5-5S-5C 
                                var mq6 = "only screen and (max-device-width: 667px) and (-webkit-device-pixel-ratio: 2)"; //iPhone 6
                                var mq6p = "screen and (min-device-width : 414px) and (max-device-height : 736px) and (-webkit-device-pixel-ratio: 3)"; //iPhone 6+
                                if (d == "iPad") {
                                                if (window.matchMedia && window.matchMedia(mq1).matches) { return "iPad 1-2-Mini";}
                                                else if (window.matchMedia && window.matchMedia(mq2).matches){ return "iPad 3-4-Air";}
                                                else { return "iPad Unknown";}
                                }
                                else if (d == "iPhone") {
                                                if (window.matchMedia && window.matchMedia(mq3).matches) { return "iPhone 2G-3G-3GS";}
                                                else if (window.matchMedia && window.matchMedia(mq5).matches){ return "iPhone 5-5S-5C";} 
                                                else if (window.matchMedia && window.matchMedia(mq4).matches){ return "iPhone 4-4S";}                                               
                                                else if (window.matchMedia && window.matchMedia(mq6).matches){ return "iPhone 6";}        
                                                else if (window.matchMedia && window.matchMedia(mq6p).matches){ return "iPhone 6+";}   

                                                else { return "iPhone Unknown";}
                                }
                                
                };
    Webtrends.registerPlugin("apple_dm", function (dcs, options) {
        appleDeviceModel(dcs, options);
    });
})();