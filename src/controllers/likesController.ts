import { Request, Response } from 'express';
import pool from '../config/db';
import * as queries from '../queries/articleQueries';
import * as gifQuery from '../queries/gifQuery';
import * as notificationQuery from '../queries/notificationQuery';

const getUserId = (req: Request): number => {
    const user = (req as any).user || {};
    return user.id ?? user.userId ?? user.Id;
};

class LikesController {
    static async articleLikes(req: Request, res: Response) {
        const { articleId } = req.params;
        const { notificationMessage } = req.body;
        const userId = getUserId(req);

        const article = await pool.query(queries.selectArticle, [articleId]);
        if (article.rowCount === 0) {
            return res.status(404).json({
                status: 'error',
                error: 'Post cannot be found or has been removed',
            });
        }

        const postAuthor = article.rows[0].user_id;
        const createdAt = new Date();
        const existingLike = await pool.query(queries.selectIfUserLike, [
            articleId,
            userId,
        ]);

        // not yet liked -> create like (+ notify author)
        if (existingLike.rowCount === 0) {
            const newLike = await pool.query(queries.createLike, [
                articleId,
                userId,
            ]);

            if (userId !== postAuthor) {
                await pool.query(notificationQuery.createArticleNotification, [
                    articleId,
                    createdAt,
                    postAuthor,
                    userId,
                    'like',
                    notificationMessage || 'Liked your post',
                ]);
            }

            const updated = await pool.query(queries.getUpdatedArticle, [
                userId,
                articleId,
            ]);

            return res.status(201).json({
                status: 'success',
                data: { newLike: newLike.rows, article: updated.rows[0] },
            });
        }

        // already liked -> remove like (+ remove notification)
        await pool.query(notificationQuery.deleteArticleNotification, [
            articleId,
        ]);
        await pool.query(queries.deleteLike, [userId, articleId]); // fixed: scoped to article

        const updated = await pool.query(queries.getUpdatedArticle, [
            userId,
            articleId,
        ]);

        return res.status(200).json({
            status: 'success',
            data: {
                message: 'Like has been deleted',
                article: updated.rows[0],
            },
        });
    }

    static async gifLike(req: Request, res: Response) {
        const { gifId } = req.params;
        const { notificationMessage } = req.body;
        const userId = getUserId(req);

        const gif = await pool.query(gifQuery.selectGif, [gifId]);
        if (gif.rowCount === 0) {
            return res.status(404).json({
                status: 'error',
                error: 'Gif cannot be found or has been removed',
            });
        }

        const postAuthor = gif.rows[0].user_id;
        const createdAt = new Date();
        const existingLike = await pool.query(gifQuery.selectIfUserLike, [
            gifId,
            userId,
        ]);

        if (existingLike.rowCount === 0) {
            const newLike = await pool.query(gifQuery.createLike, [
                gifId,
                userId,
            ]);

            if (userId !== postAuthor) {
                await pool.query(notificationQuery.createGifNotification, [
                    gifId,
                    createdAt,
                    postAuthor,
                    userId,
                    'like',
                    notificationMessage || 'Liked your photo',
                ]);
            }

            const updated = await pool.query(gifQuery.getUpdatedGif, [
                userId,
                gifId,
            ]);

            return res.status(201).json({
                status: 'success',
                data: { newLike: newLike.rows, gif: updated.rows[0] },
            });
        }

        await pool.query(gifQuery.deleteLike, [userId, gifId]); // fixed: scoped to gif
        await pool.query(notificationQuery.deleteGifNotification, [gifId]);

        const updated = await pool.query(gifQuery.getUpdatedGif, [
            userId,
            gifId,
        ]);

        return res.status(200).json({
            status: 'success',
            data: { message: 'Like has been deleted', gif: updated.rows[0] },
        });
    }
}

export default LikesController;
