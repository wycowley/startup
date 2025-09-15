HTML provides structure and content

## Basic Structure

There are three parts of HTML content - there is the header, body and footer.

1. The `<header>` tag holds the navigation bar generally
2. The `<body>` tag holds the main content of the page, generally separated into `<section>` tags
3. The `<footer>` tag holds the footer content which doesn't have much generally

Links with the `<a>` tag are linked with `href`
Images with the `<img>` tag are linked with `src`

### Input

Forms were critical beforehand, but now are just fancy containers. There are many different types of `<input>` tags:

1. Text input: `<input type="text">`
2. Password input: `<input type="password">`
3. Submit button: `<input type="submit">`
4. Radio button: `<input type="radio">`
5. Checkbox: `<input type="checkbox">`
6. File upload: `<input type="file">`
   ...etc.

You can have `<label>` tags to label the inputs as an inline element.
You can use the `pattern` attribute to validate some types of `<input>` tags.

### Media

There are four different tags for media:

1. `<img>` for images
2. `<audio>` for audio files
3. `<video>` for video files
4. `<svg>` or `<canvas>` for drawing natively in HTML/JS

You need to link the source of the media with the `src` attribute for images, audio, and video.
Audio and video tags have built-in controls with the `controls` attribute.
