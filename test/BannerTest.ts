/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../src/defs/jquery.d.ts" />

import { Banner } from '../src/fadeBanner';

describe('Banner', function(){

    var bannerOptions = new Banner.BannerOptions('', 0.6);

    describe('options', function(){

        it('should contain some defaults', function(){

            if(bannerOptions.path !== ''){
                throw new Error('Expected banner options path default to be empty string but found:' + bannerOptions.path);
            }

            if(!bannerOptions.opacity){
                throw new Error('Expected banner options opacity default to be number but found:' + bannerOptions.opacity);
            }

        });

    });

});
