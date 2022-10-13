const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/user-service');

let user_data = userService()
module.exports = async (req, res) => {
  const {
    username,
    password,
    first_name,
    last_name
  } = req.body;
  if (!username || !password || !first_name || !last_name) return res.status(400).json({ 'message': 'All fields are required.' });

  // const duplicate = await User.find({ username });
  const duplicate = await user_data.find_username(username);
  // console.log(duplicate);
  if (duplicate) return res.status(409).json({ 'message': 'An account with this username already exist.' });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await user_data.create_user(
      username,
      hashedPassword,
      first_name,
      last_name
    );
    res.status(201).json({ data: user, 'message': 'User successfully created.' });
  } catch (error) {
    res.status(500).json({ error, 'message': error.message });
  }
};