var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'Ash'
  };

  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(31, (userObject) => {
  console.log(userObject);
});
