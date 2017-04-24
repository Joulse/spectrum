/**
 * Use a mock database
 */
export const db = require('rethinkdbdash')({
  db: 'testing',
});

export const data = {
  users: [
    {
      uid: 'first-user',
      createdAt: new Date('January 2, 2017'),
      displayName: 'First User',
      lastSeen: new Date('February 2, 2017'),
      photoURL: 'my-photo.jpg',
      email: 'first.user@gmail.com',
      username: 'first',
    },
  ],
};

export const setup = db => {
  return db
    .dbCreate('testing')
    .run()
    .then(() =>
      Promise.all([
        db.tableCreate('stories').run(),
        db.tableCreate('frequencies').run(),
        db.tableCreate('communities').run(),
        db.tableCreate('messages').run(),
        db.tableCreate('direct_messages').run(),
        db.tableCreate('sessions').run(),
        db.tableCreate('reactions').run(),
        db.tableCreate('direct_message_groups').run(),
        db.tableCreate('users', { primaryKey: 'uid' }).run(),
      ])
    )
    .then(result => db.table('users').insert(data.users[0]).run())
    .catch(err => {
      console.log(err);
    });
};

export const teardown = db =>
  db.dbDrop('testing').run().catch(err => {
    console.log(err);
  });