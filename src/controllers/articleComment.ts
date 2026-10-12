import { Request, Response } from 'express';
import pool from '../config/db';
import * as queries from '../queries/articleQueries';
import * as notificationQuery from '../queries/notificationQuery';

const getUserId = (req: Request): number => {
    const user = (req as any).user || {};
    return user.id ?? user.userId ?? user.Id;
};

class ArticleCommentController {
    static async createComment(req: Request, res: Response) {
        const { comment, flagged = false, notificationMessage } = req.body;
        const { articleId } = req.params;
        const createdAt = new Date();
        const userId = getUserId(req);

        const article = await pool.query(queries.selectArticle, [articleId]);
        if (article.rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                error: 'Article with the specified ID not found',
            });
        }

        const postAuthor = article.rows[0].user_id;

        await pool.query(queries.createComment, [
            comment,
            createdAt,
            articleId,
            flagged,
            userId,
        ]);

        // notify the author, but not when they comment on their own post
        if (userId !== postAuthor) {
            await pool.query(notificationQuery.createArticleNotification, [
                articleId,
                createdAt,
                postAuthor,
                userId,
                'comment',
                notificationMessage || 'commented on your post',
            ]);
        }

        const updatedArticle = await pool.query(queries.getUpdatedArticle, [
            userId,
            articleId,
        ]);
        const allComments = await pool.query(queries.getArticleComment, [
            articleId,
        ]);
        const newComment = allComments.rows[allComments.rows.length - 1];

        return res.status(201).json({
            status: 'success',
            data: {
                message: 'Comment successfully created',
                data: updatedArticle.rows[0],
                comment: newComment,
            },
        });
    }

    static async getArticleComment(req: Request, res: Response) {
        const { articleId } = req.params;
        const result = await pool.query(queries.getArticleComment, [articleId]);
        return res.status(200).json({ status: 'success', data: result.rows });
    }
}

export default ArticleCommentController;
