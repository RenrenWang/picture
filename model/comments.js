var _query=require('../lib/db')._query;
exports.add=function(data,callback){
	_query('insert  into  `comments` (`user_id`,`img_id`,`content`,`create_time`) values (?,?,?,?)', [data.user_id,data.img_id,data.content,data.create_time],callback);
}
exports.imgIdFindAll=function(img_id,callback){
_query('select users.username,users.type,users.avatar,comments.* from users  INNER join comments on users.id=comments.user_id  WHERE  comments.`status`=1 and comments.`img_id`=? ORDER BY  comments.create_time asc', [img_id],callback);
// users.type desc,
}
exports.count=function(callback){
_query('select count(*) as count from where `status`=1 ',callback);

}