export default function Greeting({ email, username }) {
  const date = new Date();
  let currentHour = date.getHours();
  let currentGreeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <>
      <h1>
        {currentGreeting}, <span className="active">{username}</span>
      </h1>
      <h4>Your current details are:</h4>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
    </>
  );
}
