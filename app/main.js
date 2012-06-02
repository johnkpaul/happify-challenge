require([
  "namespace",
  "jquery",
  "use!backbone",
  "modules/happify"
],

function(namespace, $, Backbone, Happify) {

  Happify.challengeList = new Happify.ChallengeList();

  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "challenge/:id": "getChallenge"
    },

    index: function() {
      var challengesView = new Happify.Views.Challenges({collection: Happify.challengeList});
      Happify.challengeList.fetchOnce().done(function(){
        challengesView.render(function(el) {
            $("#main").empty().append(el);
          });
        });
    },

    getChallenge:function(id){
      Happify.challengeList.fetchOnce().done(function(){
        var challenge = Happify.challengeList.get(id)
        var challengeInfoView = new Happify.Views.ChallengeInfo({model:challenge}).render();
        $("#main").empty().append(challengeInfoView.el);
      });
    }

  });

  var app = namespace.app;

  $(function() {
    app.router = new Router();

    Backbone.history.start();
  });

  $(document).on("click", "a:not([data-bypass])", function(evt) {
    var href = $(this).attr("href");
    var protocol = this.protocol + "//";
    if (href && href.slice(0, protocol.length) !== protocol &&
        href.indexOf("javascript:") !== 0) {
      evt.preventDefault();
      Backbone.history.navigate(href, true);
    }
  });

});
