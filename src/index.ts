// Original code by Tomasz Borychowski https://github.com/tborychowski
// Converted to nodejs module by Javier Peletier <jm@friendev.com>

/// <reference path="typings/node/node.d.ts" />
import http = require("http");

export module tomcatjs {

	interface UrlConfig {
		hostname: string;
		port: number;
		path: string;
		headers: { [headerName: string]: string };

	}

	interface Callback {
		(err: any, data: any): void;
	}

	export class Manager {

		private urlCfg: UrlConfig = null;
		private tomcatHostname: string;
		private tomcatPassword: string;
		private tomcatUsername: string;

		constructor(tomcatHostname: string, tomcatPort: number, tomcatUsername: string, tomcatPassword: string) {
			this.tomcatPassword = tomcatPassword;
			this.tomcatHostname = tomcatHostname;
			this.tomcatUsername = tomcatUsername;

			this.urlCfg = {
				hostname: tomcatHostname,
				path: null,
				port: tomcatPort,
				headers: { "Authorization": 'Basic ' + new Buffer(tomcatUsername + ":" + tomcatPassword).toString('base64') }
			};
		}

		private tomcatGet(path: string, cb: Callback) {
			var resp: string = '';

			this.urlCfg.path = '/manager/text/' + path;
			var request = http.request(this.urlCfg, function(res: http.IncomingMessage) {
				res.on('data', function(chunk) { resp += chunk; });
				res.on('end', function() { cb(null, resp); });
			});
			
			request.on('error', function(e) {
				cb(e, null);
			});
			
			request.end();
			

		}

		public getApps() {
			this.tomcatGet("list", function(err: any, data: any) {
				console.log(data);
				console.log("error=" + err);


			})

		}

	}
}

