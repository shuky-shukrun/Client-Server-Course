const TeamMember = (props) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow">
        <img src={props.src} className="border-bottom m-3" alt="" />
        <div className="card-body">
          <h6>{props.name}</h6>
          <div className="underline"></div>
          <p>{props.title}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
