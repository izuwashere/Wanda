import Cookies from "js-cookie";

export default function authHeader() {
  const user = Cookies.get();
  if (user && user.token) {
    return { Authorization: "Bearer " + user.token};
  } else {
    return {};
  }
}
