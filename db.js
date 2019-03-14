var mongoose = require("mongoose"); // 引入mongoose
mongoose.connect('mongodb://localhost/classics'); // 连接到mongoDB的runoob数据库
// 该地址格式：mongodb://[username:password@]host:port/database[?options]
// 默认port为27017 

var db = mongoose.connection;
db.on('error', function callback() { // 监听是否有异常
  console.log("Connection error");
});
db.once('open', function callback() { // 监听一次打开
  // 在这里创建你的模式和模型
  console.log('connected!');
});
var todoSchema = new mongoose.Schema({
  user_id: String, // 定义一个属性user_id，类型为String
  content: String, // 定义一个属性content，类型为String
  updated_at: Date // 定义一个属性updated_at，类型为Date
});

var poetSchema = mongoose.Schema({}, {collection: 'poets'})

mongoose.model('todo', todoSchema); // 将该Schema发布为Model,user就是集合名称
mongoose.model('poets', poetSchema, 'poets')  // 这里的第三个参数是解决在数据库中集合名会自动变为复数的问题
module.exports = mongoose;