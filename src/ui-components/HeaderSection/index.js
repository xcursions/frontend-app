const HeaderSection = ({ heading, subHeading, rightItem = () => {} }) => {
  return (
    <header
      style={{
        margin: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "24px",
            fontFamily: "dmSansBold",
            fontWeight: "700",
          }}
        >
          {heading}
        </h1>
        <p className="text-[14px] text-[#667084] lg:text-[16px]">
          {subHeading}
        </p>
      </div>
      {rightItem()}
    </header>
  );
};

export default HeaderSection;
