// const Users = require('../schemas');
const userService = require('../services/user-service');
const user = userService();
module.exports = async (req, res) => {
  try {
    const found_user = await user.find_user(req.params.userId);
    console.log(found_user);
    console.log("---------------");
    if (found_user) {
      res.status(200).json({ data: found_user, 'message': 'Successfully fetched a user.' });
    } else {
      res.status(204).json({ data: [], 'message': 'There is no user found linked with the credential.' });
    }
  } catch (error) {
    res.status(400).json({ error, 'message': 'Failled to fetche users.' });
  }
};