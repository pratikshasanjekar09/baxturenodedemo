const app = require('express').Router();
module.exports = (function () {
    var UserRoutes = require("./user/router");
    app.use('/users', UserRoutes);
    return app;
})();
//# sourceMappingURL=v1.js.map