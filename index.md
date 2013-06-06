---
layout: default
---

<div class="hero-unit">
 <h1>ProseThis - easy blogging with Prose</h1>
</div>

<div style="text-align: center;">
  <a class="btn btn-primary btn-large" href="https://github.com/agius/prose-this/blob/master/package/prose-this.crx?raw=true">Download ProseThis</a>
</div>

<hr />

ProseThis adds a keyboard shortcut to any web page - CMD+k (or ctrl+k on windows), which pops open a new post window in Prose with content loaded from the current web page. It also adds appropriate metadata and creates a filename for you. The only requirement is that you are logged in to Prose, wherever you are using it, and enter the url to create a new post on your preferred repo in the extension's Options page. If you haven't entered a url, you will be prompted to do so when you activate the shortcut.

## Features

* Automatic file naming based on the page you blog from
* Adds a "link" attribute to post metadata linking to the page you reference
* Automatically adds info from Github, StackOverflow, and other pages to your Markdown

## Installation

1. [Click this link](https://github.com/agius/prose-this/blob/master/package/prose-this.crx?raw=true) to download the latest .crx file. 
2. Open the extensions page (click the icon at the end of the url bar, go to tools -> extensions).
3. Click + drag the .crx file onto the page. Chrome will ask you to confirm, so click "Add". 
3. ProseThis should now appear in your extensions list. 
4. Go ahead and click "Options" under the ProseThis extension. 
5. Enter the url for a new post and hit "Save". The url is probably something like: `http://prose.io/#your-github-name/your-github-name.github.com/new/master/_posts`

Now you're ready!

## Development

Feel free to fork and mess around with it. Pull requests will be implemented.

## Author

[agius](http://www.atevans.com)