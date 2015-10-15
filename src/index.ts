//Tomcatjs tomcat manager library
// by Javier Peletier <jm@epiclabs.io>
// Inspired by node-tomcat-manager Tomasz Borychowski https://github.com/tborychowski


/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/q/Q.d.ts" />

import http = require("http");
import Q = require("q");

export module tomcatjs {

	interface UrlConfig {
		hostname: string;
		port: number;
		path: string;
		headers: { [headerName: string]: string };

	}

	export interface Callback {
		(err: any, data: any): void;
	}

	export class Manager {

		private urlCfg: UrlConfig = null;
		public ignoredApps: string[] = ['ROOT', 'manager', 'docs', 'examples', 'host-manager'];

		constructor(tomcatHostname: string, tomcatPort: number, tomcatUsername: string, tomcatPassword: string) {

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

		private fuzzyCompare(st1: string, st2: string) {

			var hay: string = st1.toLowerCase();
			var i: number = 0;
			var n: number = -1;
			var l: string;
			var s: string = st2.toLowerCase();

			for (; l = s[i++];)
				if (!~(n = hay.indexOf(l, n + 1)))
					return false;

			return true;

		}

		public getApps(): Q.IPromise<string[]> {
			var self = this;
			var defer = Q.defer<string[]>();

			var appList: string[] = [];
			this.tomcatGet("list", function(err: any, data: string) {
				if (err != null) {
					defer.reject(err);
					return;
				}

				data.split("\n").forEach(function(line: string) {
					if (line.indexOf('OK - Listed applications') === 0)
						return;
					line = line.trim();
					if (!line.length)
						return;
					var st = line.split(':');
					if (self.ignoredApps.indexOf(st[3]) > -1) return;

					//apps.push([st[3], st[1], st[2]]);
					appList.push(st[3]);

				})

				defer.resolve(appList);
			})

			return defer.promise;
		}

	}
}

