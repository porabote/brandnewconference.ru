import ApiService from '../../services/ApiService'

class business-eventsService {

    #access_token = null;


    get = () => {
        return ApiService.get(`/business-events/get/`)
    }


}

export default new business-eventsService()