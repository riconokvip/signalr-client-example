import Container from '../layouts/container/Container';
import TextInput from '../layouts/text/TextInput';
import SignalRProvider from '../services/SignalRClient.Context';

function Main() {
  return (
    <SignalRProvider>
      <TextInput />
      <Container />
    </SignalRProvider>
  );
}

export default Main;