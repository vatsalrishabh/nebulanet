import { Carousel } from "@material-tailwind/react";


export default function Slider() {
  return (
    <Carousel autoplay loop className="xl">
      <img
        src="https://dl.geimshospital.com/uploads/image/M9vjwG35-Physiotherapy-100-1-jpg.webp"
        alt="Image 1"
        className="lg:h-[70vh] w-full object-cover"
      />
      <img
        src={"https://dl.geimshospital.com/uploads/image/M9vjwG35-Physiotherapy-100-1-jpg.webp"}
        alt="Image 2"
        className="lg:h-[70vh] w-full object-cover"
      />
      <img
        src="https://media.istockphoto.com/id/1199908661/photo/physiotherapist-treatment-patient-she-holding-patients-hand-shoulder-joint-treatment.jpg?s=612x612&w=0&k=20&c=yghgsRCfhifTxzIS8UqlHIxpyyHDUNXkfqwQHABDRuY="
        alt="Image 3"
        className="lg:h-[70vh] w-full object-cover"
      />
    </Carousel>
  );
}