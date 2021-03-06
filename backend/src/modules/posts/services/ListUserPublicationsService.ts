import IPostsRepository from "../repositories/IPostsRepository";

export default class ListUserPublicationsService{
    constructor(private postService: IPostsRepository){}

    async execute(id_user: string){

        const myPosts = await this.postService.listByUserId(id_user);

        return myPosts;
    }
}