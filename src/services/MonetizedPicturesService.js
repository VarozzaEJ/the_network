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