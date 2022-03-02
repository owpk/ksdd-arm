import axios, {AxiosResponse} from "axios";

class RestClient {

    async get<T>(url: string): Promise<AxiosResponse<T>> {
        return await axios.get<T>(url)
    }

    async post<T, X>(url: string, body: X): Promise<AxiosResponse<T>> {
        return await axios.post(url, body)
    }

}

export const restClient = new RestClient();
