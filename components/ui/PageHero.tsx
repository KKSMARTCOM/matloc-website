import Image from "next/image";

interface Props {
  title: string;
  url: string;
}

export default function PageHero({ title, url }: Props) {
  return (
    <section className="relative w-full flex justify-center items-center h-60">
      <Image src={url} fill className="object-cover" alt="Hero" />
      <div className="absolute top-0 right-0 w-full h-full bg-linear-to-r from-secondary-hover from-10% via-secondary via-30% to-dark opacity-70" />
      <h1 className="section-title uppercase absolute text-white after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-4 after:h-1 after:w-1/3 after:bg-primary">
        {title}
      </h1>
    </section>
  );
}
