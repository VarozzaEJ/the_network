

export class Post {
    constructor(data) {
        this.id = data.id
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.likeIds = data.likeIds
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
    }
}

// body: String, required
// imgUrl: String,
//     creatorId: SchemaObjectId, required
//         * creator: Object(Virtual Added by Database)
// likeIds: undefined, 
// * createdAt: ISO Timestamp(Virtual Added by Database)
//     * updatedAt: ISO Timestamp(Virtual Added by Database)