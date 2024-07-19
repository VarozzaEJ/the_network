
export class Profile {
    constructor(data) {
        this.id = data.id || data._id
        this.name = data.name
        this.picture = data.picture
        this.bio = data.bio
        this.coverImg = data.coverImg
        this.linkedin = data.linkedin
        this.resume = data.resume
        this.graduated = data.graduated || false
        this.class = data.class
    }
}