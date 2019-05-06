'use strict'

var gulp = require('gulp'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	smartgrid = require('smart-grid'),
	gcmq = require('gulp-group-css-media-queries'),
	cleanCSS = require('gulp-clean-css'),
	browserSync = require('browser-sync').create();


/* It's principal settings in smart grid project */
var settings = {
	outputStyle: 'less', /* less || scss || sass || styl */
	columns: 12, /* number of grid columns */
	offset: '40px', /* gutter width px || % || rem */
	mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
	container: {
		maxWidth: '1760px', /* max-width оn very large screen */
		// fields: '15px'  side fields 
	},
	breakPoints: {
		xl: {
			width: '1550px',
			fields: '5%',
			offset: '30px'
		},
		lg: {
			width: '1100px', /* -> @media (max-width: 1100px) */
			offset: '30px'
		},
		md: {
			width: '960px',
			offset: '30px'
		},
		sm: {
			width: '780px',
			offset: '30px'
		},
		xs: {
			width: '560px',
			offset: '30px'
		}
		/* 
		We can create any quantity of break points.

		some_name: {
			width: 'Npx',
			fields: 'N(px|%|rem)',
			offset: 'N(px|%|rem)'
		}
		*/
	}
};

smartgrid('./less', settings);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
	    // tunnel: true,
	    // host: 'localhost',
	    // port: 9000, // измените
	    // logPrefix: "twixer554"
	});
});

gulp.task ('less', function () {
	return gulp.src('./less/main.less')
		.pipe(less({}))
		.pipe(autoprefixer({
			browsers: ['> 0.1%'],
			cascade: false
		}))
		.pipe(gcmq())
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.reload({
			stream:true
		})); 
});

gulp.task('watch', function () {
	gulp.watch('./less/**/*.less', gulp.series('less'));
});

gulp.task('default', gulp.series(
	gulp.parallel('less'),
	gulp.parallel('watch', 'browser-sync')	
));