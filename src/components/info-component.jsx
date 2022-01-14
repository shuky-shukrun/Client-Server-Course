const InfoComponent = (props) => {
  return (
    <>
      <section className="section">
        <div className="container">
          <h3 className="main-heading">{props.title}</h3>
          <div className="underline"></div>
          {props.info}
          {props.children}
        </div>
      </section>
    </>
  );
};

export default InfoComponent;
