const faker = require("faker");

function users(max = 50) {
  const users = [];
  for (let id = 0; id < max; id++) {
    if (id === 0) {
      users.push({
        id: 0,
        email: "ambratolm@gmail.com",
        password: "$2y$12$ohrqO.nw0fy6EfG6v/2eWeDV5sV1ELAnCUQ28x5UhZgPBL6JymkLa", // amb123pass
        role: "admin",
        name: "ambratolm",
        description: "Making cool things for cool multimedias",
        avatar:
          "https://3.bp.blogspot.com/-sUrbPwVErNo/Vd3kcH5K6-I/AAAAAAAADRo/9Hy0tFt6jXA/s1600/Guard_ASBP.jpg"
      });
    } else {
      users.push({
        id: id,
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.internet.userName(),
        description: faker.lorem.words(),
        avatar: faker.image.avatar()
      });
    }
  }
  return users;
}

function notes(max = 50, authorsMax = 50) {
  const notes = [];
  for (let id = max; id < max+10; id++) {
    notes.push({
      id: id,
      userId: 0,
      date: faker.date.between("2019-01-01", "2015-12-31"),
      title: faker.lorem.word(),
      content: faker.lorem.paragraph()
    });
  }
  for (let id = 0; id < max; id++) {
    notes.push({
      id: id,
      userId: faker.random.number({ min: 0, max: authorsMax }),
      date: faker.date.between("2019-01-01", "2015-12-31"),
      title: faker.lorem.word(),
      content: faker.lorem.paragraph()
    });
  }
  return notes;
}

module.exports = function() {
  return {
    users: users(10),
    notes: notes(20, 10)
  };
};
