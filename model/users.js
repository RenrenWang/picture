var _query=require('../lib/db')._query;

exports.add=function(data,callback){
	_query('insert  into  `users` (`username`,`password`,`create_time`,`type`) values (?,?,?,?)', data,callback);
}
exports.usernameFind=function(username,callback){
	 _query('select * from users where `username`=? ', [username], callback);
}

exports.updateLastTime=function(data,callback){
	 _query('update   `users`   set `last_time`=? where `id`=?', [data.last_time,  data.id],callback);
	
}
exports.updateAvatar=function(data,callback){
  _query('update  `users`  set `avatar`=? where `id`=?',[data.avatar,data.id],callback);
}
