import * as signalR from "@microsoft/signalr";
//import * as signalRMessagePack from "@microsoft/signalr-protocol-msgpack";
import { createContext, useContext, useEffect, ReactNode, FC } from "react";
import { join_room} from "../events/SocketEvent";

interface ISignalRContext {
    connection?: signalR.HubConnection
}

const SignalRContext = createContext<ISignalRContext>({});

const SignalRProvider: FC<{ children: ReactNode }> = ({children}) => {

    const startConnection = async () => {
        if (connection.state === signalR.HubConnectionState.Disconnected) {
          await connection.start().catch((err) => console.error('Error connecting to signalR:', err));
        }
    }

    const connection = new signalR.HubConnectionBuilder().withUrl("https://ws.apimb66.com/livestreams", {
        // skipNegotiation: true,
        // transport: signalR.HttpTransportType.WebSockets,
        // accessTokenFactory: () => localStorage.getItem("token") ?? ""
    })
    .configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect()
    //.withHubProtocol(new signalRMessagePack.MessagePackHubProtocol())
    .build();

    useEffect(() => {
        startConnection().then(() => {
            connection.invoke(join_room, "963aa9ea-ccec-4456-b74d-34efc4917308", localStorage.getItem("token"))
        }).catch((err) => console.log(err));
    }, []);

    return (
        <SignalRContext.Provider value = {{connection}}>
            {children}
        </SignalRContext.Provider>
    );
}

export default SignalRProvider;

export const useSignalR = () => useContext(SignalRContext);