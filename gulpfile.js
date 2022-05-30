const {src, dest, task, series, watch, parallel} = require('gulp');
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass')(require('dart-sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
// const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

task('clean', () => {
  console.log(env);
  return src( 'dist/**/*', { read: false }).pipe(rm());
});

task('copy:html', () => {
  return src('src/*.html')
  .pipe(dest('dist'))
  .pipe(reload({stream:true}));
});

task('copy:img', () => {
  return src('src/img/**/*.*')
  .pipe(dest('dist/img'))
  .pipe(reload({stream:true}));
});

task('copy:video', () => {
  return src('src/video/**/*.*')
  .pipe(dest('dist/video'))
  .pipe(reload({stream:true}));
});

const styles = [
  'node_modules/normalize.css/normalize.css',
  'src/scss/main.scss'
]

task('styles', () => {
  return src(styles)
  .pipe(gulpif(env === 'dev', sourcemaps.init()))
  .pipe(concat('main.scss'))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  // .pipe(px2rem())
  .pipe(gulpif(env === 'dev', 
    autoprefixer({
    cascade: false
  })))
  .pipe(gulpif(env === 'prod', gcmq()))
  .pipe(gulpif(env === 'prod', cleanCSS()))
  .pipe(gulpif(env === 'dev', sourcemaps.write()))
  .pipe(dest('dist/css'));
});

const libs = [
  'node_modules/jquery/dist/jquery.slim.js', 
  'node_modules/mobile-detect/mobile-detect.js',
  'node_modules/bxslider/dist/jquery.bxslider.js',
  'node_modules/jquery-touchswipe/jquery.touchSwipe.js',
  'src/js/*.js'
]

task('scripts', () => {
  return src(libs)
  .pipe(gulpif(env === 'dev', sourcemaps.init()))
  .pipe(concat('main.js'))
  // .pipe(uglify())
  .pipe(gulpif(env === 'dev', sourcemaps.write()))
  .pipe(dest('dist/js'));
});

task('icons', () => {
  return src('src/img/sprite/*.svg')
  .pipe(svgo({
    plugins: [
      {
        removeAttrs: {
          attrs: '(fill|stroke|style|width|height|data.*)'
        }
      }
    ]
  })
  )
  .pipe(svgSprite({
    mode: {
      symbol: {
        sprite: 'sprite.svg'
      }
    }
  }))
  .pipe(dest('dist/img/sprite/'));
})

task('server', () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    open: true
  })
});

task('watch', () => {
  watch('src/scss/**/*.scss', series('styles'));
  watch('src/*.html', series('copy:html'));
  watch('src/js/*.js', series('scripts'));
  watch('src/img/sprite/*.svg', series('icons'));
});

task(
  'default', 
  series(
    'clean', 
    parallel(
    'copy:html', 
    'copy:img',
    'copy:video',
    'styles', 
    'scripts',
    'icons'),
    parallel(
    'watch',
    'server')
  )
);

task(
  'build', 
  series(
    'clean', 
    parallel(
    'copy:html', 
    'copy:img',
    'copy:video',
    'styles', 
    'scripts',
    'icons')
  )
);