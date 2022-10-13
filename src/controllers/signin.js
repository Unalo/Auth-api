require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/user-service');
const user = userService();

module.exports = async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username or Password are required.' });

    const found_user = await user.find_username( username );
    console.log(found_user);
    if (found_user === false) return res.status(401).json({ 'message': 'An acount with such credentials does not exist.' });
    else {
      console.log(await user.find_password(username));
      if (await bcrypt.compare(password, await user.find_password(username))) {
        const id = await user.find_id(username);
        console.log("-----------------------");

        const access_token = jwt.sign({ id }, `secretKey`, { expiresIn: '20s' });
        const refresh_token = jwt.sign({ id }, `secretKey`, { expiresIn: '1d' });
        console.log(refresh_token);
        console.log("-----------------------");

        const updated_user = await user.update_user( id , refresh_token);
        res.cookie('jwt', refresh_token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.status(200).json({ access_token, 'message': 'Successfully signin.' })
      }
      return res.status(403).json({ access_token, 'message': 'Username or password is incorrrect.' })
    }
  } catch (error) {
    res.status(401).json({ error, ' message': error.message });
  }
};