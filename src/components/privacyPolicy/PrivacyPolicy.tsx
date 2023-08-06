import React from "react";

import Heading from "../lib/Heading/Heading";
import Text from "../lib/Text/Text";

const PrivacyPolicy = () => {
  return (
    <div className="w-full px-5 pt-[100px] md:pt-[130px] lg:pt-[180px]">
      <div className="relative mx-auto max-w-[608px]">
        <Heading type="h1" className="text-[30px] lg:text-[36px]">
          Privacy & Terms
        </Heading>
        <div className="my-5">
          <Heading type="h3" className="my-5 text-[18px]">
            Travel Experiences
          </Heading>
          <Text className="text-[14px] text-[#667084]">
            All experiences are not inclusive of local flights. Xcursions trips
            cover accommodation, full transportation only, and in most cases
            selected tours. Where applicable, some meals will be covered and
            this is indicated on the trip flier.
            <br /> The trip cost is on a shared room basis which means you will
            be paired with another trip participant in one room based on fit.
            Every traveler is properly vetted and matched. You will also have a
            chance to meet other travelers before the trip in a private group.
            If you prefer to stay in your own room, please reach out to us and
            we can make that happen at an additional cost. For every group or
            customized tour, all travelers are expected to travel and come back
            on the dates assigned to them, failure to do this would attract
            extra charges and a penalty fee.
            <br /> Refunds
            <br />
            <br /> All trips are priced in Naira or USD. All payments are
            non-refundable. However, they can be transferred to another trip of
            your choice in special cases. This payment goes directly towards the
            total trip cost, confirms your trip, and guarantees your spot. You
            may cancel your travel arrangements at any time before the trip
            departure. However please note you may lose part or all of your
            money paid in cases where we have already made reservations.
            <br /> If you cancel and your trip is more than 90 days away, you
            get a full refund (less the deposit fee).
            <br />
            <br /> If you cancel and your trip is in less than 90 days, you have
            the option to transfer your payments as a credit towards a future
            trip with Xcursions.
            <br /> If you cancel and your trip is in less than 60 days, you have
            the option to transfer your payments as a credit (less 30% of trip
            value) towards a future trip with Xcursions. For any cancellations
            with a trip date less than 30 days, the cancellation fee is equal to
            the full booking value.
            <br /> Payment Plan <br />
            <br />
            At Xcursions, we want to make travel accessible to all and this is
            why we have payment plans in place so you can make convenient
            monthly payments towards a future trip. Please note that every
            arrangement should be upheld and, in the case, where you are unable
            to make a monthly payment as planned, please write to
            xcursionsng@gmail.com as soon as possible and we can work out other
            options for you.
          </Text>
          <Heading type="h3" className="my-5 text-[18px]">
            COVID-19 Policy
          </Heading>{" "}
          <Text className="text-[14px] text-[#667084]">
            The safety of all our travelers is paramount. At Xcursions, we
            continue to monitor the situation of every country on our
            destination list and inform travelers of any changes. If a country
            is deemed unsafe to visit or travel restrictions make it impossible,
            Xcursions will reschedule the date to a future one. Travelers will
            be given the option to accept the new dates or apply the payments
            towards a credit to be redeemed on any Xcursions trip (payment
            difference, if applicable, to be made by the traveler). In the event
            that Xcursions cancels the trip, travelers will be notified as soon
            as possible and a full refund will be issued. We keep the
            communications line as open as possible and do not make any changes
            without informing our travelers.{" "}
          </Text>
          <Heading type="h3" className="my-5 text-[18px]">
            Itinerary Changes
          </Heading>
          <Text className="text-[14px] text-[#667084]">
            {" "}
            While we hope to always fulfill every carefully curated activity on
            our trips, sometimes it is necessary for us to make changes in the
            best interest of our travelers. For example, due to weather or
            operational issues. In any case, travelers will always be informed
            and provided with alternate solutions.
            <br /> <br /> If a trip has to be delayed due to COVID or other
            unforeseen situations, we will reschedule and book you into the new
            dates. If those new dates don’t work, you have the option for a full
            credit towards a future trip with Xcursions. Special features or
            bonuses are usually free and will only be effected if we have up to
            20 people going on a trip.
            <br /> <br /> For any trip canceled by Xcursions, we will issue you
            a full credit towards a future trip or a refund. Any expenses
            incurred while preparing for the trip will not be borne by
            Xcursions. In cases where the airlines reschedule flights,
            additional costs for the extra days will be paid by the client.
            <br /> <br />
            Xcursions promises a transparent, open, and communicative process
            throughout your interaction with us. We commit to the highest
            standards possible and will always act in the best interest of our
            travelers.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
