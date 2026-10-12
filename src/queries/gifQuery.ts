export const createNewGif = `INSERT INTO gifs (title, image_url, public_id, created_at, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

export const selectGif = `SELECT * FROM gifs WHERE id = $1`;

export const deleteGif = `DELETE FROM gifs WHERE id = $1`;

export const selectAllGifs = `SELECT * FROM gifs ORDER BY created_at DESC`;

export const selectUser = `SELECT * FROM users WHERE id = $1`;

export const selectUserDetails = `SELECT * FROM users WHERE id = $1`;

// GIF COMMENT
export const createGifComment = `INSERT INTO gif_comment (gif_id, comment, author_id, created_at, user_name) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

export const getGifComments = `SELECT c.gif_id as post_id, u.is_admin as isAdmin, c.comment, c.created_at as date, c.author_id as authorId, CONCAT(u.first_name, ' ', u.last_name) as post_author, u.profile_pix as comment_author_profile
FROM gif_comment c
LEFT JOIN users u ON u.id = c.author_id
WHERE gif_id = $1 ORDER BY c.created_at ASC`;

// GIF LIKES
export const selectIfUserLike = `SELECT * FROM gif_likes WHERE gif_id = $1 AND author_id = $2`;

export const createLike = `INSERT INTO gif_likes (gif_id, author_id) VALUES ($1, $2) RETURNING *`;

// fixed: scoped to one gif (was deleting ALL of a user's gif likes)
export const deleteLike = `DELETE FROM gif_likes WHERE author_id = $1 AND gif_id = $2`;

export const getUpdatedGif = `
   SELECT
        g.id as postid,
        g.title as title,
        g.image_url as post,
        g.created_at as post_date,
        u.is_admin as isAdmin,
        CONCAT(u.first_name, ' ', u.last_name) as post_author,
        u.id as user_id,
        u.profile_pix as profile,
        u.jobrole as jobrole,
        (SELECT COUNT(gif_id) FROM gif_comment WHERE gif_id = g.id) as number_of_comment,
        (SELECT COUNT(gif_id) FROM gif_likes WHERE gif_id = g.id) as number_of_likes,
        EXISTS(SELECT 1 FROM gif_likes l WHERE l.gif_id = g.id AND l.author_id = $1) AS liked,
        (SELECT json_agg(c) FROM (
            SELECT
                gc.id,
                gc.comment,
                gc.created_at as comment_date,
                cu.is_admin as isAdmin,
                CONCAT(cu.first_name, ' ', cu.last_name) as comment_author,
                cu.profile_pix as comment_author_profile
            FROM
                gif_comment gc
                JOIN users cu ON cu.id = gc.author_id
            WHERE
                gc.gif_id = g.id
            ORDER BY
                gc.created_at DESC
            LIMIT 3
        ) c) as comments
    FROM
        gifs g
        LEFT JOIN users u ON u.id = g.user_id
    WHERE g.id = $2`;
