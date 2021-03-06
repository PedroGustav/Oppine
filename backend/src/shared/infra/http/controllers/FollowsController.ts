import FollowsRepository from "@modules/reactions/follow/infra/typeorm/repositories/FollowsRepository";
import CreateFollowService from "@modules/reactions/follow/services/CreateFollowService";
import DeleteFollowService from "@modules/reactions/follow/services/DeleteFollowService";
import ListUserFollowsService from "@modules/reactions/follow/services/ListUserFollowsService";
import { Request, Response } from "express";


declare global{

    namespace Express{

        export interface Request{

            user:{
                id: string;
            }
        }
    }
}


export default class FollowsController{

    public async create(request: Request, response: Response): Promise<Response>{

        const id_user_send = request.user.id;

        const { username } = request.body;

        const followsRepository = new FollowsRepository();
        const createFollow = new CreateFollowService(followsRepository);

        const follow = await createFollow.execute({
            id_user_send,
            username
        });

        return response.json({follow});

    }

    public async index(request:Request, response:Response): Promise<Response>{
        
        const id_user = request.user.id;

        const followsRepository = new FollowsRepository();
        const listUserFollows = new ListUserFollowsService(followsRepository);

        const follows = await listUserFollows.execute(id_user);

        return response.json(follows);
    }

    public async delete(request: Request, response: Response): Promise<Response>{

        const { id_user_delete } = request.body;

        const id_user = request.user.id;

        const followsRepository = new FollowsRepository();
        const deleteFollow = new DeleteFollowService(followsRepository);

        const result = await deleteFollow.execute({id_user, id_user_delete});

        return response.status(200).json(result);
    }
}