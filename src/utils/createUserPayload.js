const createUserPayload = (user) => {

  return {
    userId: user._id,
    email: user.email
  };
};

module.exports = createUserPayload;
