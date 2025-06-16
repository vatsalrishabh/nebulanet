'use client';

import { Carousel } from "@material-tailwind/react";
import Image from "next/image";

export default function Slider() {
  return (
    <Carousel autoplay loop className="h-[70vh] w-full">
      <div className="relative h-[70vh] w-full">
        <Image
          src="https://dl.geimshospital.com/uploads/image/M9vjwG35-Physiotherapy-100-1-jpg.webp"
          alt="Image 1"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative h-[70vh] w-full">
        <Image
          src="https://dl.geimshospital.com/uploads/image/M9vjwG35-Physiotherapy-100-1-jpg.webp"
          alt="Image 2"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative h-[70vh] w-full">
        <Image
          src="https://media.istockphoto.com/id/1199908661/photo/physiotherapist-treatment-patient-she-holding-patients-hand-shoulder-joint-treatment.jpg?s=612x612&w=0&k=20&c=yghgsRCfhifTxzIS8UqlHIxpyyHDUNXkfqwQHABDRuY="
          alt="Image 3"
          fill
          className="object-cover"
        />
      </div>
    </Carousel>
  );
}
