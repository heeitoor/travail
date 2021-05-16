export function validateEmail(value: string): boolean {
  const rgx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return rgx.test(String(value).toLowerCase());
}

export function validatePassword(value: string) {
  var rgx = /[A-Z]|[0-9]|[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g;
  return value && value.length > 8 && rgx.test(value);
}
