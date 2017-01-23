const AWS = require("aws-sdk");
AWS.config.update({ region: require("process").env.AWS_REGION });
const cf = new AWS.CloudFormation({ apiVersion: "2010-05-15" });

module.exports = {
	validate: function (body, cb) {
		cf.validateTemplate({ TemplateBody: body }, cb);
	}
};
