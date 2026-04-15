import { EmailRegex } from "./EmailRegex";

export const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export function PasswordError({ password }) {
  const value = password?.trim() || "";
  if (!value || value.length >= 8) return null;

  return (
    <div className="text-center errMessage">
      Password must be minimum 8 characters
    </div>
  );
}

export function UsernameError({ username }) {
  const value = username?.trim() || "";
  if (!value || value.length >= 2) return null;

  return (
    <div className="text-center errMessage">
      Username must be minimum 2 characters
    </div>
  );
}

export function PriceError({ price }) {
  if (price !== null && price < 0.01)
    return (
      <div className="text-center errMessage">
        Cost of item can't be under $0.01
      </div>
    );
  return null;
}

export function EmailError({ email }) {
  const value = email?.trim() || "";

  if (value !== "" && !EmailRegex.test(value)) {
    return <div className="text-center errMessage">Invalid email entered</div>;
  }
  return null;
}

export function DateError({ date }) {
  const selected = date ? new Date(date + "T00:00:00") : null;

  if (selected && selected > getToday()) {
    return (
      <div className="text-center errMessage">Date can't be in the future</div>
    );
  }
  return null;
}

export const selectedDate = (date) =>
  date ? new Date(date + "T00:00:00") : null;
