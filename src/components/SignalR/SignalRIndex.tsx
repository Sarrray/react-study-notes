import styled from "styled-components";
import { useSignalR } from "../../hooks/useSignalR";

const SignalRIndex = () => {
  const { connectionState, receiveContent, currentMsg } = useSignalR();

  return (
    <>
      <UlDescription>
        <li>
          SignalRを利用してクライアントとサーバーの間でリアルタイム通信を行う
        </li>
        <li>SignalRサーバーは別に作成</li>
        <li>
          サーバーは
          <AKochira
            target="_blank"
            href={`${import.meta.env.VITE_SIGNALR_SERVER_URL}`}
          >
            こちら
          </AKochira>
          <br />
          ⇒遷移先の画面でテキストボックスに数字を入力し、「送信」ボタンを押下するとこちらの画面に反映される
          <br />
          ⇒データベースやメモリに保存されるわけではなく、画面上の値が更新されるのみなので自由にボタンを押下可
        </li>
        <li style={{ marginTop: 20 }}>
          <H3>サーバーの接続状況：{connectionState}</H3>
        </li>
        <li>
          <H3>サーバーとの通信結果</H3>
          <DivTsushinKekka>
            <div className="kingaku-area">
              最新の金額
              <span className="kingaku" style={{}}>
                {currentMsg ? currentMsg : "なし"}
              </span>
            </div>

            <div
              style={{
                display: "inline",
                border: "1px solid #000",
                width: 500,
                minHeight: 150,
                marginBottom: 20,
                padding: 10,
              }}
            >
              {receiveContent.map((x) => (
                <div key={x.datetime.toString()} style={{ display: "grid" }}>
                  {`${x.datetime} --> ${x.message}に変更されました`}
                </div>
              ))}
            </div>
          </DivTsushinKekka>
        </li>
      </UlDescription>
    </>
  );
};

export default SignalRIndex;

const UlDescription = styled.ul`
  margin-top: 0;
  margin-bottom: 20px;
  list-style: square;

  & > li {
    padding-top: 4px;
    padding-bottom: 4px;
  }
`;

const AKochira = styled.a`
  color: #ff0000;
`;

const H3 = styled.h3`
  margin: 5px;
`;

const DivTsushinKekka = styled.div`
  display: grid;
  margin-left: 20px;

  & .kingaku-area {
    height: 30px;
    margin: 10px 0;
  }
  & .kingaku {
    display: inline-block;
    border: 1px solid #000;
    font-size: 1.2rem;
    padding-right: 10px;
    padding-left: 10px;
    height: 100%;
    background-color: yellow;
    margin-left: 10px;
  }
`;
