import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github, Twitter } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login attempted with:', { email, password });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" className="w-full">
                <Github className="h-4 w-4 mr-2" />
                Github
              </Button>
              <Button variant="outline" className="w-full">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="flex items-center justify-center">
              <div className="text-sm text-gray-500">
                Don&apos;t have an account?{' '}
                <a href="#" className="text-indigo-500 hover:text-indigo-600 font-medium">
                  Sign up
                </a>
              </div>
            </div>
            <div className="text-center">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-600">
                Forgot your password?
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;