import { FC, useEffect } from "react";
import { useSignalR } from "./SignalRClient.Context";

const Guardian: CallableFunction = (AuthComponent: FC) => {

    const Component = () => {
        const { connection } = useSignalR();

        useEffect(() => {
            
        }, [connection]);

        return <AuthComponent />
    }

    return Component;

}

export default Guardian;