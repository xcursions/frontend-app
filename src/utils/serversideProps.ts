// eslint-disable-next-line simple-import-sort/imports
import jwtDecode from "jwt-decode";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { loginRedirect } from "./serversideProps.helper";

export const authServersideProps = ({
  req: { cookies },
  resolvedUrl,
}: GetServerSidePropsContext): GetServerSidePropsResult<object> => {
  const token = cookies["mep-token"];
  const destination = loginRedirect(resolvedUrl);
  // eslint-disable-next-line no-console
  if (!token) {
    // redirect user to Login if token is false
    return {
      redirect: {
        permanent: false,
        destination,
      },
    };
  }
  const parsedToken: any = jwtDecode(token);
  let tokenIsValid: boolean;

  if (parsedToken.exp * 1000 < Date.now()) {
    tokenIsValid = false;
    // redirect user to Login if token is expired
    return {
      redirect: {
        permanent: false,
        destination,
      },
    };
  }

  tokenIsValid = true;

  return {
    props: {
      tokenIsValid,
    },
  };
};
