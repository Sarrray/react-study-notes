import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { persistor, store } from "./store";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import RoomList from "./components/RoomList/RoomList";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import SignalRIndex from "./components/SignalR/SignalRIndex";
import ProgressbarIndex from "./components/Progress/ProgressbarIndex";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/chat" element={<RoomList />} />
              <Route path="/chat/:roomId" element={<ChatRoom />} />
              <Route path="/signalrindex" element={<SignalRIndex />} />
              <Route path="/progressbar" element={<ProgressbarIndex />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
