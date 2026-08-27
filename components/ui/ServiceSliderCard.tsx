import { Service } from "@/public/assets/assets";

const ServiceSliderCard = ({ icon: Icon, title, subtitle }: Service) => {
  return (
    <div className="group relative bg-white p-6 space-y-3 rounded-lg shadow-md overflow-hidden w-full h-full">
      <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
      <div className="absolute top-0 left-0 h-1 w-full -translate-x-full bg-linear-to-r from-secondary-hover to-secondary transition-transform duration-500 ease-out group-hover:translate-x-0" />

      <div className="w-10 h-10 flex justify-center items-center bg-primary/20 rounded-md">
        <Icon size={25} className="text-primary" />
      </div>
      <h2 className="font-[600]">{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
};

export default ServiceSliderCard;
