const gulp = require("gulp");
const minjs = require("gulp-uglify");
const mincss = require("gulp-clean-css");
const server = require("gulp-webserver");
const concat = require("gulp-concat");
const connect = require("gulp-connect");
const fs = require("fs");
const url = require("url");
const path = require("path");
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
        .pipe(gulp.dest("./dist/js"))
})
gulp.task("webser", () => {
    return gulp.src("./")
        .pipe(server({
            host: "localhost",
            port: "8080",
            open: true,
            livereload: true,
            directoryListing: true,
            middleware: (req, res) => {
                var paths = url.parse(req.url).pathname;
                if (req.url == "/") {
                    var view = fs.readFileSync(path.join(__dirname, "src", "index.html"))
                    res.end(view);
                } else {
                    var view = fs.readFileSync(path.join(__dirname, "src", paths))
                    res.end(view);
                }

            }
        }))
})