import { FC, useEffect, useRef, useState } from "react";
import Guardian from "../../services/Guardian";
import { useSignalR } from "../../services/SignalRClient.Context";
import { on_receive_object } from "../../events/SocketEvent";

type Props = {
    
}

interface ChatMsg {
    message: string
    user: {
        avatar: string
        diamond: number
        follower: number
        id: string
        userName: string
    }
}

const Container: FC<Props> = () => {
    const [data, setData] = useState<ChatMsg[]>([]);
    const { connection } = useSignalR();
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        connection?.on(on_receive_object, async (msg: ChatMsg) => {
            setData(data => [...data, msg]);
        });
    }, [connection]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [data]);

    return (
        <div style={{
            paddingTop: 30
        }}>
            <div 
                ref={chatContainerRef} 
                style={{
                    width: 600,
                    height: 780,
                    marginLeft: 40,
                    border: "1px solid black",
                    borderRadius: 5,
                    overflow: "auto"
                }}
            >
                <div>
                    {
                        data.length > 0 ?
                            data.map((el, key) => 
                                <div key={key}>{el.user.userName}:{el.message}</div>
                            ) : null
                    }
                </div>
            </div>
        </div>
    );
}

export default Guardian(Container);