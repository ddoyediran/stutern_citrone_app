const createUserPayload = (user) => {
  // return {
  //   name: user.name,
  //   userId: user._id,
  //   role: user.role,
  // };
     return {
      userId: user._id,
     email: user.email
   };
};

module.exports = createUserPayload;
