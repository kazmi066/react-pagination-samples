export default function PersonInfo({ name, trips }) {
  return (
    <div className="person_info_gradient px-4 py-14">
      <h1 className="text-4xl text-white font-bold">{name}</h1>
      <p>
        <b>Trips:</b> {trips}
      </p>
    </div>
  );
}
