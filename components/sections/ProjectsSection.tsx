"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Heading } from "@/components/atoms/Heading";
import { projectImages, type ProjectImage } from "@/lib/project-images";

/** Returns Tailwind aspect ratio class based on image aspectRatio property */
function getAspectRatioClass(aspectRatio: ProjectImage["aspectRatio"]): string {
  switch (aspectRatio) {
    case "portrait":
      return "aspect-[3/4]";
    case "square":
      return "aspect-square";
    case "landscape":
    default:
      return "aspect-video";
  }
}

export function ProjectsSection() {
  const t = useTranslations("ProjectsSection");

  return (
    <section id="projects" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Title */}
        <Heading
          as="h2"
          size="h2"
          className="mb-12 text-center text-(--brand-blue) md:mb-16"
        >
          {t("title")}
        </Heading>

        {/* Masonry Grid - CSS Columns approach */}
        {/* Responsive: 2 cols default, 3 cols at lg (1024px), 4 cols at xl (1280px) */}
        <div className="columns-2 gap-4 lg:columns-3 xl:columns-4">
          {projectImages.map((image) => (
            <div key={image.id} className="mb-4 break-inside-avoid">
              <div
                className={`relative overflow-hidden rounded-lg ${getAspectRatioClass(image.aspectRatio)}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
