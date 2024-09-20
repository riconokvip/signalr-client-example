import { FC, useState } from "react";
import Guardian from "../../services/Guardian";
import CoreService from "../../services/AxiosCLient";

type Props = {

}

interface InsertMessage {
    livestreamId: string
    message: string
}

const TextInput: FC<Props> = () => {
    const [message, setMessage] = useState("");

    const createMsg = async (body: InsertMessage) => {
        const response = await CoreService.post(`https://client.apimb66.com/api/stream-actions/messages`, body);
        return response;
    }

    const handleSendMessage = async () => {
        await createMsg({livestreamId: "963aa9ea-ccec-4456-b74d-34efc4917308", message: message});
    }

    return (
        <div>
            <input 
                style={{
                    width: 600,
                    height: 50,
                    marginTop: 40,
                    marginLeft: 40,
                    padding: 5,
                    boxSizing: "border-box"
                }} 
                type="text" 
                placeholder="Nhập tin nhắn" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSendMessage();
                        setMessage("")
                    }
                }}
            />
        </div>
    );
}

export default Guardian(TextInput);