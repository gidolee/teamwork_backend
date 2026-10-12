export const createArticleNotification = `INSERT INTO article_notifications (
    article_id, created_at, post_author_id, author_id, notification_type, notification_message)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

export const createGifNotification = `INSERT INTO gif_notifications (
    gif_id, created_at, post_author_id, author_id, notification_type, notification_message)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

export const deleteArticleNotification = `DELETE FROM article_notifications WHERE article_id = $1 AND notification_type = 'like'`;

export const deleteGifNotification = `DELETE FROM gif_notifications WHERE gif_id = $1 AND notification_type = 'like'`;

export const getAllNotifications = `
SELECT
      n.id,
      n.created_at as date,
      a.article as post,
      a.id as postid,
      n.notification_message as message,
      notification_read,
      u2.profile_pix as author_pix,
      u2.is_admin as isAdmin,
      CONCAT(u2.first_name, ' ', u2.last_name) as notifications_author
        FROM article_notifications n
        LEFT JOIN articles a ON a.id = n.article_id
        LEFT JOIN users u2 ON u2.id = n.author_id
          WHERE n.post_author_id = $1

      UNION ALL

SELECT
      n.id,
      n.created_at as date,
      g.image_url as post,
      g.id as postid,
      n.notification_message as message,
      n.notification_read,
      u2.profile_pix as author_pix,
      u2.is_admin as isAdmin,
      CONCAT(u2.first_name, ' ', u2.last_name) as notifications_author
        FROM gif_notifications n
        LEFT JOIN gifs g ON g.id = n.gif_id
        LEFT JOIN users u2 ON u2.id = n.author_id
          WHERE n.post_author_id = $1
          ORDER BY date DESC`;

export const totalUnreadNotifications = `
SELECT
  (SELECT COUNT(*) FROM article_notifications WHERE post_author_id = $1 AND notification_read = false) +
  (SELECT COUNT(*) FROM gif_notifications WHERE post_author_id = $1 AND notification_read = false) as total_unread_notifications`;

export const totalNotifications = `
SELECT
  (SELECT COUNT(*) FROM article_notifications WHERE post_author_id = $1) +
  (SELECT COUNT(*) FROM gif_notifications WHERE post_author_id = $1) as total_notifications`;

export const readArticleNotification = `UPDATE article_notifications SET notification_read = $1 WHERE id = $2 RETURNING *`;

export const readGifNotification = `UPDATE gif_notifications SET notification_read = $1 WHERE id = $2 RETURNING *`;

export const selectArticle = `SELECT * FROM article_notifications WHERE id = $1`;

export const selectGif = `SELECT * FROM gif_notifications WHERE id = $1`;

export const getArticleNotification = `
SELECT
      n.id,
      n.created_at as date,
      a.article as post,
      a.id as postid,
      n.notification_message as message,
      notification_read,
      u2.profile_pix as author_pix,
      u2.is_admin as isAdmin,
      CONCAT(u2.first_name, ' ', u2.last_name) as notifications_author
        FROM article_notifications n
        LEFT JOIN articles a ON a.id = n.article_id
        LEFT JOIN users u2 ON u2.id = n.author_id
          WHERE n.post_author_id = $1 AND n.id = $2`;

export const getGifNotification = `
SELECT
      n.id,
      n.created_at as date,
      g.image_url as post,
      g.id as postid,
      n.notification_message as message,
      n.notification_read,
      u2.profile_pix as author_pix,
      u2.is_admin as isAdmin,
      CONCAT(u2.first_name, ' ', u2.last_name) as notifications_author
        FROM gif_notifications n
        LEFT JOIN gifs g ON g.id = n.gif_id
        LEFT JOIN users u2 ON u2.id = n.author_id
          WHERE n.post_author_id = $1 AND n.id = $2`;
