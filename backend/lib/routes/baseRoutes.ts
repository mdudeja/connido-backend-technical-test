import { Request, Response } from "express";

export class Routes {
    public routes(app): void {
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successful'
            });
        });

        //Articles

        app.route('/article')
        //GET Endpoint
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successful'
            });
        })

        //POST Endpoint
        .post((req: Request, res: Response) => {
            res.status(200).send({
                message: 'POST request successful'
            });
        });

        //Specific Article

        app.route('/article/:articleId')
        //GET Endpoint
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successful'
            });
        })

        //Update Endpoint
        .put((req: Request, res: Response) => {
            res.status(200).send({
                message: 'PUT request successful'
            });
        })

        //Delete Endpoint
        .delete((req: Request, res: Response) => {
            res.status(200).send({
                message: 'DELETE request successul'
            });
        });

    }
}