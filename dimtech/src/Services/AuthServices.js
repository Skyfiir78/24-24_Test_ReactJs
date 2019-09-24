import Axios from 'axios';

export default class AuthServices {
    static async login(data){
        data = await JSON.stringify(data);
        console.log(data);
        return Axios.post(`https://reqres.in/api/login`, data, {
            headers: {
              "Content-Type": "application/json",
            }
        }).then(res => {
            return (res.data)
        }).catch(err => {
            return (err)
        })
    }
    static async logout(){

    }
}
