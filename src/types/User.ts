type IUser = {
  _id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  account_type: string;
  dob?: string;
  phone?: string;
  gender?: string;
  email: string;
  remember_token?: string;
  is_activated: boolean;
  onboarding_status:
    | "completed"
    | "onboardingOne"
    | "onboardingTwo"
    | "onboardingThree";
  is_paid?: boolean;
  is_subscribed: boolean;
  is_trial_eligible: boolean;
  is_claimed: boolean;
};
export default IUser;
