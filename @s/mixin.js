var _ = require('lodash-node/modern')

module.exports= (function mixin(type, o){
	var types= o.types|| (o.types= [])
	types.push(type)

	if(!o.is){
		function is(type){
			var types= o.types
			for(var i in types){
				if(~types[i].indexOf(type)){
					return types[i]
				}
			}
		}
		Object.defineProperty(o, 'is', {
			value: is
		})
	}
	if(!o.properties){
		var properties= {}
		function _properties(){
			var props= _.chain(o.types)
				.reverse()
				.pluck('properties')
				.unshift({})
				.push(properties)
				.value()
			return _.merge(props)
		}
		Object.defineProperty(o, 'properties', {
			get: _properties,
			set: function(val){
				properties= val
			}
		})
	}
	if(!o.annotate){
		var annotations= []
		function _annotations(additional){
			var annotations= _.chain(o.types)
				.reverse()
				.pluck('annotate')
				.concat(additional)
				.value()
			return annotations
		}
		Object.defineProperty(o, 'annotate', {
			get: function(){
				return _annotations(annotations)
			},
			set: function(val){
				annotations= _.difference(val, _annotations())
			}
		})
	}
})
