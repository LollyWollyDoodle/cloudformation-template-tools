const AWS = require("aws-sdk");
AWS.config.update({ region: require("process").env.AWS_REGION });
const cf = new AWS.CloudFormation({ apiVersion: "2010-05-15" });

const gutil = require("gulp-util");
const PluginError = gutil.PluginError;
const through2 = require("through2");
const Vinyl = require("vinyl");

const PLUGIN_NAME = "cloudformation-template-tools";

module.exports = {
	validate: function () {
		return through2.obj(function (file, encoding, cb) {
			if (file.isStream()) {
				cb(new PluginError(PLUGIN_NAME, "Streams aren't supported"));
			}
			else {
				cf.validateTemplate({ TemplateBody: file.contents.toString(encoding) }, function (err, data) {
					if (err === null) {
						var validated = new Vinyl({
							base: file.base,
							path: file.base + "/" + file.relative + ".validated"
						});

						validated.contents = Buffer.from(JSON.stringify(data), "UTF-8");
						cb(null, validated);
					}
					else {
						cb(err);
					}
				});
			}
		});
	}
};
