import { useState } from "react";
import Modal from "../components/Modal";
import useMediaQuery from "../utils/useMediaQuery";

const Slider = ({ items }) => {
  const sm = useMediaQuery("(min-width: 640px)");
  const [isOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const handleModalOpen = (event) => {
    sm && setIsOpen(true);
    setModalImage(event.target.src);
  };

  // 將 Modal 移至下方: Fix 多張圖片產生多個 Modal
  const slider = items.images.map((item, index) => {
    return (
      <swiper-slide key={index}>
        <img src={item.medium} alt={items.title} className={`${sm && `cursor-zoom-in`} object-fit max-h-[31.25rem]`} onClick={handleModalOpen} />
      </swiper-slide>
    );
  });

  return (
    <swiper-container
      style={{
        maxWidth: "31.25rem",
        "--swiper-pagination-color": "rgba(255, 255, 255, 1)",
        "--swiper-pagination-bullet-inactive-color": "rgba(255, 255, 255, 0.6)",
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
      {slider}
      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} className="modal-image w-[90%] max-w-[750px]">
          <img src={modalImage} alt={items.title} className="rounded-lg" />
        </Modal>
      )}
    </swiper-container>
  );
};

export default Slider;
