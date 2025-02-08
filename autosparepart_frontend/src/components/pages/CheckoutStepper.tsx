import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { AppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchAddresses } from "@/features/address/addressSlice";
import { keycloak } from "@/features/auth/authSlice";
import {
  clearLocalCart,
  removeFromLocalCart,
  updateLocalQuantity,
} from "@/features/cart/localCartSlice";
import { transferCart } from "@/features/order/orderSlice";
import { CartItem } from "@/types";
import {
  Check,
  MapPin,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useNavigate } from "react-router-dom";

const CheckoutStepper = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { items: addresses } = useAppSelector((state) => state.addresses);
  const { items: localCartItems } = useAppSelector((state) => state.localCart);
  const { pendingOrderId } = useAppSelector((state) => state.order);
  const [nextButtonActive, setNextButtonActive] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [defaultAddressId, setDefaultAddressId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(() => {
    // Check if we're returning from Keycloak login
    const isReturningFromAuth =
      localStorage.getItem("checkoutRedirect") === "true";
    // If we are, and user is authenticated, start at shipping step
    if (isReturningFromAuth) {
      localStorage.removeItem("checkoutRedirect"); // Clean up
      return 2; // Skip to shipping step
    }
    return 0; // Otherwise start at beginning
  });

  const handleAddressChange = (addressId: string) => {
    setSelectedAddress(addressId);
  };

  useEffect(() => {
    setCurrentStep(0);
    const defaultAddress = addresses.find((address) => address.default);
    setDefaultAddressId(
      defaultAddress ? defaultAddress.addressId.toString() : null
    );
    defaultAddress && setSelectedAddress(defaultAddress.addressId.toString());
  }, [dispatch, addresses.length]);

  function handleNavigateToOrder() {
    if (pendingOrderId) {
      navigate(`/orders/${pendingOrderId}`);
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (isAuthenticated && currentStep === 0 && localCartItems.length > 0) {
        dispatch(fetchAddresses());
        setCurrentStep(1);
        setNextButtonActive(true);
      } else {
        setNextButtonActive(false);
        setCurrentStep((current) => current + 1);
        if (currentStep === steps.length - 2) {
          const cartItems = localCartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          }));
          handleLocalCartItemTransfer(cartItems);
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      if (isAuthenticated && currentStep === 2) {
        setCurrentStep(0);
      } else {
        setCurrentStep((current) => current - 1);
      }
    }
  };

  const handleAccountStep = () => {
    keycloak.login();
  };

  const handleLocalCartItemTransfer = (cartItems: CartItem[]) => {
    dispatch(transferCart({ cartItems, addressId: Number(selectedAddress) }));
    dispatch(clearLocalCart());
    console.log("Pending orderId", pendingOrderId);
  };

  const total = localCartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const steps = [
    { title: "Review Cart", icon: <ShoppingCart className="h-6 w-6" /> },
    ...(isAuthenticated
      ? []
      : [{ title: "Account", icon: <User className="h-6 w-6" /> }]),
    { title: "Shipping", icon: <MapPin className="h-6 w-6" /> },
    // { title: "Payment", icon: <CreditCard className="h-6 w-6" /> },
    { title: "Confirmation", icon: <Check className="h-6 w-6" /> },
  ];

  // Calculate total

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(updateLocalQuantity({ productId, quantity: newQuantity }));
    }
  };

  const removeItem = (productId: string) => {
    dispatch(removeFromLocalCart(productId));
  };

  const Order = () => (
    <div className="space-y-4">
      <Order />;
    </div>
  );

  const CartReview = () => (
    <div className="space-y-4">
      {localCartItems.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <>
          {localCartItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center p-4 border rounded hover:bg-gray-50"
            >
              {/* Optional image */}
              {item.product.image && (
                <div className="w-16 h-16 mr-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              )}

              {/* Item details */}
              <div className="flex-grow">
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-sm text-gray-500">
                  ${item.product.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center space-x-2 mx-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity - 1)
                  }
                  className="h-8 w-8"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity + 1)
                  }
                  className="h-8 w-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Subtotal and remove button */}
              <div className="text-right min-w-[100px]">
                <div className="font-medium">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.productId)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {/* Cart summary */}
          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between items-center font-medium text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const ShippingForm = () => (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Shipping Addresses</CardTitle>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add New Address
        </Button>
      </CardHeader>
      <CardContent>
        {addresses.length > 0 ? (
          <RadioGroup
            value={selectedAddress || defaultAddressId || ""}
            onValueChange={handleAddressChange}
            className="w-full"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Street Address</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Postal Code</TableHead>
                  <TableHead>Country</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {addresses.map((address) => (
                  <TableRow key={address.addressId}>
                    <TableCell className="w-12">
                      <RadioGroupItem
                        value={address.addressId.toString()}
                        id={address.addressId.toString()}
                        className="mt-1"
                      />
                    </TableCell>
                    <TableCell>{address.addressLine1}</TableCell>
                    <TableCell>{address.city}</TableCell>
                    <TableCell>{address.postalCode}</TableCell>
                    <TableCell>{address.country}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </RadioGroup>
        ) : (
          <div className="text-center py-6 text-gray-500">
            No saved addresses found. Add a new address to continue.
          </div>
        )}
      </CardContent>
    </Card>
  );

  const AccountForm = () => (
    <div className="text-center space-y-4">
      <h3 className="text-xl font-medium">Account Required</h3>
      <p className="text-gray-500">
        Please log in or create an account to continue checkout.
      </p>
      <Button className="w-full" onClick={handleAccountStep}>
        Continue to Login
      </Button>
    </div>
  );

  const PaymentForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="card">Card Number</Label>
        <Input id="card" placeholder="0000 0000 0000 0000" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input id="expiry" placeholder="MM/YY" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input id="cvv" placeholder="123" />
        </div>
      </div>
    </div>
  );

  const Confirmation = () => (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <Check className="h-12 w-12 text-green-500" />
      </div>
      <h3 className="text-xl font-medium">Order Confirmed!</h3>
      <p className="text-gray-500">
        Thank you for your purchase. Navigate to your order to pay
      </p>
    </div>
  );

  console.log("currentStep", currentStep);

  const renderStepContent = () => {
    // Adjust step content based on authentication
    const authenticatedStepMap = {
      0: <CartReview />,
      1: <ShippingForm />,
      2: <Confirmation />,
      // 2: <PaymentForm />,
    };

    const unauthenticatedStepMap = {
      0: <CartReview />,
      1: <AccountForm />,
      2: <ShippingForm />,
      3: <Confirmation />,
      // 3: <PaymentForm />,
    };

    const stepMap = isAuthenticated
      ? authenticatedStepMap
      : unauthenticatedStepMap;
    return stepMap[currentStep as keyof typeof stepMap] || null;
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
        <CardDescription>Complete your purchase</CardDescription>
        {isAuthenticated && (
          <CardDescription>Logged in as {user?.email}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`
                rounded-full p-2 mb-2
                ${
                  index === currentStep
                    ? "bg-blue-500 text-white"
                    : index < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }
              `}
              >
                {step.icon}
              </div>
              <span className="text-sm text-center">{step.title}</span>
            </div>
          ))}
        </div>
        {renderStepContent()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        {nextButtonActive ? (
          <Button
            onClick={handleNext}
            disabled={
              currentStep === steps.length - 1 ||
              // localCartItems.length === 0 ||
              (currentStep === 0 && localCartItems.length === 0) ||
              (currentStep === 1 && selectedAddress === "")
            }
          >
            {currentStep === steps.length - 2 ? "Place Order" : "Next"}
          </Button>
        ) : (
          <Button onClick={handleNavigateToOrder} disabled={currentStep === 1}>
            {currentStep === steps.length - 2 && pendingOrderId
              ? "Place Order"
              : "Thanks for your purchase, navigate to checkout"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CheckoutStepper;
