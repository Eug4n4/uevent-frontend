const subscriptions = [
  { title: "YabiYada Fintech Catchup", status: "Subscribed", organizer: "@mockventures" },
  { title: "Soft Skills Sandbox", status: "Subscribed", organizer: "@talkingheads" },
];

const ProfileSubscriptions = () => {
  return (
    <>
      <h3>My subscriptions</h3>
      <ul className="subscription-list">
        {subscriptions.map((sub) => (
          <li key={sub.title}>
            <div>
              <strong>{sub.title}</strong>
              <span>{sub.organizer}</span>
            </div>
            <span className="badge">{sub.status}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProfileSubscriptions;
