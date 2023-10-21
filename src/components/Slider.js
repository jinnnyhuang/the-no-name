import { useState } from "react";
import Modal from "../components/Modal";
import useMediaQuery from "../utils/useMediaQuery";

const Slider = ({ items }) => {
  const lg = useMediaQuery("(min-width: 1024px)");

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const handleModalOpen = (event) => {
    lg && setShowModal(true);
    setModalImage(event.target.src);
  };
  const handleModalClose = () => {
    lg && setShowModal(false);
  };

  const value = items.map((item, index) => (
    <swiper-slide key={index}>
      <img src={item} alt="slider" className={`${lg && `cursor-zoom-in`} object-fit max-h-[31.25rem]`} onClick={handleModalOpen} />
      {showModal && (
        <Modal onClose={handleModalClose}>
          <img src={modalImage} alt="modal" className="rounded-lg" />
        </Modal>
      )}
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
