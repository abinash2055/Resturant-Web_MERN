import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import CheckoutConfirmPage from "./CheckoutConfirmPage";

const cart = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button variant="link">Clear All</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Avatar>
                <AvatarImage src="" alt="Logo" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell> Biryani</TableCell>
            <TableCell> Price</TableCell>
            <TableCell>
              <div className="w-fit items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="rounded-full bg-gray-200"
                >
                  <Minus />
                </Button>
                <Button
                  size={"icon"}
                  disabled
                  variant={"outline"}
                  className="font-bold border-none"
                >
                  1
                </Button>
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="rounded-full bg-orange hover:bg-hoverOrange"
                >
                  <Plus />
                </Button>
              </div>
            </TableCell>
            <TableCell>800</TableCell>
            <TableCell className="text-right">
              <Button size={"sm"} className="bg-orange hover:bg-hoverOrange">
                Remove
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow className="text-2xl font-bold">
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">800</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <Button
          onClick={() => setOpen(true)}
          className="bg-orange hover:bg-hoverOrange"
        >
          Proceed To Checkout
        </Button>
      </div>
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default cart;