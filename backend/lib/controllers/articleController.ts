import * as mongoose from "mongoose";
import { ArticleSchema } from "../models/articleModel";
import { Request, Response } from "express";

const Article = mongoose.model('Article', ArticleSchema);

export class ArticleController {

    public addNewArticle(req: Request, res: Response): void {
        let newArticle = new Article(req.body);

        newArticle.save((err, article) => {
            if(err){
                res.send(err);
            }

            res.json(article);
        });
    }

    public getAllArticles(req: Request, res: Response): void {
        Article.find({}, (err, articles) => {
            if(err){
                res.send(err);
            }

            res.json(articles);
        });
    }

    public getArticleById(req: Request, res: Response): void {
        Article.findById(req.params.articleId, (err, article) => {
            if(err){
                res.send(err);
            }

            res.json(article);
        });
    }

    public updateArticleById(req: Request, res: Response): void {
        Article.findOneAndUpdate({_id: req.params.articleId}, req.body, {new: true}, (err, article) => {
            if(err){
                res.send(err);
            }
            
            res.json(article);
        });    
    }

    public deleteArticleById(req: Request, res: Response): void {
        Article.remove({_id: req.params.articleId}, (err, article) => {
            if(err){
                res.send(err);
            }

            res.json({message: "Article deleted successfully"});
        });
    }
}