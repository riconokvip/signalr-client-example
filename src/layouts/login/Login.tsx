import { FC, useState } from "react";
import CoreService from "../../services/AxiosCLient";
import { useNavigate } from "react-router-dom";

type Props = {}

interface InfoLogin {
    loginName: string
    password: string
}

const Login: FC<Props> = () => {

    const [loginInfo, setLoginInfo] = useState<InfoLogin>({loginName: "", password: ""});

    const nav = useNavigate();

    const login = async (body: InfoLogin) => {
        const response = await CoreService.post(`https://client.apimb66.com/api/auth/login`, body);
        return response;
    }

    const handleLogin = async () => {
        if (loginInfo.loginName !== "" && loginInfo.password !== "") {
            const response = await login(loginInfo);
            if (response.data.code === 200) {
                localStorage.setItem("token", response.data.data.token);
                nav("/home");
            }
        }
    }

    return (
        <div style={{
            paddingTop: 100,
            paddingLeft: 300
        }}>
            <h3>Đăng Nhập</h3>
            <input 
                style={{
                    width: 500,
                    height: 50,
                    marginTop: 40,
                    paddingLeft: 20
                }} 
                type="text" 
                placeholder="Số điện thoại" 
                onChange={(e) => setLoginInfo(prev => ({loginName: e.target.value, password: prev.password}))}
            />
            <br />
            <input 
                style={{
                    width: 500,
                    height: 50,
                    marginTop: 40,
                    paddingLeft: 20
                }} 
                type="text" 
                placeholder="Mật khẩu" 
                onChange={(e) => setLoginInfo(prev => ({loginName: prev.loginName, password: e.target.value}))}
            />
            <br />
            <button 
                style={{
                    marginTop: 30,
                    width: 300,
                    height: 50
                }}
                onClick={handleLogin}
            >Đăng nhập</button>
        </div>
    )
}

export default Login;