type IsStripe = {
  [key: string]: any;
};

const useHandleCreatePortal = async (query: any) => {
  const user = localStorage.getItem("mep-user");

  if (!user) {
    return window.location.assign("/login?role=vendor");
  }
  const parsedUser = JSON.parse(user);

  try {
    const result: IsStripe = await query({
      customer_id: parsedUser.stripe_customer_id,
    });
    if (result) {
      return window.location.assign(result?.data?.data.url);
    }
  } catch (error) {
    // console.log(error);
  }
  return null;
};

export default useHandleCreatePortal;
