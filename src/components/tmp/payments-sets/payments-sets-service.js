import ApiService from '../../services/ApiService'

class payments-setsService {

    #access_token = null;


    get = () => {
        return ApiService.get(`/payments-sets/get/`)
    }


}

export default new payments-setsService()