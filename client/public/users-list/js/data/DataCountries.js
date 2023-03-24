import RequestGet from '../../../../../javascript/requests/RequestGet.js';

class DataCountries {
    #data = []

    constructor() {}

    async fetchDataFromServer() {
        const response = await RequestGet.send('./php/file.php', {}, 'fetchCountries')

        // successful request
        if (response['dataFound']) {
            // store categories
            this.#data = response['data']
        }

        return response
    }

    /**
     * get data
     * @return {array}
     */
    dataGet() {
        return this.#data;
    }
}

export default new DataCountries()