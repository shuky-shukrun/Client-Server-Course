const ServiceComponent = (props) => {
  return (
    <div className="col-lg-4 text-center p-3">
      <div>
        <p>{props.icon}</p>
        <h5>{props.title}</h5>
      </div>
      {props.info}
    </div>
  );
};

export default ServiceComponent;
