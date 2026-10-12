import { Request, Response, NextFunction } from 'express';
import pool from '../config/db';
import {
    createNewArticle,
    getAllArticles as getAllArticlesQuery,
    updateArticle as updateArticleQuery,
    deleteSingleArticle as deleteSingleArticleQuery,
    selectArticle,
    getUpdatedArticle,
} from '../queries/articleQueries';

const DEFAULT_CATEGORY_ID = 1;
const DEFAULT_COLOR_ID = 1;

const getUserId = (req: Request): number => {
    const user = (req as any).user || {};
    return user.id ?? user.Id;
};

const getArticleId = (req: Request): string => {
    const articleId = req.params.articleId;
    return Array.isArray(articleId) ? articleId[0].trim() : articleId.trim();
};

class ArticleController {
    static async createArticle(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const {
                title,
                article,
                category_id = DEFAULT_CATEGORY_ID,
                color_id = DEFAULT_COLOR_ID,
            } = req.body;
            const userId = getUserId(req);
            const ts = new Date();

            const result = await pool.query(createNewArticle, [
                title,
                article,
                category_id,
                userId,
                color_id,
            ]);

            return res.status(201).json({
                status: 'success',
                message: 'Article successfully created',
                data: result.rows[0],
            });
        } catch (err) {
            next(err);
        }
    }

    static async getAllArticles(
        _req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result = await pool.query(getAllArticlesQuery);
            return res
                .status(200)
                .json({ status: 'success', data: result.rows });
        } catch (err) {
            next(err);
        }
    }

    static async getSingleArticle(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const articleId = getArticleId(req);
            const userId = getUserId(req);

            // getUpdatedArticle: $1 = userId (for "liked"), $2 = articleId
            const result = await pool.query(getUpdatedArticle, [
                userId,
                articleId,
            ]);
            if (result.rows.length === 0) {
                return res
                    .status(404)
                    .json({ status: 'error', error: 'Article not found' });
            }

            return res
                .status(200)
                .json({ status: 'success', data: result.rows[0] });
        } catch (err) {
            next(err);
        }
    }

    static async updateArticle(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const articleId = getArticleId(req);
            const userId = getUserId(req);
            const { title, article, color_id = DEFAULT_COLOR_ID } = req.body;

            const found = await pool.query(selectArticle, [articleId]);
            if (found.rows.length === 0) {
                return res
                    .status(404)
                    .json({ status: 'error', error: 'Article not found' });
            }
            if (found.rows[0].user_id !== userId) {
                return res.status(401).json({
                    status: 'error',
                    error: 'You are not authorised on this article',
                });
            }

            const result = await pool.query(updateArticleQuery, [
                title,
                article,
                new Date(),
                color_id,
                articleId,
            ]);

            return res.status(200).json({
                status: 'success',
                message: 'Article successfully modified',
                data: result.rows[0],
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteSingleArticle(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const articleId = getArticleId(req);
            const userId = getUserId(req);

            const found = await pool.query(selectArticle, [articleId]);
            if (found.rows.length === 0) {
                return res
                    .status(404)
                    .json({ status: 'error', error: 'Article not found' });
            }
            if (found.rows[0].user_id !== userId) {
                return res.status(401).json({
                    status: 'error',
                    error: 'You are not authorised on this article',
                });
            }

            await pool.query(deleteSingleArticleQuery, [articleId]);

            return res.status(200).json({
                status: 'success',
                message: 'Article deleted successfully',
            });
        } catch (err) {
            next(err);
        }
    }
}

export default ArticleController;
