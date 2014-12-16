module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		coffee: {
			options: {
	      join: true
	    },
			compileWithMaps: {
				files: {
					'app/scripts/build/kcw.js':['app/scripts/src/*.coffee', 'app/scripts/src/controllers/*.coffee']
				}
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			build: {
				files: {
					'app/scripts/dest/kcw.min.js': ['app/scripts/build/kcw.js']
				}
			}
		},
		watch: {
			js: {
				files: ['app/scripts/src/*.coffee','app/scripts/src/controllers/*.coffee'],
				tasks: ['coffee', 'uglify']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['coffee', 'uglify']);
}