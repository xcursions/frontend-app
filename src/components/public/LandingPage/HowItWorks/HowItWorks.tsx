import Image from "next/image";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="xcursion_hiw_wrapper">
      <div>
        <h3 className="header">How it works</h3>
        <p className="paragraph">
          Achieve total travel freedom in just 3 easy steps
        </p>
      </div>
      <div className="xcursion_hiw_card_container">
        <div>
          <Image
            src="/assets/images/landing-page/hiw1.png"
            alt="how it works1"
            width={400}
            height={280}
            //   layout="fill"
            //   className="w-full"
          />
        </div>
        <div className="xcursion_hiw_card_container__txt">
          <h4>1. Select your destination</h4>
          <p>
            Browse for cost-effective flights right from your xcursions
            dashboard. No upfront charges or concealed expenses.
          </p>
        </div>
      </div>
      <div className="xcursion_hiw_card_container">
        <div className="xcursion_hiw_card_container__txt">
          <h4>2. Commence saving</h4>
          <p>
            Link your debit card and input your passport information to begin
            saving. You&apos;ll receive a tailored budget plan, access to travel
            inspiration, continuous support, and additional perks.
          </p>
        </div>
        <div>
          <Image
            src="/assets/images/landing-page/hiw2.png"
            alt="how it works 2"
            width={400}
            height={280}
            //   layout="fill"
            //   className="w-full"
          />
        </div>
      </div>
      <div className="xcursion_hiw_card_container">
        <div>
          <Image
            src="/assets/images/landing-page/hiw3.png"
            alt="how it works 3"
            width={400}
            height={280}
            //   layout="fill"
            //   className="w-full"
          />
        </div>
        <div className="xcursion_hiw_card_container__txt">
          <h4>3. Gear up for departure!</h4>
          <p>
            Xcursions assists you in cultivating enduring saving habits,
            empowering you to pursue your aspirations without financial
            constraints or debt hindrances.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
