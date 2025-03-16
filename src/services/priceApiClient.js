import axios from "axios";

export class PriceApiClient {
    constructor() {
        this.baseUrl ="http://127.0.0.1:8000"
    }

    GetTickers = async () => {
        let path = `/tickers/`
        // return await fetch(this.baseUrl + uri)
        return await axios(
                {
                    method: "get",
                    headers: { "Content-Type": "application/json" },
                    url: this.baseUrl + path
                }
            )
            .then(res => res.data)
    }

    GetPrices = (tickers, startDate = null, endDate = null, order = null) => {
        let path = `/prices?tickers=${tickers.join(",")}`
        if (startDate !== null)
            path += `&startDate=${startDate}`

        if (endDate !== null)
            path += `&endDate=${endDate}`

        if (order !== null)
            path += `&order=${order}`
        
        
        return axios.get(this.baseUrl + path)
            .then(res => res.data)
    }
}