import { RiQuillPenLine } from "react-icons/ri";

const TitleIcon = () => {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "35px auto",
          gridAutoFlow: "column",
          paddingTop: "5px",
          paddingBottom: "5px",
          paddingLeft: "2px",
          alignItems: "center",
        }}
      >
        <RiQuillPenLine size={30} />
        <div style={{ alignItems: "center" }}>
          <span style={{ fontFamily: "Arial", fontSize: 20 }}>
            react-study-notes
          </span>
        </div>
      </div>
    </div>
  );
};
export default TitleIcon;
