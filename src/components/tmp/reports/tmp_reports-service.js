import ApiService from '../../services/ApiService'

class reportsService {

    #access_token = null;


    get = () => {
        return ApiService.get(`/reports/get/`)
    }


}

export default new reportsService()