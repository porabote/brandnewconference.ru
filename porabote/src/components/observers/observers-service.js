import ApiService from '../../services/ApiService'

class observersService {

    #access_token = null;


    get = () => {
        return ApiService.get(`/observers/get/`)
    }


}

export default new observersService()