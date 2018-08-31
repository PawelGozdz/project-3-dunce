// creating variables for each future task
//make sure that there is a dot before pipe --> .pipe
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

//Compile Sass & Inject Into Browser
gulp.task('sass', function() {
  // Compile any .scss extenction files fron an array.
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*scss'])
            //pipe sass function, which does this things
            .pipe(sass())
            // another pipe, says where to compile these files to. They will be turned into a regular css files
            .pipe(gulp.dest('src/css'))
            // call out our browser-sync stream functions
            .pipe(browserSync.stream()); 
});

// Move JS files to src/js
gulp.task('js', function() {
  //passing an array with file names
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
            // moving to different directory
            .pipe(gulp.dest("src/js"))
            .pipe(browserSync.stream());  
});

// Watch Sass & Server for any changes
gulp.task('serve', ['sass'], function() {
    //initialising our browserSync and loading into server
    browserSync.init({
      server: "./src"
    });
    
    // Compiling any time we save it
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Moving font awesome to src folder
gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
  .pipe(gulp.dest('src/fonts'));
});

// Move Font Awesome CSS to src/css
gulp.task('fa', function() {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest('src/css'));
});

// Run all tasks
gulp.task('default', ['js', 'serve', 'fa', 'fonts']);

//after this -- npm install -g gulp-cli