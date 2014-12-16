module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: [
					'app/script/src/*.js','app/script/src/controllers/*.js'
				],
				dest: 'app/script/build/kcw.js'
			}
		},
		uglify: {
			build: {
				files: {
					'app/script/dest/kcw.min.js': ['app/script/build/kcw.js']
				}
			},
			options: {
				mangle: false
			}
		},
		watch: {
			js: {
				files: ['app/script/src/*.js','app/script/src/controllers/*.js'],
				tasks: ['concat', 'uglify']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['concat', 'uglify']);
}