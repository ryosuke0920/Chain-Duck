export const TWITTER_URL = "https://twitter.com/search?vertical=default&q=";
export const COMMENT_WINDOW_WIDTH = 1000;
export const COMMENT_WINDOW_MARGIN = 100;
export const PARAMETER_FILTER = [
	{
		"regex": /^https:\/\/www.youtube.com\/watch\/?\?/,
		"keys": ["v"]
	},{
		"regex": /^https:\/\/headlines.yahoo.co.jp\/hl\/?\?/,
		"keys": ["a"]
	}
];
export const ALLOWED_URL_REGEX = [
	/^https?:\/\//
];
export const DENIED_URL_REGEX = [
	/^https?:\/\/www\.bing\.com\/(?:search|maps)\/?\?/,
	/^https?:\/\/www\.bing\.com\/(?:images|videos|news)\/search\/?\?/,
	/^https?:\/\/image\.baidu\.com\/search\//,
	/^https?:\/\/tieba\.baidu\.com\/f\/?\?/,
	/^https?:\/\/www\.baidu\.com\/s\/?\?/,
	/^https?:\/\/zhidao\.baidu\.com\/search\/?\?/,
	/^https?:\/\/duckduckgo\.com\/\?/,
	/^https?:\/\/www\.ecosia\.org\/(?:search|images|news|videos)\/?\?/,
	/^https?:\/\/www\.facebook\.com\/search\//,
	/^https?:\/\/www\.google\.com\/search\/?\?/,
	/^https?:\/\/www\.google\.co\.[a-z]{2,3}\/search\/?\?/,
	/^https?:\/\/(?:search|dict)\.naver\.com\/search\./,
	/^https?:\/\/search\.shopping\.naver\.com\/search\./,
	/^https?:\/\/music\.taihe\.com\/search\//,
	/^https?:\/\/twitter\.com\/search\/?\?/,
	/^https?:\/\/search\.yahoo\.co\.jp\/.+/,
	/^https?:\/\/search\.yahoo\.com\/search\/?\?/,
	/^https?:\/\/(?:images|video|news)\.search\.yahoo\.com\/search/,
	/^https?:\/\/yandex\.com\/search\/?\?/,
	/^https?:\/\/yandex\.com\/(?:images|video)\/search\/?\?/,
	/^https?:\/\/news\.yandex\.com\/yandsearch\/?\?/
];
export const UPDATE_WAIT_TIME = 1000;
