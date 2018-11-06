import { Request, Response } from "express";
import { ArticleController } from "../controllers/articleController";

export class Routes {
    public articleController: ArticleController = new ArticleController();

    public routes(app): void {
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successful'
            });
        });

        //Articles

        app.route("/article")
        //GET Endpoint
        .get(this.articleController.getAllArticles)
        
        //POST Endpoint
        .post(this.articleController.addNewArticle);

        //Specific Article

        app.route('/article/:articleId')
        //GET Endpoint
        .get(this.articleController.getArticleById)

        //Update Endpoint
        .put(this.articleController.updateArticleById)

        //Delete Endpoint
        .delete(this.articleController.deleteArticleById);

        app.route("/search")
        //GET Endpoing
        .get(this.articleController.searchArticlesByTitleOrAuthor);

    }
}