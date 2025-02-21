import { AddAddressRequest, Address } from "@/types";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import {
  addAddress,
  deleteAddress,
  updateAddress,
} from "@/features/address/addressSlice";
import { useAppDispatch } from "@/app/hooks";
import { useRef, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import AddressForm from "./AddressForm";

interface ProfileAddressesProps {
  addresses: Address[];
}

const ProfileAddressesList = ({ addresses }: ProfileAddressesProps) => {
  const dispatch = useAppDispatch();
  const [editingAddress, setEditingAddress] =
    useState<AddAddressRequest | null>(null);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<{ reset: () => void }>(null);

  const handleDeleteAddress = (addressId: number) => {
    dispatch(deleteAddress({ addressId }));
  };

  const handleFormSubmit = (values: AddAddressRequest) => {
    if (editingAddress) {
      console.log("EDIT ADDRESS: ", editingAddress);

      dispatch(
        updateAddress({
          addressId: editingAddress.addressId!,
          address: { ...values },
        })
      );
      setEditingAddress(null);
    } else {
      dispatch(addAddress({ request: values }));
    }
    formRef.current?.reset();
    setShowForm(false);
  };

  const handelFormCancel = () => {
    setEditingAddress(null);
    formRef.current?.reset();
    setShowForm(false);
  };

  if (editingAddress) {
    console.log("EDIT ADDRESS: ", editingAddress);

    return (
      <AddressForm
        initialValues={editingAddress}
        onSubmit={handleFormSubmit}
        onCancel={handelFormCancel}
        isEditing={true}
        formRef={formRef}
      />
    );
  }

  return (
    <div>
      {addresses.length === 0 ? (
        <div className="flex justify-center text-lg text-slate-400 p-4">
          No addresses added
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {addresses.map((address) => (
              <Card key={address.addressId}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold mb-2">
                        {address.addressId === 1 ? "Home" : ""}
                        {address.default ? (
                          <span className="ml-0 text-md bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                            Default
                          </span>
                        ) : (
                          ""
                        )}
                      </h3>
                      <p className="text-gray-600">
                        Address Line: {address.addressLine1}
                      </p>
                      <p className="text-gray-600">City: {address.city}</p>
                      <p className="text-gray-600">
                        Country: {address.country}
                      </p>
                      <p className="text-gray-600">
                        Postal Code: {address.postalCode}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingAddress(address);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDeleteAddress(address.addressId)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
      <div className="pt-2 pb-2">
        <Collapsible open={showForm} onOpenChange={setShowForm}>
          <CollapsibleTrigger asChild>
            <Button className="w-full">
              {showForm ? "Hide Form" : "Add New Address"}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <AddressForm
              initialValues={editingAddress || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handelFormCancel}
              isEditing={!!editingAddress}
              formRef={formRef}
            />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default ProfileAddressesList;
