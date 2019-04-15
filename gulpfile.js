const gulp = require("gulp");
const minjs = require("gulp-uglify");
const mincss = require("gulp-clean-css");
const server = require("gulp-webserver");
const concat = require("gulp-concat");
const connect = require("gulp-connect");
const proxy = require("http-proxy-middleware");

gulp.task("css", () => {
    return gulp.src("./src/css/*.css")
        .pipe(concat("main.min.css"))
        .pipe(mincss())
        .pipe(gulp.dest("./dist/css"))
})

gulp.task("js", () => {
    return gulp.src("./src/js/*.js")
        .pipe(concat("main.min.js"))
        .pipe(minjs())
        .pipe(gulp.dest("./dist/css"))
})
gulp.task("webser", () => {
    return gulp.src("./")
        .pipe(server({
            host: "localhost",
            port: "8080",
            open: true,
            livereload: true,
            directoryListing: true
        }))
})