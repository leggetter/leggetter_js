leggetter.namespace("leggetter.twitter");
leggetter.depends([
  {
    name: "jQuery",
    src: "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"
  },
  {
    name: "leggetter.EventEmitter",
    src: "js/leggetter/EventEmitter.js"
  }
]);

leggetter.twitter.TweetEmitter = function(options) {
  
  leggetter.EventEmitter.call(this);
  options = options || {};
  
  if(!options.query) {
    throw "query must be set";
  }
  
  this.settings = {
    searchUrl: "http://search.twitter.com/search.json",
    queryPrefix: "?q=",
    queryPageParam: "&rpp=100",
    query: options.query,
    updateFrequency: options.updateFrequency || 10
  };
  this._twitterSearch = this.settings.searchUrl +
                        this.settings.queryPrefix +
                        this.settings.query +
                        this.settings.queryPageParam;
  this.getTweets();
};
leggetter.extend(leggetter.twitter.TweetEmitter, leggetter.EventEmitter)

leggetter.twitter.TweetEmitter.prototype.getTweets = function() {

  var self = this;
  $.ajax({
    url: this._twitterSearch,
    dataType: 'jsonp',
    success: function(tweets) {
      self.handleTweets(tweets);
    },
    crossDomain: true
  });
};

leggetter.twitter.TweetEmitter.prototype.handleTweets = function(tweets){

  var self = this;
  this._twitterSearch = this.settings.searchUrl + tweets.refresh_url;
  
  this.trigger("tweetsReceived", tweets)
  
  setTimeout(function() {
    self.getTweets();
  }, self.settings.updateFrequency * 1000);
};