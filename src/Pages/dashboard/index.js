/* eslint-disable import/extensions */
// import { useState } from 'react';
import Card from '@/ui-components/Card';
// import Modal from '@/ui-components/Modal';

import HeaderSection from '@/ui-components/HeaderSection';
import DataCard from '@/ui-components/DataCard';
import { SlCalender } from 'react-icons/sl';
import ActionButton from '@/ui-components/ActionButton';
import { useAppSelector } from '@/hooks';
// import { AiOutlinePlusCircle } from 'react-icons/ai';
import Section from '@/ui-components/Section';
import styles from './Home.module.css';
import DoughnutChartExample from '../../components/DoughnutChartExample';

import BillingHistory from '../../components/BillingHistory';
import Paragraph from '../../components/Paragraph';
import BarChartExample from '../../components/BarChartExample';

// const profileImage = '/assets/images/icons/profile_avatar.png';
export default function Dashboard() {
  // const [modal, setModal] = useState(false);

  const { user } = useAppSelector((state) => state.user);

  // const handleClose = () => {
  //   // alert('closing');
  //   setModal(false);
  // };

  // const handleCancel = () => {
  //   setModal(false);
  // };

  // const handleSubmit = () => {
  //   alert('Submit is working..!');
  //   handleClose();
  // };

  return (
    <>
      <HeaderSection
        heading={`${user?.profile?.fullName}`}
        subHeading={'Welcome back to your dashboard'}
        // rightItem={() => (
        //   <ActionButton
        //     onClick={() => setModal(true)}
        //     Icon={AiOutlinePlusCircle}
        //     label="Add New User"
        //   />
        // )}
      />

      <Section>
        <DataCard
          label={'Balance'}
          value={'N200k'}
          percentageValue={56.4}
          inverse={true}
        />
        <DataCard label={'Trips'} value={'50'} percentageValue={3.45} />
        <DataCard label={'Events'} value={'20'} percentageValue={10.89} />
      </Section>

      <Section>
        <Card
          heading="Bar Chart Example"
          subHeading="Lets see how data is ploting on chartjs"
        >
          <BarChartExample />
        </Card>
        <Card
          heading="Doughnut Chart Example"
          subHeading="Lets see how data is ploting on chartjs"
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <DoughnutChartExample />
          </div>
        </Card>
      </Section>

      <Section>
        <Card
          heading="Basic Plan"
          subHeading="Our most popular plan for small teams."
          rightItem={() => {
            return <h2>$20 per month</h2>;
          }}
          footerLeft={() => {
            return (
              <div className={styles['date-placeholder']}>
                <SlCalender />
                <p className="ml-5">5th Sep 2023</p>
              </div>
            );
          }}
          footerRight={() => {
            return (
              <ActionButton
                inverse={true}
                label="View"
                style={{ padding: '2px 5px', fontSize: 12 }}
              />
            );
          }}
        >
          <div style={{ margin: '10px' }}>
            <Paragraph />
            <Paragraph />
          </div>
        </Card>

        <Card heading="Payment method" subHeading="Change how you pay for plan">
          <div style={{ margin: '10px' }}>
            <Paragraph />
          </div>
        </Card>

        <Card
          heading="Basic Plan"
          subHeading="Our most popular plan for small teams."
          rightItem={() => {
            return <h2>$20 per month</h2>;
          }}
        >
          <div style={{ margin: '10px' }}>
            <Paragraph />
          </div>
        </Card>
      </Section>

      <BillingHistory />

      {/* <Modal
        isOpen={modal}
        onClose={handleClose}
        heading={'AIO Dashboard'}
        positiveText={'Save Changes'}
        negativeText={'Cancel'}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      >
        <p>Welcome to aio dashboard</p>
      </Modal> */}
    </>
  );
}
