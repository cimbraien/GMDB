const MovieCard = ({ ...props }) => {
  const { data, index } = props;

  return (
    <div className="m-3" style={{ maxWidth: "210px" }}>
      <a href={`/moviedetail/${data.id}`} key={index}>
        <div key={index}>
          <img
            className="rounded"
            src={data.banner ? `${data.thumbnail}` : data.rating}
            alt={data.name}
            style={{ maxWidth: "200px" }}
          />
          <h6>{data.title ? data.title : data.name}</h6>
        </div>
      </a>
    </div>
  );
};

export default MovieCard;
