type Props = {
  variants?: "white" | "black";
};
export const DownloadIcon = ({ variants }: Props) => {
  return variants === "white" ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
    >
      <g clipPath="url(#clip0_4628_34534)">
        <path
          d="M2.66797 11.834V13.1673C2.66797 13.5209 2.80844 13.8601 3.05849 14.1101C3.30854 14.3602 3.64768 14.5007 4.0013 14.5007H12.0013C12.3549 14.5007 12.6941 14.3602 12.9441 14.1101C13.1942 13.8601 13.3346 13.5209 13.3346 13.1673V11.834"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.66797 7.83398L8.0013 11.1673L11.3346 7.83398"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 3.16602V11.166"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4628_34534">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <g clipPath="url(#clip0_2943_82477)">
        <path
          d="M3.33337 14.167V15.8337C3.33337 16.2757 3.50897 16.6996 3.82153 17.0122C4.13409 17.3247 4.55801 17.5003 5.00004 17.5003H15C15.4421 17.5003 15.866 17.3247 16.1786 17.0122C16.4911 16.6996 16.6667 16.2757 16.6667 15.8337V14.167"
          stroke="#0A83FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.83337 9.16699L10 13.3337L14.1667 9.16699"
          stroke="#0A83FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 3.33301V13.333"
          stroke="#0A83FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2943_82477">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
