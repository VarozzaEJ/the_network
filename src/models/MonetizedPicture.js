

export class MonetizedPicture {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.linkUrl = data.linkURL //NOTE this might be the wrong name if you can't pull data from get
        this.tall = data.tall
        this.square = data.square
        this.banner = data.banner
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt

    }
}

// title: String,
//     linkURL: String,
//         tall: String,
//             square: String,
//                 banner: String, 
// * createdAt: ISO Timestamp(Virtual Added by Database)
//     * updatedAt: ISO Timestamp(Virtual Added by Database)