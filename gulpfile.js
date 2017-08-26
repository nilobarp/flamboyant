const gulp = require('gulp');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

const config = {
    source: './src/',
    destination: './dist/',
    watchFiles: ['./src/**/*.ts']
}

gulp.task('default', () => {
    gulp.watch(config.watchFiles, ['ts-compile']);
})

gulp.task("ts-compile", () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(config.destination));
});