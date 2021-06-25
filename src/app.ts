import errorHandler from "errorhandler";
import WebApp from "./Web";
import AdminApp from "./Admin";
import { WebPort, AdminPort } from "./config/config";
WebApp.use(errorHandler());
AdminApp.use(errorHandler());
const models = require("./config/config");

WebApp.listen(WebPort.port, () => {
  console.log(`Web is running at http://${getIPAddress()}:${WebPort.port}`);
});

AdminApp.listen(AdminPort.port, () => {
  console.log(`Admin is running at http://${getIPAddress()}:${AdminPort.port}`);
});

// Sync Database
models.sequelize.sync().then(function () {
  console.log("Nice! Database looks fine");
}).catch(function (err: any) {
  console.log(err, "Something went wrong with the Database Update!");
});

function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }
  return '0.0.0.0';
}
