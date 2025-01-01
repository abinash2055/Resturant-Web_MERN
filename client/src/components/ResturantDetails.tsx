import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import AvailableMenu from "./AvailableMenu";

const ResturantDetails = () => {
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <img
            src="https://www.foodandwine.com/thmb/eAleG5aGQtPlSkaQ15KrwHvjAZk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6-Vital-Canadian-Restaurants-FT-4-MAG1223-02cac008b2a443428cec874ac6339c36.jpg"
            alt="Images"
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="font-medium text-xl">Tandoori Chicken</h1>
            <div className="flex gap-2 my-2">
              {["Biryani", "Momos", "Jalebi"].map(
                (cuisins: string, idx: number) => (
                  <Badge key={idx}>{cuisins}</Badge>
                )
              )}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  Delivery Time:{" "}
                  <span className="text-[#D19254]">35 minutes</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <AvailableMenu />
      </div>
    </div>
  );
};

export default ResturantDetails;
