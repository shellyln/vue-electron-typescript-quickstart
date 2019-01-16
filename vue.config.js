module.exports = {
    pages: {
      mainwindow: {
        // entry for the page
        entry: 'src/windows/MainWindow/main.ts',
        // the source template
        template: 'public/main-window.html',
        // output as dist/index.html
        filename: 'main-window.html',
        // when using title option,
        // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
        //title: 'Index Page',
        // chunks to include on this page, by default includes
        // extracted common chunks and vendor chunks.
        //chunks: ['chunk-vendors', 'chunk-common', 'index']
      },
      // when using the entry-only string format,
      // template is inferred to be `public/subpage.html`
      // and falls back to `public/index.html` if not found.
      // Output filename is inferred to be `subpage.html`.
      subwindow: {
        entry: 'src/windows/SubWindow/main.ts',
        template: 'public/sub-window.html',
        filename: 'sub-window.html',
      },
    }
}