import * as S from "./InfoCard.style";

interface IInfoCardProps {
  title: string;
  messages: string[];
}
const InfoCard = ({ title, messages }: IInfoCardProps) => {
  return (
    <S.InfoCard>
      <h3>{title}</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={`${title}-${index}`}>
            <S.InfoIcon />
            <div dangerouslySetInnerHTML={{ __html: message }} />
          </li>
        ))}
      </ul>
    </S.InfoCard>
  );
};

export default InfoCard;
