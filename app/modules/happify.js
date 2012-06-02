define([
  "namespace",
  "use!backbone",
  "util/mixins"
],

function(namespace, Backbone, Mixins) {

  var Happify = namespace.module();

  Happify.Challenge = Backbone.Model.extend({
    initialize: function(){
      this.bind('selected', function(){
        namespace.app.router.navigate('#challenge/'+this.get('id'), {trigger:true});
      }, this);
    }  
  });

  Happify.ChallengeList = Backbone.Collection.extend({
    model: Happify.Challenge,
    url: 'http://happify-test-api.herokuapp.com/api/challenges'
  });
  _.extend(Happify.ChallengeList.prototype, Mixins.Models.fetchOnce);

  Happify.Views.Challenge = Backbone.View.extend({
    template: "app/templates/challenge.html",
    events: {
        'click li' : 'selectChallenge'
    },
    selectChallenge: function(){
        this.model.trigger('selected');        
    },
    render: function(done){
      var view = this;         
      
      namespace.fetchTemplate(this.template, function(tmpl){
        view.$el.append($(tmpl(view.model.toJSON())));
        
        if (_.isFunction(done)) {
          done(view.el);
        }
      });

      return this;
    }
  });
  Happify.Views.Challenges = Backbone.View.extend({
    template: "app/templates/challenges.html",
    
    render: function(done) {
      var view = this;

      namespace.fetchTemplate(this.template, function(tmpl) {
        view.$el.append($(tmpl()));

        view.collection.each(function(challenge){
            var challengeView = new Happify.Views.Challenge({model:challenge})
            challengeView.render(function(){
                view.$('ul').append(challengeView.el);
            })
        });

        if (_.isFunction(done)) {
          done(view.el);
        }
      });

      return this;
    }
  });

  Happify.Views.ChallengeInfo = Backbone.View.extend({
    template: "app/templates/challengeInfo.html",
    events: {
        
    },
    render: function(done){
      var view = this;         
      
      namespace.fetchTemplate(this.template, function(tmpl){
        view.$el.append($(tmpl(view.model.toJSON())));
        
        if (_.isFunction(done)) {
          done(view.el);
        }
      });

      return this;
    }
  });

  return Happify;

});
