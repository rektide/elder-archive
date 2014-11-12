module.exports= (function is(self, is){
	self= self|| this
	for(var i in self.types){
		if(~self.types[i].indexOf(is))
			return true
	}
	return self.types && self.types.contains(is)
}
