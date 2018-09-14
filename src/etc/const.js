export const TWITTER_URL = "https://twitter.com/search?vertical=default&q=";
export const COMMENT_WINDOW_WIDTH = 1000;
export const COMMENT_WINDOW_MARGIN = 50;
export const PARAMETER_FILTER = [
	{
		"regex": /^https:\/\/www.youtube.com\/watch\/?\?/,
		"keys": ["v"]
	},{
		"regex": /^https:\/\/headlines.yahoo.co.jp\/hl\/?\?/,
		"keys": ["a"]
	}
];
