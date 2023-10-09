const Slider = ({ items }) => {
  const value = items.map((item, index) => (
    <swiper-slide key={index}>
      <img src={item} alt="slider" className="object-fit max-h-[31.25rem]" />
    </swiper-slide>
  ));

  return (
    <swiper-container
      style={{
        maxWidth: "31.25rem",
        "--swiper-pagination-color": "#000",
        "--swiper-pagination-bullet-inactive-color": "#d6d6d6",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "8px",
        "--swiper-pagination-bullet-horizontal-gap": "4px",
      }}
      space-between="2"
      slides-per-view="auto"
      pagination="true"
      pagination-clickable="true"
      loop="true"
    >
      {value}
    </swiper-container>
  );
};

export default Slider;
