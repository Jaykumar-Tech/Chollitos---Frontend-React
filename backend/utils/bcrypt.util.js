const bcrypt = require('bcryptjs');
const crypto = require('crypto');

exports.compareHash = (plainPassword, hashedPassword) => bcrypt.compare(plainPassword, hashedPassword);

exports.createHash = (plainPassword) => bcrypt.hash(plainPassword, 10);


exports.generateStrongPassword = (length = 12) => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
  const password = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, characters.length);
    password.push(characters[randomIndex]);
  }

  return password.join('');
}