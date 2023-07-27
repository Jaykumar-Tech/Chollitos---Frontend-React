const UserModel = require('../models/user.model');
const cacheUtil = require('../utils/cache.util');

exports.updateUser = (user, id)=> {
    return UserModel.update(user, {
          where: { id: id } // Specify the condition for the record to update
        }
      );
}

exports.createUser = (user) => {
    return UserModel.create(user);
}

exports.findUserByEmail = (email) => {
    return UserModel.findOne({
        where: {
            email: email
        }
    })
}

exports.findUserById = (id) => {
    return UserModel.findByPk(id);
}

exports.logoutUser = (token, exp) => {
    const now = new Date();
    const expire = new Date(exp * 1000);
    const milliseconds = expire.getTime() - now.getTime();
    /* ----------------------------- BlackList Token ---------------------------- */
    return cacheUtil.set(token, token, milliseconds);
}

exports.getAllUsers = () => {
    return UserModel.findAll() ;
}

exports.deleteUser = (id) => {
    return UserModel.destroy({
        where: {
            id: id
        }
    });
}