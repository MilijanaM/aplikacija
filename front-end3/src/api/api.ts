import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ApiConfig } from '../config/api.config';

export default function api(
    path: string, 
    method: 'get'| 'post'| 'patch'| 'delete',
    body: any | undefined,
    ){

        return new Promise<apiResponse>((resolve)=> {

            const requestData=
                {
                    method: method,
                    url: path,
                    baseURL: ApiConfig.API_URL,
                    data: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'applucation.json',
                        'Authorization': getToken(),
                    },
                 };
            
            axios(requestData)
            .then(res => responseHandler(res, resolve))
               .catch(async err=>{ 
                if(err.response.status=== 401){
                    const newToken = await refreshToken(

                    );
    
                    if(!newToken){
                        const response: apiResponse= {
                            status: 'login',
                            data: null,
         
                        };
         
                        return resolve(response);
                     }
    
                     saveToken(newToken);
    
                    }
                    requestData.headers['Authorization']= getToken();
    
                    return await repeatRequest(requestData, resolve);
    
                   }
                   
                const response: apiResponse={

                    status: 'error',
                    data: err
                    
                }; 
                resolve(response)

               });
        });
        
    }

    export interface apiResponse{
        status: 'ok'| 'error'|'login';
        data: any;
    }

    async function responseHandler(
        res: AxiosResponse<any>,
        resolve: (value?: apiResponse) => void,
 
        ){

            if(res.status <200 || res.status>=300){
            
              
        
               const response: apiResponse= {
                   status: 'error',
                   data: res.data,

               };

               return resolve(response);
            }

            let response: apiResponse;
            if(res.data.statusCode <0){

              response= {
                    status: 'login',
                    data: null,
                };
            }else {
                response ={
                    status: 'ok',
                    data: response.data,
                };
            }
                resolve(response);
            }
            resolve(res.data);


    }

    function getToken(): string{

        const token= localStorage.getItem('api_token');
        return 'Berer'+ token;
    }

    function saveToken(token: string){
        localStorage.setItem('api_token', token);
    }

    function getRefreshToken(): string {
        const token= localStorage.getItem('api_refresh_token');
        return token + '';

    }

    function saveRefreshToken(token: string){
        localStorage.setItem('api_refresh_token', token);
    }

    async function refreshToken(

        ): Promise <string| null>{
            const path='auth/admin/refresh';
            const data={
                token:getRefreshToken(),
            }

            
            const refreshTokenRequestData: AxiosRequestConfig=
                {
                    method: 'post',
                    url: path,
                    baseURL: ApiConfig.API_URL,
                    data: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'applucation.json',
                    },
                 };
            
            const refreshTokenResponse: any {data: {token: string| undefined}}= await axios(refreshTokenRequestData);
            if(!refreshTokenResponse.data.token){
                return null;
            }
            return refreshTokenResponse.data.token;

    }

    async function repeatRequest(requestData: AxiosRequestConfig, resolve: (value?: apiResponse) => void){

        axios(requestData)
            .then (res =>{
                let response: apiResponse;
                if (res.status===401){
                     response= {
                        status: 'login',
                        data: null,
     
                    };
                }else{response= {
                    status: 'ok',
                    data: res,
 
                };
            
            }
                return resolve(response);

            })
            .catch(err =>{
                const response: apiResponse= {
                    status: 'error',
                    data: err,
 
                };
                return resolve(response);

            });
    }