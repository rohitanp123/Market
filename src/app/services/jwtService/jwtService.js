import axios from 'axios';
import jwtDecode from 'jwt-decode';
import FuseUtils from '@fuse/FuseUtils';
import Cookies from 'js-cookie';
import { serviceApiUrl } from 'app/config';


class jwtService extends FuseUtils.EventEmitter {

    init()
    {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(response => {
            // const token = this.getAccessToken();
            // response.headers['Authorization'] =  response.data.access_token;
            // console.log("response", response);
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
                if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
                {
                    // if you ever get an unauthorized response, logout the user
                    this.emit('onAutoLogout', 'Invalid access_token');
                    this.setSession(null);
                }
                throw err;
            });
        });
    };

    handleAuthentication = () => {

        let access_token = this.getAccessToken();

        if ( !access_token )
        {
            return;
        }

        if ( this.isAuthTokenValid(access_token) )
        {
            this.setSession(access_token);
            this.emit('onAutoLogin', true);
        }
        else
        {
            this.setSession(null);
            this.emit('onAutoLogout', 'access_token expired');
        }
    };

    createUser = (data) => {
        console.log("user--",data);
        return new Promise((resolve, reject) => {
            axios.post(serviceApiUrl + '/sme/register', data)
                .then(response => {
                    console.log("userres--", response);
                    if ( response.data._id )
                    {
                       // this.setSession(response.data.access_token);
                        resolve(response.data);
                    }
                    else
                    {
                        reject(response.data);
                    }
                }).catch( (err) =>{ 
                    console.log("error...",err);
                });
        });
    };

    createUserSme = (data) => {
        console.log("user--",data);
        return new Promise((resolve, reject) => {
            axios.post( serviceApiUrl + '/sme/register', data)
                .then(response => {
                    console.log("userres--", response);
                    if ( response.data._id )
                    {
                        
                        resolve(response.data);
                    }
                    else
                    {
                        reject(response.data);
                    }
                }).catch( (err) =>{ 
                    console.log("error...",err);
                });
        });
    };

    signInWithEmailAndPassword = (data) => {
        console.log("test yes", data);
        return new Promise((resolve, reject) => {
            axios.post(serviceApiUrl + '/sme/authenticate', {
                data: {
                    userName:data.userName,
                    password:data.password
                }
            }).then(response => {
                console.log(response);
                if ( response.data.user )
                {
                    this.setSession(response.data.access_token);
                    Cookies.set("userId", response.data.user._id);
                    console.log("cckie id",Cookies.get('userId'));
                    //this.setSession(response.data.user);
                    //this.setSession(response.data.user.data);
                    resolve(response.data.user);
                }
                else
                {
                    reject(response.data.error);
                }
            });
        });
    };

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            axios.post( serviceApiUrl + '/sme/token', {
                data: {
                    access_token: this.getAccessToken()
                }
            })
                .then(response => {
                    if ( response.data.user )
                    {
                        this.setSession(response.data.access_token);
                        console.log("cckie id",Cookies.get('userId'));
                        Cookies.set("userId", response.data.user._id);
                        //this.setSession(response.data.user;
                        resolve(response.data.user);
                    }
                    else
                    {
                        reject(response.data.error);
                    }
                });
        });
    };

    updateUserData = (user) => {
        return axios.post( serviceApiUrl + '/api/auth/user/update', {
            user: user
        });
    };

    setSession = access_token => {
        if ( access_token )
        {
            localStorage.setItem('jwt_access_token', access_token);
            Cookies.set("jwt_token", access_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        }
        else
        {
            localStorage.removeItem('jwt_access_token');
            Cookies.remove('jwt_token')
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    logout = () => {
       // delete_cookie('userId');
        //document.cookie = 'userId' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        //Cookies.remove('userId');
        this.setSession(null);
    };

    isAuthTokenValid = access_token => {
        if ( !access_token )
        {
            return false;
        }
        const decoded = jwtDecode(access_token);
        const currentTime = Date.now() / 1000;
        if ( decoded.exp < currentTime )
        {
            console.warn('access token expired');
            return false;
        }
        else
        {
            return true;
        }
    };

    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };
    getAccessUser = () => {
        return window.localStorage.getItem('user');
    };
}

const instance = new jwtService();

export default instance;
