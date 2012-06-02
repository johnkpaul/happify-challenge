define([
  "namespace",
  "use!backbone"
],

function(namespace, Backbone) {

  var Mixins = namespace.module();
  Mixins.Models = {};

  Mixins.Models.fetchOnce = {
    fetchOnce:function(){
      if(!this._deferred){
        this._deferred = this.fetch();
      }
      return this._deferred;
    }
  }

  return Mixins;

});
