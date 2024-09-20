import { FC, ReactElement } from "react";

type Props = {
    children: ReactElement
}

const RootLayout: FC<Props> = ({ children }) => {

    return (
        <div>
            {children}
        </div>
    );
}

export default RootLayout;