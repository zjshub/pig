var detect = {
    _ua: navigator.userAgent.toLowerCase(),
    DESKTOP: 'desktop',
    MOBILE: 'mobile',
    TABLET: 'tablet',

    /**
     * Check browser version
     * @param    {Bool} is
     * @param    {String} regex
     * @return    {int}
     */
    _version: function(regex) {
        var m;
        return ((m = regex.exec(this._ua))) ? parseFloat(m[1]) : 0;
    },

    getVersion: function() {
        var self = this,
            m;

        if (this.isAndroid) {
            this.Androidversion = this._version(/android (\d+\.\d+)/).toFixed(1);
            //return;
        }

        if (self.webkit) {
            self.webkitVersion = this._version(/webkit\/(\d+\.\d+)/).toFixed(1);
        }

        if (this.chrome) {
            if (this.isIOS) {
                // Chrome for ios
                this.version = this._version(/(iphone|ipad).*os\s(\d_\d)/).toFixed(1);
                if (isNaN(this.version)) {
                    var regex = /(iphone|ipad).*os\s(\d_\d)/;
                    var result = ((m = regex.exec(this._ua, 'i'))) ? m[2] : 0;
                    if (result.replace) {
                        result = result.replace('_', '.');
                        result = parseFloat(result).toFixed(1);
                    }
                    else if (result <= 0) {
                        result = '7';
                    }
                    else {
                        result = '' + result;
                    }
                    this.version = result;
                    return;
                }
            }
            else {
                this.version = this._version(/\bchrome\/(\d+\.\d+)/).toFixed(1);
            }
            return;
        }

        if (this.mozilla) {
            this.version = this._version(/\bfirefox\/(\d+\.\d+)/).toFixed(1);
            return;
        }

        if (this.safari) {
            this.version = this._version(/version\/(\d+\.\d+)/).toFixed(1);
            if (this.version === '0.0') {
                var regex = /(iphone|ipad).*os\s(\d_\d)/;
                var result = ((m = regex.exec(this._ua, 'i'))) ? m[2] : 0;
                if (result.replace) {
                    result = result.replace('_', '.');
                    result = parseFloat(result).toFixed(1);
                }
                else if (result <= 0) {
                    result = '7';
                }
                else {
                    result = '' + result;
                }
                this.version = result;
                return;
            }
        }

        if (this.opera || this.safari) {
            this.version = this._version(/version\/(\d+\.\d+)/).toFixed(1);
            return;
        }

        if (this.msie) {
            if ((/msie/).test(self._ua)) {
                this.version = this._version(/msie (\d+\.\d+)/).toFixed(1);
            }
            else {
                this.version = this._version(/rv:(\d+\.\d+)/).toFixed(1);
            }
            return;
        }
    },

    isBlocked: function() {
        var self = this;
        var excludedBrowser = window.configFront.excludedBrowser;
        return self.detectBrowser(excludedBrowser);
    },

    isNonOptimalBrowser: function() {
        var self = this;
        var nonoptimalBrowser = window.configFront.nonoptimalBrowser;
        return self.detectBrowser(nonoptimalBrowser);
    },

    detectBrowser: function(browserList) {
        var self = this;
        var browserNameBlocked = false;
        var browserVersionBlocked = false;
        var browserSystemBlocked = false;
        for (var i = 0; i < browserList.length; i++) {
            browserNameBlocked = false;
            browserVersionBlocked = false;
            browserSystemBlocked = false;
            var regExp = new RegExp(browserList[i].browser, "i");
            if (self.safari && browserList[i].browser == "safari") {
                browserNameBlocked = true;
            }
            else if (self.isMac && browserList[i].browser == "safari" && self.chrome) {
                // Specific test for Mac OS
                // Chrome UA on Mac has a 'safari' sub string. So we check this specific case.
                browserNameBlocked = false;
            }
            else if (regExp.test(self._ua)) {
                browserNameBlocked = true;
            }

            // INTERPRETATION DE LOPERATEUR
            if (eval(parseFloat(self.version) + browserList[i].operator + parseFloat(browserList[i].version))) {
                browserVersionBlocked = true;
            }
            // Check system
            if (self.isWindows && browserList[i].os == "windows") {
                browserSystemBlocked = true;
            }
            if (self.isMac && browserList[i].os == "mac" && !self.isIpad && !self.isIphone) {
                browserSystemBlocked = true;
            }
            if (self.isIOS && browserList[i].os == "ios") {
                browserSystemBlocked = true;
            }
            // if (self.isAndroid && browserList[i].os == "android") {
            //     browserSystemBlocked = true;
            // }
            // Check que toutes les conditions sont réunies pour bloquer
            if (browserNameBlocked && browserVersionBlocked && browserSystemBlocked) {
                return true;
            }
        }
    },

    isSupported: function() {
        //return false;
        //return true;
        var self = this;

        if (window.configFront.blockAllSite) {
            return false;
        }

        if (self.isNonOptimalBrowser()) {
            return false;
        }

        if (self.isBlocked()) {
            return false;
        }

        if ((/ipod|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(self._ua)) ||
            (/sch-i800|playbook|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak/i.test(self._ua))) {
            return false;
        }

        if ((/Baiduspider|Googlebot|Googlebot-Image|Google Web Preview|bingbot|Lynx|ia_archiver|Teoma|Slurp|facebookexternalhit/i.test(self._ua))) {
            return true;
        }

        if (self.isIOS && (self.isIpad || self.isIphone)) {
            if (self.chrome) {
                return true;
            }
            if (self.version >= 5.0) {
                return true;
            }
            else {
                return false;
            }
            if (screen && screen.availWidth === 748) {
                return true;
            }
        }
        else if (self.isAndroid) {
            if (self.Androidversion >= 4.0) {
                return true;
            }
        }
        else if (self.isMac) {
            if (self.chrome) {
                return self.version >= 20.0;
            }
            else if (self.mozilla) {
                return self.version >= 9.0;
            }
            else if (self.safari) {
                return self.version >= 4.0;
            }
        }
        else if (self.msie) {
            return self.version >= 7.0;
        }
        else if (self.mozilla) {
            return self.version >= 9.0;
        }
        else if (self.chrome) {
            return self.version >= 20.0;
        }
        return false;
    },

    start: function() {
        var self = this;


        self.isWindows = self._ua.match(/win/i) ? true : false; //navigator.userAgent.indexOf('Win')
        self.isMac = self._ua.match(/(macintosh|mac os x)/i) ? true : false;

        self.isMobile = (/iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|silk|symbianos|fennec/i.test(self._ua));
        self.isTablet = (/ipad|android|android 3|sch-i800|playbook|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak/i.test(self._ua));
        self.isIOS = self._ua.match(/(iPad|iPhone|iPod)/i) ? true : false;
        self.silk = (/silk/).test(self._ua);
        self.isAndroid = (self._ua.match(/(android)/i) || self.silk) ? true : false;
        self.opera = (/opera/).test(self._ua);
        self.chrome = (/\bchrome\b/).test(self._ua) || (/\bcrios\b/).test(self._ua);
        self.webkit = (/webkit/).test(self._ua);
        self.safari = !self.chrome && ((/safari/).test(self._ua) || (/iphone/).test(self._ua, 'i') || (/ipad/).test(self._ua, 'i'));
        self.msie = !self.opera && ((/msie/).test(self._ua) || (/trident/).test(self._ua));
        self.mozilla = !self.webkit && !self.msie && (/gecko/).test(self._ua);


        var device = this._ua.match(/(android|iphone|ipad|playbook|hp-tablet|windows)/gi);
        self.device = device ? device[0].toLowerCase() : '';

        self.isIpad = self.device === 'ipad';
        self.isIphone = self.device === 'iphone';

        self.isAndroidMobile = ((/Mobile/i).test(self._ua) || self.silk);
        if (self.isAndroid && self.isAndroidMobile) {
            self.isMobile = true;
            self.isTablet = false;
        }
        else if (self.isAndroid && !self.isAndroidMobile) {
            self.isMobile = false;
            self.isTablet = true;
        }

        this.getVersion();
        self.supported = this.isSupported();
        if (!self.supported) {
            if (self.isMobile) {
                this.displayCompatibilityScreen(self.MOBILE);
            }
            else if (self.isTablet) {
                this.displayCompatibilityScreen(self.TABLET);
            }
            else {
                this.displayCompatibilityScreen(self.DESKTOP);
            }
        }
        if (window.includedFiles) {
            device = '';
            if (self.supported && self.isMobile) {
                device = 'mobile';
            }
            else {
                device = 'desktop';
            }
            if ( window.includedFiles.css ){
                for (var css in window.includedFiles.css.desktop) {
                    if (window.includedFiles.css.desktop.hasOwnProperty(css)) {
                        document.write('<link rel="Stylesheet" href="' + window.includedFiles.css[device][css] + '" type="text/css" media="all">');
                    }
                }
            }
            for (var js in window.includedFiles.js.desktop) {
                if (window.includedFiles.js.desktop.hasOwnProperty(js)) {
                    document.write('<script type="text/javascript" src="' + window.includedFiles.js[device][js] + '"><\/script>');
                }
            }
        }
    },


    displayCompatibilityScreen: function(screenType) {
        var self = this;

        document.body.className = document.body.className + ' compatibilityScreen';

        // On cache le contenu derrière
        // document.getElementById('global-wrapper-id').style.display = 'none';

        // Disable WT tag for load when we are on compatibility screen
        window.notWTLoad = true;

        self.loadWebtrends();

        var container = document.createDocumentFragment();
        var maPopin = document.createElement('div');
        maPopin.className = 'popin';
        var contentArea = document.createElement('div');
        contentArea.className = 'contentArea';
        var contentCenterer = document.createElement('span');
        contentCenterer.className = 'contentCenterer';
        var content = document.createElement('div');
        content.className = 'content';
        var logo = document.createElement('div');
        logo.className = 'logo-redirection';

    // Compatibilité browser
        // Compatibilité + News down
    // Site non optimisé
    // Site totalement bloqué
        // Site bloqué + News down


        var message = "";
        if (window.configFront.blockAllSite && window.configFront.isChanelNewsDown) {
            // site bloqué + news down
            message = window.settings.dictionnary["blockAllSiteNewsMessage"];
            setTimeout(function() {
                var tabScreenTypeValue = Array();
                tabScreenTypeValue.desktop = 'DESKTOP';
                tabScreenTypeValue.mobile = 'SMARTPHONE';
                tabScreenTypeValue.tablet = 'TABLET';
                var cat = 'REDIRECTION SCREENS';
                var scat1 = 'REDIRECTION SCREENS_' + tabScreenTypeValue[screenType];
                var scat2 = scat1 + '_BLOCKALL_NEWSDOWN';
                var tag = {
                    ch_cat: cat,
                    ch_scat1: scat1,
                    ch_scat2: scat2,
                    ch_prod: scat2,
                    dl: '0'
                }
                self.launchTag(cat, scat1, scat2, scat2, '0');
            }, 2000);
        }
        else if (window.configFront.blockAllSite) {
            // site bloqué
            message = window.settings.dictionnary["blockAllSiteMessage"];
            setTimeout(function() {
                var tabScreenTypeValue = Array();
                tabScreenTypeValue.desktop = 'DESKTOP';
                tabScreenTypeValue.mobile = 'SMARTPHONE';
                tabScreenTypeValue.tablet = 'TABLET';
                var cat = 'REDIRECTION SCREENS';
                var scat1 = 'REDIRECTION SCREENS_' + tabScreenTypeValue[screenType];
                var scat2 = scat1 + '_BLOCKALL';
                var tag = {
                    ch_cat: cat,
                    ch_scat1: scat1,
                    ch_scat2: scat2,
                    ch_prod: scat2,
                    dl: '0'
                }
                self.launchTag(cat, scat1, scat2, scat2, '0');
            }, 2000);
        }
        else if (self.isNonOptimalBrowser()) {
            // non opti
            message = window.settings.dictionnary["nonOptimalBrowserMessage"];
            message += "<br /><br /><a class='nonOptimalYesClick' onclick='onYesClick();'>" + window.settings.dictionnary["nonOptimalBrowserYes"] + "</a> - " + window.settings.dictionnary["nonOptimalBrowserNo"]
            setTimeout(function() {
                var tabScreenTypeValue = Array();
                tabScreenTypeValue.desktop = 'DESKTOP';
                tabScreenTypeValue.mobile = 'SMARTPHONE';
                tabScreenTypeValue.tablet = 'TABLET';
                var cat = 'REDIRECTION SCREENS';
                var scat1 = 'REDIRECTION SCREENS_' + tabScreenTypeValue[screenType];
                var scat2 = scat1 + '_NONOPT';
                var tag = {
                    ch_cat: cat,
                    ch_scat1: scat1,
                    ch_scat2: scat2,
                    ch_prod: scat2,
                    dl: '0'
                }
                self.launchTag(cat, scat1, scat2, scat2, '0');
            }, 2000);
        }
        else {
            // compat
            var chanelNewsDown = "";
            if (window.configFront.isChanelNewsDown) {
                // compat + news down
                chanelNewsDown = "NewsDown";
                setTimeout(function() {
                    var tabScreenTypeValue = Array();
                    tabScreenTypeValue.desktop = 'DESKTOP';
                    tabScreenTypeValue.mobile = 'SMARTPHONE';
                    tabScreenTypeValue.tablet = 'TABLET';
                    var cat = 'REDIRECTION SCREENS';
                    var scat1 = 'REDIRECTION SCREENS_' + tabScreenTypeValue[screenType];
                    var scat2 = scat1 + '_COMPATIBILITY_NEWSDOWN';
                    var tag = {
                        ch_cat: cat,
                        ch_scat1: scat1,
                        ch_scat2: scat2,
                        ch_prod: scat2,
                        dl: '0'
                    }
                self.launchTag(cat, scat1, scat2, scat2, '0');
                }, 2000);
            }
            else {
                setTimeout(function() {
                    var tabScreenTypeValue = Array();
                    tabScreenTypeValue.desktop = 'DESKTOP';
                    tabScreenTypeValue.mobile = 'SMARTPHONE';
                    tabScreenTypeValue.tablet = 'TABLET';
                    var cat = 'REDIRECTION SCREENS';
                    var scat1 = 'REDIRECTION SCREENS_' + tabScreenTypeValue[screenType];
                    var scat2 = scat1 + '_COMPATIBILITY';
                    var tag = {
                        ch_cat: cat,
                        ch_scat1: scat1,
                        ch_scat2: scat2,
                        ch_prod: scat2,
                        dl: '0'
                    }
                self.launchTag(cat, scat1, scat2, scat2, '0');
                }, 2000);
            }
            message = window.settings.dictionnary[screenType + "CompatibilityMessage" + chanelNewsDown];
        }
        var msg = document.createElement('h1');
        msg.className = 'msg-redirection';
        msg.innerHTML = message;

        content.appendChild(logo);
        content.appendChild(msg);
        //        content.appendChild(msg2);

        container.appendChild(contentArea);
        contentArea.appendChild(content);
        container.appendChild(contentCenterer);
        maPopin.appendChild(container);
        container.appendChild(maPopin);
        document.body.appendChild(maPopin);

        window.onYesClick = function() {

            document.body.className = document.body.className.replace( /(?:^|\s)compatibilityScreen(?!\S)/ , '' )
            document.getElementsByClassName('popin')[0].style.display = 'none';
            if (window.V3_bridge_N4 && window.V3_bridge_N4.didHideCompatibilityScreen());
            return false;
        }
    },



    loadWebtrends: function() {
        var self = this;
        var WEBTREND_ID = window.settings.webtrends.dcsid;
        var WEBTREND_ROOT = window.settings.environment == 'development' ? '/src/js/vendors' : window.settings.designPath + '/js';
        var WEBTREND_LIB = WEBTREND_ROOT + "/webtrends.min.js";
        var WEBTREND_DOMAIN = window.settings.webtrends.url;

        self.CHANEL_TRACKING = {
            config: {
                ch_div: "FASHION",
                ch_re: "chanelcom",
                environnement: window.settings.environment,
                disabled: window.settings.webtrends.disabled
            }
        };

        window.webtrendsAsyncInit = function() {
            var dcs = new Webtrends.dcs().init({
                dcsid: WEBTREND_ID,
                domain: WEBTREND_DOMAIN,
                timezone: 0,
                i18n: true,
                adimpressions: true,
                adsparam: "WT.ai",
                offsite: true,
                download: true,
                downloadtypes: "xls,doc,pdf,txt,csv,zip,docx,xlsx,rar,gzip",

                fpcdom: ".chanel.com",
                FPCConfig: {
                    expires: 15771600000
                },
                plugins: {
                    orientation: {
                        src:"http://common.chanel.com/vendors/webtrends/orientation.js"
                    },
                    apple_dm: {
                        src:"http://common.chanel.com/vendors/webtrends/apple_dm.js"
                    }
                }

            });

        };

        var s = document.createElement("script");
        s.async = true;
        s.src = WEBTREND_LIB;
        var s2 = document.getElementsByTagName("script")[0];
        s2.parentNode.insertBefore(s, s2);

    },

    launchTag: function(ch_cat, ch_scat1, ch_scat2, ch_prod, dl, title, searchText, nbResult) {
        var self = this;
        var ctrl = self.CHANEL_TRACKING;
        var ch_div = ctrl.config.ch_div;
        var ch_re = ctrl.config.ch_re;
        var disabled = ctrl.config.disabled;
        var environnement = ctrl.config.environnement;

        // GESTION EXCEPTION EYEWEAR !!!
        if (ch_cat) {
            var catTmp = ch_cat.split("_");
            if (catTmp[0] == "EYE") {
                ch_cat = "EYE";
            }
        }
        var dscuri = window.location.pathname;
        if (window.location.hash && window.location.hash != "") {
            var uriTmp = window.location.hash.split("#!")[1];
            if (uriTmp) dscuri = uriTmp;
        }
        var titleTags = document.title;

        if (title) {
            titleTags = title;
        }

        if (window.console != undefined && disabled) {
            console.log('\r\n"DCS.dscuri",' + dscuri + ',\r\n"DCSext.ch_re",' + ch_re + ',\r\n"DCSext.ch_lang",' + document.getElementsByName("DCSext.ch_lang")[0].content + ',\r\n"DCSext.ch_div",' + ch_div + ',\r\n"DCSext.ch_cat",' + ch_cat + ',\r\n"DCSext.ch_scat1",' + ch_scat1 + ',\r\n"DCSext.ch_scat2",' + ch_scat2 + ',\r\n"DCSext.ch_prod",' + ch_prod + '');
        }
        if (!disabled) {
            try {
                dcsMultiTrack(
                    "DCSext.ch_re", ch_re,
                    "DCSext.ch_div", ch_div,
                    "DCSext.ch_cat", ch_cat,
                    "DCSext.ch_scat1", ch_scat1,
                    "DCSext.ch_scat2", ch_scat2,
                    "DCSext.ch_prod", ch_prod,
                    "WT.cg_n", "FASHION",
                    "WT.cg_s", "FASHION",
                    "DCS.dcsuri", dscuri,
                    "WT.ti", titleTags,
                    "WT.dl", dl);
            }
            catch (e) {
                setTimeout(function() {
                    try {
                        dcsMultiTrack(
                            "DCSext.ch_re", ch_re,
                            "DCSext.ch_div", ch_div,
                            "DCSext.ch_cat", ch_cat,
                            "DCSext.ch_scat1", ch_scat1,
                            "DCSext.ch_scat2", ch_scat2,
                            "DCSext.ch_prod", ch_prod,
                            "WT.cg_n", "FASHION",
                            "WT.cg_s", "FASHION",
                            "DCS.dcsuri", dscuri,
                            "WT.ti", titleTags,
                            "WT.dl", dl);
                    } catch (e) {}
                }, 1000);
            }
        }
    }
};
detect.start();
