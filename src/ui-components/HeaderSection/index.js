const HeaderSection = ({ heading, subHeading, rightItem = () => {} }) => {
  return (
    <header
      style={{
        margin: "20px 5px",
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
          className=" capitalize"
        >
          {heading}
        </h1>
        <p className="text-[14px] font-normal text-[#667084]">{subHeading}</p>
      </div>
      {rightItem()}
    </header>
  );
};

export default HeaderSection;
