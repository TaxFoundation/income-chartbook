# Chart Book Generator

This repo is a [Jekyll](http://jekyllrb.com/)-based generator for digital versions of Tax Foundation chart books. (A chart book is exactly what it sounds like: a book full of charts.)

## Building Chart Books

### Slide Variables

This generator uses a Jekyll collection called `slides` to recreated each chart book page as a `<section>` in a single HTML file. Slides are generated in order based on the filename, so it's recommended to number the files according to the order of the book. E.g., `01-01.md`, `01-02.md`, `02-01.md`.

To create chart book pages, use the following YAML front matter at the beginning of the `slides` [Markdown](https://help.github.com/articles/github-flavored-markdown/) files:

| Variable | Description |
| --- | --- |
| `title` | The title of this particular page of the book. This value is used both to display the title on the page as an `<h1>`, and to create slugs for URL hash values automatically. |
| `subtitle` | Optional subtitle for a page, displayed as an `<h2>`. |
| `chart` | Optional value specifying the name of the chart for the given page. All image files should be saved in the `images` directory. |
| `chart_layout` | Specifies whether a chart is `wide`, in which case it stretches across the entire content area, or `square`, in which case its width is limited to 50% of the content area and it is positioned on the left. |
| `color` | Optional value specifying the color scheme for a given slide, typically for chapter introductions. This value will set the color of navigation links. Acceptable values are: `red`, `pink`, `purple`, `blue`, `cyan`, `teal`, `green`, `yellow`, `amber`, and `orange` |

### Example Slide in the Chart Book

```
---
title: "Example Chart Book Page"
subtitle: "The rate of change of things over an arbitrary section of time"
color: green
chart: example.svg
chart_layout: wide
---
This is a chart about things and stuff. Whoo!

*This text is in italics*

**This text is bold**

[This is a link to an external reference](http://example.com)
```

### Creating HTML files

Building the final copy of the chart book for distribution is easy. Once you have [set up Jekyll on your computer](http://jekyllrb.com/docs/installation/), just go to the directoy of the generator in the command line and tell Jekyll to build.

```
$ cd chartbook
$ jekyll build
```

The final files are located in the `_site` directory. They are ready to upload to any web host.

## License

Jekyll, as well as this generator, are released under an [MIT license](http://opensource.org/licenses/MIT).
