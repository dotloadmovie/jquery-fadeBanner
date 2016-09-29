/*!
 *
 * basic banner generation plugin.
 * replace an element with a canvas of the same size containing a colourized version of the path image
 *
 */


;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "fadeBanner",
        defaults = {
            path: false
        };


    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        /**
         * @public constructor
         */
        init: function() {

            if(!this.options.path && !$(this.element).is('img')){

                console.error('No image path provided');
                return false;

            }

            if(!this.options.path && $(this.element).is('img')){

                this.options.path = $(this.element).attr('src');

            }

            this.createCanvas(this.element, this.options);

        },

        /**
         *
         * @public createCanvas
         *
         * @param el
         * @param options
         */
        createCanvas: function(el, options) {

            var id = this._generateUUID();

            var canvas = '<canvas id="'+id+'" style="width:'+$(el).width()+'px;height:'+$(el).height()+'px;"></canvas>';
            $(el).after(canvas).remove();

            this.el = $('#'+id);

            this.ctx = this.el[0].getContext('2d');

            this.loadImage();

        },

        /**
         * @public loadImage
         */
        loadImage: function(){

            var img = new Image();

            var self = this;

            img.onload = function(){

                self.ctx.drawImage(this, 0, 0);
                var rgb = self._getAverageRGB();

                self.ctx.fillStyle = "rgba("+rgb.r+", "+rgb.g+", "+rgb.b+", 0.5)";
                self.ctx.fillRect(0, 0, 500, 500);

            };

            img.src = this.options.path;

        },


        /**
         * @private get avg rgb from image
         *
         * @returns {{r: number, g: number, b: number}}
         *
         * thanks: http://jsfiddle.net/xLF38/818/
         */
        _getAverageRGB: function() {

            var blockSize = 5,
                defaultRGB = {r:0,g:0,b:0},
                data, width, height,
                i = -4,
                length,
                rgb = {r:0,g:0,b:0},
                count = 0;

            if (!this.ctx) {
                return defaultRGB;
            }


            try {
                data = this.ctx.getImageData(0, 0, this.el.width(), this.el.height());
            } catch(e) {
                return defaultRGB;
            }

            length = data.data.length;

            while ( (i += blockSize * 4) < length ) {
                ++count;
                rgb.r += data.data[i];
                rgb.g += data.data[i+1];
                rgb.b += data.data[i+2];
            }


            rgb.r = ~~(rgb.r/count);
            rgb.g = ~~(rgb.g/count);
            rgb.b = ~~(rgb.b/count);

            return rgb;

        },


        /**
         *
         * @returns {string}
         * @private generate UUID
         *
         * thanks - http://stackoverflow.com/a/8809472
         */
        _generateUUID: function(){

            var d = new Date().getTime();
            if(window.performance && typeof window.performance.now === "function"){
                d += performance.now(); //use high-precision timer if available
            }
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            });
            return uuid;

        }

    };


    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new Plugin( this, options ));
            }
        });
    };


})( jQuery, window, document );
