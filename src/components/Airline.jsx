export default function Airline({ person }) {
  return (
    <div className="px-4 py-4">
      <h1 className="text-2xl font-bold">Airlines:</h1>
      {person.airline.map((aline) => (
        <div
          key={aline.id}
          className="capitalize flex items-center justify-around"
        >
          <div>
            <p>Name: {aline.name}</p>
            <p>Country: {aline.country}</p>
            <p>Established in: {aline.established}</p>
            <p>headquarters: {aline.head_quaters}</p>
          </div>
          <div>
            <img src={aline.logo} alt="logo" />
          </div>
        </div>
      ))}
    </div>
  );
}
