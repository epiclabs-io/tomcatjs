/// <binding Clean='clean' />
var gulp = require("gulp");
var typescript = require('gulp-tsc');
var shell = require("shelljs");
var merge = require("merge-stream");
var dts = require("dts-bundle");

var buildConfig =
{
	sourceDirectory: "./src",
	outputDirectory: "./dist",
	externalModuleName: "tomcatjs",
	indexFileName: "index"
}



var tsOpts =
 {
    declaration: true,
    target: "ES5",
    module: "commonjs",
    sourceMap: true,
    "exclude":[
        "node_modules",
        "typings"
    ]


}


gulp.task("clean", function() {
	
	shell.rm("-rf",buildConfig.outputDirectory);
	
});


gulp.task("compile", ["clean"], function () {
	var src = buildConfig.sourceDirectory;
	var dist = buildConfig.outputDirectory;
    var tscCompile = gulp.src([src + '/**/*.ts'])
    .pipe(typescript(tsOpts))
    .pipe(gulp.dest(dist)).on('end',function() {
		dts.bundle({
		name: buildConfig.externalModuleName,
		main: dist+'/' + buildConfig.indexFileName + '.d.ts'
		})
	});
	
	var copyAll = gulp.src([src + '/**/*.*','!' + src + '/**/*.ts'])
	.pipe(gulp.dest(dist));
	
	var copyDot = gulp.src([src + '/**/.*','!' + src + '/**/*.ts'])
	.pipe(gulp.dest(dist));
	
	var copyREADME = gulp.src(["README.md"])
	.pipe(gulp.dest(dist));
	
	return merge(tscCompile, copyAll, copyDot,copyREADME);
	
});

function publish()
{
	function done()
	{
		console.log("npm publish finished");
	}
	
	function callback(code,output) {
		console.log('NPM exit code: ' + code);
		if (code !== 0) {
		  console.log('NPM publish error');
		}
	} 
	
	shell.cd(buildConfig.outputDirectory);
    shell.exec('npm publish',  callback);//.on('close', done);
	shell.cd("..");
}


gulp.task("publish", function () {

	publish();

});

gulp.task("hotpublish", ["compile"], function()
{
	publish();
	
});

gulp.task("unpublish", function () {
	function done()
	{
		console.log("npm publish finished");
	}
	
	function callback(code,output) {
		console.log('NPM exit code: ' + code);
		if (code !== 0) {
		  console.log('NPM unpublish error');
		}
	} 
	
	shell.cd(buildConfig.outputDirectory);
    shell.exec('npm unpublish --force',  callback);
	shell.cd("..");

});

gulp.task("init", function(done) {
	
	function callback(code,output) {
		console.log('NPM exit code: ' + code);
		if (code !== 0) {
		  console.log('NPM init error');
		  done("error initializing project");
		}
		else {
			console.log("new project initialized in " + buildConfig.sourceDirectory);
		}
	} 
	shell.mkdir(buildConfig.sourceDirectory);
	shell.cd(buildConfig.sourceDirectory);
    shell.exec('npm init',  callback);
	shell.cd("..");
	
	
	
	
});

