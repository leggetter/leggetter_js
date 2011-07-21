# leggetterJS

I've been planning on collating a bunch of JavaScript and examples for a long time and the plan is for `leggetterJS` to be just that.

## Libraries

### /js/leggetter/index.js

The main `leggetterJS` file. It contains utilities:

* `leggetter.namespace(namespace)`

  `leggetter.namespace("hello.monkey.cheese")` will make `hello.monkey.cheese` available so you can attach classes and properties to that namespace.
  
* `leggetter.extend(subClass, superClass)`

  Simple and powerful inheritance. `subClass` will inherit from `superClass`
    
### /js/leggetter/EventEmitter.js

A class that can either be used through inheritance or through composition.

* `new leggetter.EventEmitter()`

  Simple constructor with no arguments.
  
* `leggetter.EventEmitter.bind(eventName, listener)`

  Bind a listener function to be called whenever the event with `eventName` is triggered.
  
* `leggetter.EventEmitter.trigger(eventName, args...)`

  Trigger the event with `eventName`. `args...` means that all additional arguments will be passed to the assigned listeners.

        var em = new leggetter.EventEmitter();
        em.bind('someEvent', function(arg1, arg2) {
          // do something
        });
    
        em.trigger('someEvent', "I'm arg one", "I'm arg two");


### /js/leggetter/QueryHelper.js

Recently I've found it really handy to pass parameters in the query string of a web page for configuration e.g. `<http://www.leggetter.co.uk/leggetter_js/examples/tweet_images/?q=twitpic>`. This class helps extract the information from the query string. *I've written this code so many times I needed to create a reusable class.

* `new leggetter.QueryHelper()`

  Simple empty constructor
  
* `leggetter.QueryHelper.getInstance()`

  Static method that gets a singleton instance of the `leggetter.QueryHelper`

* `leggetter.QueryHelper.getQueryValue(name, defaultValue)`

  Gets the value for the parameter indicated by `name`. If the value isn't found and the option `defaultValue` parameter has been supplied its value will be returned. Otherwise `undefined` will be returned.
  
### /js/leggetter/twitter/TweetEmitter.js

A class that polls <http://search.twitter.com> at configurable intervals with a configurable `query` parameter. When new Tweets are received a `tweetsReceived` event is emitted passing the result JSON from Twitter.

See <http://search.twitter.com/api/> for more information on how to structure queries.

You can find an example JSON response by going to <http://search.twitter.com/search.json?q=twitter>.

* `new leggetter.twitter.TweetEmitter(options)`

  Creates a new TweetEmitter. `options` must contain a `query` property that is used to query Twitter for results.

* `leggetter.twitter.TweetEmitter.bind('tweetsReceived', listener)`

  Bind to the `tweetsReceived` event. The `listener` will be called whenever any new tweets are received.
  
        var te = new leggetter.twitter.TweetEmitter({"query": "twitpic"});
        te.bind('tweetsReceived', function(tweets) {
          var results = tweets.results;
        });

## Examples

You can find the examples hosted on my website here:

<http://www.leggetter.co.uk/leggetter_js/examples/>

* Basic twitter search: http://www.leggetter.co.uk/leggetter_js/examples/simple_tweets/?q=tech
* Image search with the help of <embed.ly>: http://www.leggetter.co.uk/leggetter_js/examples/tweet_images/?q=twitpic