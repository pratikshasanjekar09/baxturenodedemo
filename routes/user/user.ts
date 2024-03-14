const path = require('path')
import UserController from "../../controllers/user.controller";
import commonHelper from "../../helpers/common";
const { GetUser, GetUserById, AddUsers, UpdateUserById, DeleteUserById } = new UserController();


module.exports = function (router) {
    //get users 
    router.get('/', GetUser);
    //get user by user id 
    router.get('/:id', GetUserById);
    // add record 
    router.post('/', AddUsers);
    //update user 
    router.put('/:id', UpdateUserById);
    //delete user
    router.delete('/:id', DeleteUserById);


}
