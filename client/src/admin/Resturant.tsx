import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ResturantFormSchema,
  resturantFromSchema,
} from "@/schema/resturantSchema";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";

const Resturant = () => {
  const [input, setInput] = useState<ResturantFormSchema>({
    resturantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });

  const [errors, setErrors] = useState<Partial<ResturantFormSchema>>({});

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = resturantFromSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<ResturantFormSchema>);
      return;
    }

    // ADD RESTURANT API
    console.log(input);
  };

  const loading = false;
  const resturantHai = false;

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Resturants </h1>
          <form onSubmit={submitHandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              <div>
                <Label>Resturant Name</Label>
                <Input
                  type="text"
                  name="resturantName"
                  value={input.resturantName}
                  onChange={changeEventHandler}
                  placeholder="Enter your Resturant Name"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.resturantName}
                  </span>
                )}
              </div>
              <div>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={input.city}
                  onChange={changeEventHandler}
                  placeholder="Enter your city Name"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.city}
                  </span>
                )}
              </div>

              <div>
                <Label>Country</Label>
                <Input
                  type="text"
                  name="country"
                  value={input.country}
                  onChange={changeEventHandler}
                  placeholder="Enter your country Name"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.country}
                  </span>
                )}
              </div>
              <div>
                <Label>Estimate Delivery Time</Label>
                <Input
                  type="number"
                  name="deliveryTime"
                  value={input.deliveryTime}
                  onChange={changeEventHandler}
                  placeholder="Enter your Delivery Time"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.deliveryTime}
                  </span>
                )}
              </div>
              <div>
                <Label>Cuisines</Label>
                <Input
                  type="text"
                  name="cuisines"
                  value={input.cuisines}
                  onChange={(e) =>
                    setInput({ ...input, cuisines: e.target.value.split(",") })
                  }
                  placeholder="eg: chowins, momos, pizza, burger"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.cuisines}
                  </span>
                )}
              </div>
              <div>
                <Label>Upload Resturant Banner</Label>
                <Input
                  onChange={(e) =>
                    setInput({
                      ...input,
                      imageFile: e.target.files?.[0] || undefined,
                    })
                  }
                  type="file"
                  accept="images/*"
                  name="imageFile"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.imageFile?.name || "image file is required"}
                  </span>
                )}
              </div>
            </div>
            <div className="my-5 w-fit">
              {loading ? (
                <Button disabled className="bg-orange hover:bg-hoverOrange">
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Please Wait
                </Button>
              ) : (
                <Button className="bg-orange hover:bg-hoverOrange">
                  {resturantHai
                    ? "Update Your Resturant"
                    : "Add Your Resturant"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Resturant;
