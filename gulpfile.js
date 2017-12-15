const gulp          = require("gulp");
const sass          = require("gulp-sass");
const postcss       = require("gulp-postcss");
const browserSync   = require("browser-sync").create();
const autoprefixer  = require("autoprefixer");
const concat        = require("gulp-concat");
const jshint        = require("gulp-jshint");
const browserify    = require("gulp-browserify");
const stylish       = require("jshint-stylish");
const imagemin      = require("gulp-imagemin");
const uglify        = require("gulp-uglify");
const gutil         = require("gulp-util");


function uglifyIfNeeded() {
  return gutil.env.env === "prod" ? uglify().on("error", function(err) {gutil.log(gutil.colors.red("[Error]"), err.toString())}) : gutil.noop();
}


gulp.task("default", ["sass", "js", "images", "fonts", "html", "db", "conf"], () => {

  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });

  gulp.watch("src/*.html", ["html"]);

  gulp.watch("src/db/*.json", ["db"]);

  gulp.watch("src/scripts/**/*.js", ["js"]);

  gulp.watch("src/scss/**/*.scss", ["sass"]);

  gulp.watch("src/images/*", ["images"]);

  gulp.watch("src/config.json", ["conf"]);

});

gulp.task("conf", () => {
  gulp.src("src/config.json")
    .pipe(gulp.dest("./dist/"))
});

gulp.task("fonts", () => {
  gulp.src("src/fonts/*")
    .pipe(gulp.dest("./dist/fonts"))
});

gulp.task("db", () => {
  gulp.src("src/db/*.json")
    .pipe(gulp.dest("./dist/db"))
});

gulp.task("images", () => {
  gulp.src("src/images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/images/"))
    .pipe(browserSync.stream());
});

gulp.task("html", () => {
  return gulp.src("src/index.html")
  .pipe(gulp.dest("./dist/"))
  .pipe(browserSync.stream());
});

gulp.task("js", () => {
  return gulp.src("./src/scripts/app.js")
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(browserify())
    .pipe(uglifyIfNeeded())
    .pipe(gulp.dest("./dist/scripts/"))
    .pipe(browserSync.stream());
});


gulp.task("sass", () => {
  return gulp.src("./src/scss/main.scss")
    .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))

    .pipe(postcss([autoprefixer()]))

    .pipe(gulp.dest("./dist/css"))

    .pipe(browserSync.stream());
});
