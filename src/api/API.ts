import axios from "axios";

export class API {

    static get(url: string, onDone?: (e: any) => any): void {
        axios.get(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response)
            if (response.status != 200) {
                // handle generic errors
            }
            onDone?.(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    static post(url: string, body: any, onDone?: (e: any) => any, onError?: (e: any) => any): void {
        let token = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        axios.post(url, body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token
            }
        }).then((response) => {
            console.log(response)
            if (response.status != 200) {
                // handle generic errors
                onError?.(response);
            }
            onDone?.(response);
        }).catch(function (error) {
            console.log(error);
            onError?.(error);
        });
    }

    static put(url: string, body: any, onDone?: (e: any) => any): void {
        let token = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        axios.put(url, body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token
            }
        }).then((response) => {
            console.log(response)
            if (response.status != 200) {
                // handle generic errors
            }
            onDone?.(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

}