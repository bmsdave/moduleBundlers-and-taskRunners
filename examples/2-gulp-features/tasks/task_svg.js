
module.exports = function (gulp, plugins, conf) {
    return () => {
        return gulp.src('src/svg/*.svg')

            // minify svg
            .pipe(plugins.svgmin({js2svg: {pretty: true}}))

            // remove all fill and style declarations in out shapes
            .pipe(plugins.cheerio({
                run: function ($) {
                    $('#Frames_24x24').remove();
                },
                parserOptions: {xmlMode: true}
            }))
            .pipe(
                plugins.svgSprite({
                    mode: {symbol: true},
                    baseSize: 24
                })
            )
            .pipe(gulp.dest('dist/svg'));
    };
};
