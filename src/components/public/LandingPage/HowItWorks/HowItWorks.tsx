import Image from "next/image";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="xcursion_hiw_wrapper">
      <div>
        <h3 className="header">Travel the Xcursions Way</h3>
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
            className="max-h-[285px] w-full max-w-[400px] object-cover"
          />
        </div>
        <div className="xcursion_hiw_card_container__txt">
          <Image
            src="/assets/images/icons/1.png"
            width={50}
            height={50}
            alt="1"
          />
          <h4>Select your destination</h4>
          <p>
            Whether you’re looking for a short break in Europe, or a long
            vacation in Asia, we’ve got packages to suit your taste and across
            all continents.
          </p>
        </div>
      </div>
      <div className="xcursion_hiw_card_container">
        <div className="xcursion_hiw_card_container__txt">
          <Image
            src="/assets/images/icons/2.png"
            width={50}
            height={50}
            alt="2"
          />
          <h4>Start Saving</h4>
          <p>
            No money, no problem! Our Xcursions Pay-small-small plan helps you
            save and travel on the go. Join our Xcursions &apos;Pay Small Small
            Plan&apos; and save gradually with zero charges.
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
            className="max-h-[285px] w-full max-w-[400px] object-cover"
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
            // className="max-h-[285px] w-full max-w-[400px] rounded-xl object-cover"
          />
        </div>
        <div className="xcursion_hiw_card_container__txt">
          <Image
            src="/assets/images/icons/3.png"
            width={50}
            height={50}
            alt="3"
          />
          <h4>Locked In? Journey Sets!</h4>
          <p>
            Once you&apos;ve set up your plan, just sit back and observe how
            your savings unlock the door to the the travel experiences of your
            dreams.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
