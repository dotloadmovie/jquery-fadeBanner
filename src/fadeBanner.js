/// <reference path="defs/jquery.d.ts" />
/**
 * @module: Banner
 *
 */
var Banner;
(function (Banner) {
    /**
     * @class BannerOptions
     * @implements IBannerOptions
     */
    var BannerOptions = (function () {
        function BannerOptions(path, opacity) {
            this.path = '';
            this.opacity = 0.5;
            this.path = path;
            this.opacity = opacity;
        }
        return BannerOptions;
    })();
    Banner.BannerOptions = BannerOptions;
    /**
     * @class FadeBanner
     */
    var FadeBanner = (function () {
        function FadeBanner(element, options) {
            this.element = element;
            this.options = options;
            if (this.options.path === '' && $(this.element).is('img')) {
                this.options.path = $(this.element).attr('src');
            }
            this.createCanvas(this.element);
        }
        /**
         *
         * @public createCanvas
         *
         * @param el: JQuery
         * @param options: BannerOptions
         */
        FadeBanner.prototype.createCanvas = function (el) {
            var id = this._generateUUID();
            var canvas = '<canvas width="' + $(el).width() + '" height="' + $(el).height() + '" id="' + id + '" style="width:' + $(el).width() + 'px;height:' + $(el).height() + 'px;"></canvas>';
            $(el).after(canvas).remove();
            this.el = $('#' + id);
            this.ctx = this.el[0].getContext('2d');
            this._loadImage();
        };
        /**
         * @private loadImage
         */
        FadeBanner.prototype._loadImage = function () {
            var img = new Image();
            var self = this;
            img.onload = function () {
                self.ctx.drawImage(this, 0, 0);
                var rgb = self._getAverageRGB();
                self.ctx.fillStyle = "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + self.options.opacity + ")";
                self.ctx.fillRect(0, 0, $(self.el).width(), $(self.el).height());
            };
            img.src = this.options.path.toString();
        };
        /**
         * @private get avg rgb from image
         *
         * @returns {{r: number, g: number, b: number}}
         *
         * thanks: http://jsfiddle.net/xLF38/818/
         */
        FadeBanner.prototype._getAverageRGB = function () {
            var blockSize = 5, defaultRGB = { r: 0, g: 0, b: 0 }, data, i = -4, length, rgb = { r: 0, g: 0, b: 0 }, count = 0;
            if (!this.ctx) {
                return defaultRGB;
            }
            try {
                data = this.ctx.getImageData(0, 0, this.el.width(), this.el.height());
            }
            catch (e) {
                return defaultRGB;
            }
            length = data.data.length;
            while ((i += blockSize * 4) < length) {
                ++count;
                rgb.r += data.data[i];
                rgb.g += data.data[i + 1];
                rgb.b += data.data[i + 2];
            }
            rgb.r = ~~(rgb.r / count);
            rgb.g = ~~(rgb.g / count);
            rgb.b = ~~(rgb.b / count);
            return rgb;
        };
        /**
         *
         * @returns {string}
         * @private generate UUID
         *
         * thanks - http://stackoverflow.com/a/8809472
         */
        FadeBanner.prototype._generateUUID = function () {
            var d = new Date().getTime();
            if (window.performance && typeof window.performance.now === "function") {
                d += performance.now(); //use high-precision timer if available
            }
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        };
        return FadeBanner;
    })();
    Banner.FadeBanner = FadeBanner;
})(Banner || (Banner = {}));
/**
 * Base jQuery plugin wrapper
 */
(function (window, $) {
    if (!$)
        return false;
    $.fn.extend({
        Banner: function (opts) {
            //defaults
            var defaults = new Banner.BannerOptions('', 0.4);
            var opts = $.extend(defaults, opts);
            return this.each(function () {
                var o = opts;
                var obj = $(this);
                new Banner.FadeBanner(obj, o);
            });
        }
    });
})(window, jQuery);
//# sourceMappingURL=fadeBanner.js.map