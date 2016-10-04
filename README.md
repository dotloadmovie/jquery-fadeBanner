#jquery.fadeBanner

fadeBanner is a simple plugin for generating a colourized banner from a image file or path. It's a basic task but a boring and repetitive one which I seem to have to carry out regularly. It replaces an image file or other DOM element with a same-sized canvas, containing an image colourized using the dominant colour in the file. Any image supported by canvas can be used (png, gif, jpg). This can be useful for informational blocks, headers, footer and anywhere branding is loaded dynamically.


##Usage

```javascript
$('#element').fadeBanner({
    path: 'path/to/local/file/image',
    opacity: 0.4
});
```


##Options

It takes a pair of options:

- path (optional): string. A path to an image file (must be on the same domain to avoid cross-origin issues). If path is not specified, and the DOM element used is an image, fadeBanner will use the image src.
- opacity (optional): number. A number between 1 and 0 which declares the relative opacity of the colourization. Default: 0.4


##Typescript

Really, this is just an experiment to see how Typescript plays with the jQuery plugin environment. It also contains a very basic implementation of TypeScript/Mocha test coverage. All the dependencies are in the package.json file. Happy hacking!




