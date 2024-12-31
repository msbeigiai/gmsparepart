import { useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { keycloak } from "@/features/auth/authSlice";
import { removeFromLocalCart, updateLocalQuantity } from '@/features/cart/localCartSlice';
import { Check, CreditCard, MapPin, Minus, Plus, ShoppingCart, Trash2, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


const CheckoutStepper = () => {
  // const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [loginUrl, setLoginUrl] = useState<string | null>(null);
  const { items } = useAppSelector((state) => state.localCart);
  const [nextButtonActive, setNextButtonActive] = useState(true);

  useEffect(() => {
    setCurrentStep(0);
  }, [items]);


  const [currentStep, setCurrentStep] = useState(() => {
    // Check if we're returning from Keycloak login
    const isReturningFromAuth = localStorage.getItem('checkoutRedirect') === 'true';
    // If we are, and user is authenticated, start at shipping step
    if (isReturningFromAuth) {
      localStorage.removeItem('checkoutRedirect'); // Clean up
      return 2; // Skip to shipping step
    }
    return 0; // Otherwise start at beginning
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      // For authenticated users, skip the account step
      if (isAuthenticated && currentStep === 0 && items.length > 0) {
        setCurrentStep(1);
        setNextButtonActive(true);
      } else {
        setNextButtonActive(false);
        setCurrentStep(current => current + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      // If user is authenticated and on shipping step,
      // go back to cart review
      if (isAuthenticated && currentStep === 2) {
        setCurrentStep(0);
      } else {
        setCurrentStep(current => current - 1);
      }
    }
  };

  const handleAccountStep = () => {
    keycloak.login();
  };

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const steps = [
    { title: 'Review Cart', icon: <ShoppingCart className="h-6 w-6" /> },
    ...(isAuthenticated ? [] : [{ title: 'Account', icon: <User className="h-6 w-6" /> }]),
    { title: 'Shipping', icon: <MapPin className="h-6 w-6" /> },
    { title: 'Payment', icon: <CreditCard className="h-6 w-6" /> },
    { title: 'Confirmation', icon: <Check className="h-6 w-6" /> }
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


  const CartReview = () => (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.productId} className="flex items-center p-4 border rounded hover:bg-gray-50">
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
                <p className="text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center space-x-2 mx-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="h-8 w-8"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
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

  // ... rest of the component remains the same (ShippingForm, AccountForm, PaymentForm, Confirmation)
  const ShippingForm = () => (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="address">Street Address</Label>
          <Input id="address" placeholder="Enter your street address" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="City" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postal">Postal Code</Label>
            <Input id="postal" placeholder="Postal Code" />
          </div>
        </div>
      </div>
    </div>
  );

  const AccountForm = () => {
    return <div className="text-center space-y-4">
      <h3 className="text-xl font-medium">Account Required</h3>
      <p className="text-gray-500">Please log in or create an account to continue checkout.</p>
      <Button
        className="w-full"
        onClick={handleAccountStep}
      >
        Continue to Login
      </Button>
    </div>
  };

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
      <p className="text-gray-500">Thank you for your purchase.</p>
    </div>
  );

  const renderStepContent = () => {
    // Adjust step content based on authentication
    const authenticatedStepMap = {
      0: <CartReview />,
      1: <ShippingForm />,
      2: <PaymentForm />,
      3: <Confirmation />
    };

    const unauthenticatedStepMap = {
      0: <CartReview />,
      1: <AccountForm />,
      2: <ShippingForm />,
      3: <PaymentForm />,
      4: <Confirmation />
    };

    const stepMap = isAuthenticated ? authenticatedStepMap : unauthenticatedStepMap;
    return stepMap[currentStep as keyof typeof stepMap] || null;
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
        <CardDescription>Complete your purchase</CardDescription>
        {isAuthenticated && <CardDescription>Logged in as {user?.email}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`
                rounded-full p-2 mb-2
                ${index === currentStep ? 'bg-blue-500 text-white' :
                  index < currentStep ? 'bg-green-500 text-white' : 'bg-gray-200'}
              `}>
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
            disabled={currentStep === steps.length - 1 || (currentStep === 0 && items.length === 0)}
          >
            {currentStep === steps.length - 2 ? 'Place Order' : 'Next'}
          </Button>) : (<Button
            onClick={handleNext}
            disabled={currentStep === 1}
          >
            {currentStep === steps.length - 2 ? 'Place Order' : 'Next'}
          </Button>)}
      </CardFooter>
    </Card>
  );
};

export default CheckoutStepper;