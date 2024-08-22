const format = require('pg-format');


const db = require('./connection');

const seed = async ({ userData }) => {


 

  const insertUsersQueryStr = format(
    'INSERT INTO users ( username, name, avatar_url) VALUES %L RETURNING *;',
    userData.map(({ username, name, avatar_url }) => [
      username,
      email,
      name,
      password,
      funds,
    ])
  );
  const usersPromise = db
    .query(insertUsersQueryStr)
    .then((result) => result.rows);

  await Promise.all([topicsPromise, usersPromise]);

  const formattedArticleData = articleData.map(convertTimestampToDate);
  const insertArticlesQueryStr = format(
    'INSERT INTO articles (title, topic, author, body, created_at, votes) VALUES %L RETURNING *;',
    formattedArticleData.map(
      ({ title, topic, author, body, created_at, votes = 0 }) => [
        title,
        topic,
        author,
        body,
        created_at,
        votes,
      ]
    )
  );

  const articleRows = await db
    .query(insertArticlesQueryStr)
    .then((result) => result.rows);

  const articleIdLookup = createRef(articleRows, 'title', 'article_id');
  const formattedCommentData = formatComments(commentData, articleIdLookup);

  const insertCommentsQueryStr = format(
    'INSERT INTO comments (body, author, article_id, votes, created_at) VALUES %L RETURNING *;',
    formattedCommentData.map(
      ({ body, author, article_id, votes = 0, created_at }) => [
        body,
        author,
        article_id,
        votes,
        created_at,
      ]
    )
  );
  return db.query(insertCommentsQueryStr).then((result) => result.rows);
};

module.exports = seed;