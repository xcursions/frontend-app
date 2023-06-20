/**
 * Helper function that returns a boolean
 * when the url passed doesn't not match
 * "user" | "admin"
 * @param url : string | undefined
 * @returns false | "user"  | "admin"
 */
const resolveUrlParams = (url: string | undefined) => {
  switch (url) {
    case "user":
    case "admin":
      return url;

    default:
      return false;
  }
};

/**
 * @function loginRedirect splits parsed url
 * and makes use of the second index of the url
 * to determine where to redirect the user
 * @param url : string
 * @returns string
 */
export const loginRedirect = (url: string) => {
  const fisrtUrlString = url.split("/")[1];
  const roleParam = resolveUrlParams(fisrtUrlString);
  return roleParam ? `/login?role=${roleParam}` : "/login";
};
