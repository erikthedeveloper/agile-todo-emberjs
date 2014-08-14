var gulp       = require('gulp'),
    compass    = require('gulp-compass'),
    sass       = require('gulp-sass'),
    watch      = require('gulp-watch'),
    handlebars = require('gulp-ember-handlebars'),
    uglify     = require('gulp-uglify'),
    concat     = require('gulp-concat');


gulp.task('css', function() {
    gulp.src('scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js_vendor', function() {
    gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/handlebars/handlebars.js',
        'bower_components/ember/ember.js',
        'bower_components/ember-data/ember-data.js'
    ])
    .pipe(uglify({ mangle: false }))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('handlebars', function() {
    gulp.src(['hbs_templates/' + '**/*.hbs'])
        .pipe(handlebars({
          outputType: 'browser',
          namespace: 'Ember.TEMPLATES'
        }))
        .pipe(concat('hbs_templates.js'))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('js_main', function() {
    gulp.src([
        'app.js',
        'js/**/*.js'
    ])
    // .pipe(uglify({ mangle: true }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('js', ['js_vendor', 'js_main']);


gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['css']);
    gulp.watch('hbs_templates/**/*.hbs', ['handlebars']);
    gulp.watch(['app.js', 'js/**/*.js'], ['js']);
});

// gulp.task('default', ['css', 'js', 'handlebars', 'watch']);
gulp.task('default', ['js', 'handlebars', 'css']);