// import axios from "axios";

// const userLogin = (form) => {
//     console.log(form, 'in actions');

//     axios.post("http://localhost:8989/login", form).then((res)=> {
//         if(res){
//             console.log(res, ' in axios actions');
//             return {
//                 type : "USER_LOGIN",
//                 payload : res.data
//             }
//         }
//     });
// }

// export default userLogin;

export const LoginInfo =(payload) =>{
    return {
        type:"LOGIN_INFO",
        payload:payload
    }}
