export const createNewArticle = `INSERT INTO articles (title, article,category_id, user_id, color_id)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`;

export const selectCategory = `SELECT * FROM categories WHERE category_id = $1`;

export const selectUserDetails = `SELECT * FROM users WHERE id = $1`;

export const selectArticle = `SELECT * FROM articles WHERE id = $1`;

export const flag = `UPDATE articles SET flagged = $1, flagged_at = $2 WHERE id = $3 RETURNING *`;

export const updateArticle = `UPDATE articles SET title = $1, article = $2, updated_at = $3, color_id = $4 WHERE id = $5 RETURNING *`;

export const getAllArticles = `SELECT articles.id, title, user_id, article, first_name as username, category_id, articles.created_at, articles.updated_at, flagged, flagged_at FROM articles INNER JOIN users ON articles.user_id = users.id ORDER BY updated_at DESC`;

export const getSingleArticle = `SELECT * FROM articles WHERE id = $1`;

export const deleteSingleArticle = `DELETE FROM articles WHERE id = $1`;

export const getArticleComment = `SELECT c.article_id as post_id, u.is_admin as isAdmin, c.comment, c.created_at as date, c.author_id as authorId, CONCAT(u.first_name, ' ', u.last_name) as post_author, u.profile_pix as comment_author_profile
FROM articles_comments c
LEFT JOIN users u ON u.id = c.author_id
WHERE article_id = $1 ORDER BY c.created_at ASC`;

export const createComment = `INSERT INTO articles_comments (comment, created_at, article_id, flagged, author_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

export const selectIfUserLike = `SELECT * FROM articleLikes WHERE article_id = $1 AND author_id = $2`;

export const createLike = `INSERT INTO articleLikes (article_id, author_id) VALUES ($1, $2) RETURNING *`;

// scoped to one article (was deleting ALL of a user's likes)
export const deleteLike = `DELETE FROM articleLikes WHERE author_id = $1 AND article_id = $2`;

export const getUpdatedArticle = `
   SELECT
        a.id as postid,
        a.title as title,
        a.article as post,
        a.created_at as post_date,
        col.color,
        u.is_admin as isAdmin,
        CONCAT(u.first_name, ' ', u.last_name) as post_author,
        u.id as user_id,
        u.profile_pix as profile,
        u.jobrole as jobrole,
        (SELECT COUNT(article_id) FROM articles_comments WHERE article_id = a.id) as number_of_comment,
        (SELECT COUNT(article_id) FROM articlelikes WHERE article_id = a.id) as number_of_likes,
        EXISTS(SELECT 1 FROM articlelikes l WHERE l.article_id = a.id AND l.author_id = $1) AS liked,
        (SELECT json_agg(c) FROM (
            SELECT
                ac.id,
                ac.comment,
                ac.created_at as comment_date,
                cu.is_admin as isAdmin,
                CONCAT(cu.first_name, ' ', cu.last_name) as comment_author,
                cu.profile_pix as comment_author_profile
            FROM
                articles_comments ac
                JOIN users cu ON cu.id = ac.author_id
            WHERE
                ac.article_id = a.id
            ORDER BY
                ac.created_at DESC
            LIMIT 3
        ) c) as comments
    FROM
         articles a
        LEFT JOIN users u ON u.id = a.user_id
        LEFT JOIN colors col ON col.id = a.color_id
    WHERE a.id = $2
`;
