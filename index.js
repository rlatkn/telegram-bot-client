var Promise = require('promise');
var ApiClient = require('./src/apiclient');

function TelegramBotClient(token, promise){

	if (!token){
		throw new Error('You must pass a token to the constructor!');
	}

	promise = promise || Promise.resolve();

	var apiClient = new ApiClient(token);

	this.sendMessage = function(chatId, message){
		return new TelegramBotClient(token, promise.then(function(){
			return apiClient.sendMessage(chatId, message);
		}));
	};

	this.delay = function(ms){
		return new TelegramBotClient(token, promise.then(function(){
			return new Promise(function(resolve, reject){
				setTimeout(resolve, ms);
			});
		}));
	};

	this.promise = function(){
		return promise();
	};

	this.catch = function(handler){
		promise.catch(handler);
	};

}

module.exports = TelegramBotClient;