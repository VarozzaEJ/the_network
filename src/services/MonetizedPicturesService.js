import { AppState } from "../AppState.js"
import { MonetizedPicture } from "../models/MonetizedPicture.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class MonetizedPicturesService {
    async getMonetizedPictures() {
        const response = await api.get('api/ads')
        logger.log(response.data)
        const monetizedPictures = response.data.map(adPOJO => new MonetizedPicture(adPOJO))
        AppState.monetizedPictures = monetizedPictures
    }
}

export const monetizedPicturesService = new MonetizedPicturesService()



// TODO make modal close on submit ✅
// TODO add search term to what you looked up somewhere on the page
// TODO only show bio if you have one ✅
// TODO add titles to clickable things. Notably the profile picture on each PostCard ✅ 
// TODO change some of the Pop errors to say what actually went wrong instead of just "error"
// TODO move discover buttons to be in line with each post card ✅
// TODO add margin to the start of the previous discover button as well as blur it out when the total pages = the current page ✅
// TODO actually show the total pages at the bottom of the screen ✅