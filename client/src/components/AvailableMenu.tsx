import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

const AvailableMenu = () => {
  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menu
      </h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
        <Card className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
          <img
            className="w-full h-40 object-cover"
            src="https://www.foodandwine.com/thmb/eAleG5aGQtPlSkaQ15KrwHvjAZk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6-Vital-Canadian-Restaurants-FT-4-MAG1223-02cac008b2a443428cec874ac6339c36.jpg"
            alt="Items"
          />
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Tandoori Biryani
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Mollitia, asperiores.
            </p>
            <h3 className="text-lg font-semibold mt-4">
              Price: <span className="text-[#D19254]">रु 800</span>
            </h3>
          </CardContent>
          <CardFooter className="p-4">
            <Button className="w-full bg-orange hover:bg-hoverOrange">
              Add to Card
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AvailableMenu;
