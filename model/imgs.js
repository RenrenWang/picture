var _query=require('../lib/db')._query;





exports.findAll=function(type,page,size,callback){
	//  _query('select * from  `imgs` where `status`=1  and `open`=1  ORDER BY `create_time` ASC ',callback);
 	//_query('SELECT a.avatar,a.username, b.id, b.description, b.create_time,b.imgurl,b.open,b.kind,b.`status` from  users a  inner join imgs b  on (b.user_id=a.id)  where b.`status`=1 and b.`open`=1 order by b.create_time  desc limit ?,?',[page,size],callback);

   _query('SELECT imgs.*, users.username,users.avatar,users.type,count(comments.id) AS c_count FROM imgs LEFT JOIN comments ON (imgs.id = comments.img_id) LEFT JOIN users ON (imgs.user_id = users.id) GROUP BY imgs.id HAVING imgs.`status` = 1 and imgs.`open`=1 and users.`type`=? ORDER BY imgs.create_time DESC limit ?,?',[type,page,size],callback);
}
exports.userFindAll=function(user_id,callback){
   _query('SELECT imgs.*, users.username,users.type,users.avatar,count(comments.id) AS c_count FROM imgs LEFT JOIN comments ON (imgs.id = comments.img_id) LEFT JOIN users ON (imgs.user_id = users.id) GROUP BY imgs.id HAVING imgs.`status` = 1 and  imgs.`user_id`=? ORDER BY imgs.create_time DESC ',[user_id],callback);
}

exports.findAllOk=function(page,size,callback){
	//  _query('select * from  `imgs` where `status`=1  and `open`=1  ORDER BY `create_time` ASC ',callback);
 	//_query('SELECT a.avatar,a.username, b.id, b.description, b.create_time,b.imgurl,b.open,b.kind,b.`status` from  users a  inner join imgs b  on (b.user_id=a.id)  where b.`status`=1 and b.`open`=1 order by b.create_time  desc limit ?,?',[page,size],callback);
   _query('select  imgs.*,users.username,users.type,users.avatar,count(comments.id) as c_count from imgs left JOIN users on(imgs.user_id=users.id) left JOIN comments on (imgs.id=comments.img_id)  GROUP BY imgs.id HAVING imgs.`status` = 1 and imgs.`open`=1 and imgs.isok=1 and users.`type`=0 ORDER BY imgs.create_time DESC limit ?,?',[page,size],callback);
}
exports.add=function(data,callback){

	_query('insert  into  `imgs` (`user_id`,`description`,`imgurl`,`open`,`kind`,`create_time`) values (?,?,?,?,?,?)', [data.user_id,data.description,data.imgurl,data.open,data.kind,data.create_time],callback);
}
exports.findOne=function(id,callback){
	  _query('select imgs.*,users.username,users.avatar,users.type from  `imgs` left join users on(imgs.user_id=users.id) where imgs.`status`=1   and imgs.`id`=? limit 1',[id],callback);
}
exports.count=function(callback){
	_query('select count(*) as count  from  `imgs`  where `status`=1 and `open`=1 ',callback);
}
exports.typeCount=function(type,callback){
   _query('SELECT count(*)  as count FROM imgs  LEFT JOIN users ON (imgs.user_id = users.id)  where imgs.`status` = 1 and imgs.`open`=1 and users.`type`=? ',[type],callback);
}

exports.delete=function(id,callback){
	//_query('update `imgs` set `status`=0 where `id`=?',[id],callback);
	_query('UPDATE imgs LEFT JOIN comments  on(imgs.id=comments.img_id)  set imgs.`status`=0,comments.`status`=0   WHERE  imgs.id=?',[id],callback);

}
exports.update=function(data,callback){

	_query('update `imgs` set `description`=?,`open`=?,`kind`=? where `id`=?',[data.description,data.open,data.kind,data.id],callback);
}
exports.changOk=function(id,isok,callback){
	_query('update  `imgs` set `isok`=? where `id`=?',[isok,id],callback);
}
