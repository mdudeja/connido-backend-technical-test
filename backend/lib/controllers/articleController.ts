import * as mongoose from "mongoose";
import { ArticleSchema } from "../models/articleModel";
import { Request, Response } from "express";
import * as debug from "debug";
import * as config from "config";

const Article = mongoose.model('Article', ArticleSchema);
const debugLog = debug('backend:controller');

export class ArticleController {

    public addNewArticle(req: Request, res: Response): void {
        let newArticle = new Article(req.body);
        
        newArticle.save((err, article) => {
            if(err){
                debugLog("An error occured in addNewArticle()");
                res.json({failed: true, error: err});
            }else{
                debugLog("Save successful");
                res.json(article);
            }
        });
    }

    public getAllArticles(req: Request, res: Response): void {
        let perPage: number = config.get("countPerPage");
        let page: number = req.query.page || 1;
        Article
            .find({})
            .skip(perPage * (page - 1))
            .limit(perPage)
            .exec((err, articles) => {
                if(err){
                    debugLog("An error occured in getAllArticles()");
                    res.json({failed: true, error: err});
                }else{
                    debugLog("Total Articles Returned: " +articles.length);
                    res.json({
                        articles: articles,
                        current: page,
                        pages: (Math.ceil(articles.length / perPage)) || 1
                    });
                }
            });
    }

    public getArticleById(req: Request, res: Response): void {
        Article.findById(req.params.articleId, (err, article) => {
            if(err){
                debugLog("An error occured in getArticleById()");
                res.json({failed: true, error: err});
            }else{
                debugLog("Article found with id: " +req.params.articleId);
                res.json(article);
            }
        });
    }

    public updateArticleById(req: Request, res: Response): void {
        Article.findOneAndUpdate({_id: req.params.articleId}, req.body, {new: true}, (err, article) => {
            if(err){
                debugLog("An error occured in updateArticleById()");
                res.json({failed: true, error: err});
            }else{
                debugLog("Updated article with id: " +req.params.articleId);
                res.json(article);
            }
        });    
    }

    public deleteArticleById(req: Request, res: Response): void {
        Article.remove({_id: req.params.articleId}, (err) => {
            if(err){
                debugLog("An error occured in deleteArticleById()");
                res.json({failed: true, error: err});
            }else{
                debugLog("deleted article with id: " +req.params.articleId);
                res.json({message: "Article deleted successfully"});   
            }
        });
    }

    public removeAll(): void {
        Article.remove({}, (err) => {
            if(err){
                debugLog("An error occured in removeAll()");
            }else{
                debugLog("Collection clear successfully");   
            }
        });
    }
}