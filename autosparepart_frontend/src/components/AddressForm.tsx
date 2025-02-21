import { useAppDispatch } from "@/app/hooks";
import { AddAddressRequest } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { RefObject, useImperativeHandle } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface AddressFormProps {
  initialValues?: AddAddressRequest;
  onSubmit: (values: AddAddressRequest) => void;
  onCancel?: () => void;
  isEditing?: boolean;
  formRef?: RefObject<any>;
}

const formSchema = z.object({
  addressLine1: z.string().min(2, {
    message: "Address must be exact address",
  }),
  city: z.string().min(2, {
    message: "Select an appropriate city",
  }),
  postalCode: z.string().min(3, {
    message: "Select a valid postal code",
  }),
});

const AddressForm = ({
  initialValues,
  onSubmit,
  onCancel,
  isEditing,
  formRef,
}: AddressFormProps) => {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      addressLine1: "",
      city: "",
      postalCode: "",
    },
  });

  useImperativeHandle(formRef, () => ({
    reset: () => form.reset(),
  }));

  console.log("is editing: ", isEditing);

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardHeader>
            <CardTitle>
              {isEditing ? "Edit Address" : "Add new address"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="13 Aban, Valiasr" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Tehran" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="80130" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            {onCancel && (
              <Button type="button" variant="ghost" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit">
              {isEditing ? "Update Address" : "Add Address"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AddressForm;
