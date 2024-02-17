"use client"

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TAuthCredentialsValidator, authCredentialsValidator } from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { toast } from 'sonner';
import { ZodError } from "zod";
import { useRouter, useSearchParams } from "next/navigation";


const separator = <div className="relative">
  <div className="absolute inset-0 flex items-center" aria-hidden="true">
    <span className="w-full border-t-2"></span>
  </div>
  <div className="relative flex justify-center text-xs uppercase ">
    <span className="bg-background ">or</span>
  </div>
</div>;


export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get('as') === 'seller';
  const origin = searchParams.get('origin');

  const { register, handleSubmit, formState: { errors } }
    = useForm({ resolver: zodResolver(authCredentialsValidator) });

  // const { data } = trpc.anyApiRoute.useQuery();
  // console.log(data);
  const continueAsSeller = () => router.push('?as=seller')
  const continueAsBuyer = () => router.replace('/sign-in', undefined)

  const { mutate: signIn, isLoading } =
    trpc.auth.signIn.useMutation({
      onSuccess: () => {
        toast.success("Signed in successfully");

        router.refresh();

        if (origin) {
          router.push(`/${origin}`);
          return;
        }

        if (isSeller) {
          router.push('/sell');
          return;
        }

        router.push('/');
        router.refresh();
      },

      onError: (err) => {
        if (err.data?.code === 'UNAUTHORIZED') {
          toast.error('Invalid email or password.')
        }
      }
    });


  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    // Send data to server
    signIn({ email, password });
  }

  return <>
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />
          <h1 className="text-2xl font-bold">
            Sign in to your {isSeller ? 'seller ' : ' '}account
          </h1>
          <Link
            className={buttonVariants({
              variant: 'link',
              className: "text-muted-foreground"
            })}
            href='/sign-up'>
            Don&apos;t have an account yet? Create account
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="w-80 mx-auto flex flex-col gap-6 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <div className="flex flex-col gap-1 ">
                <Label htmlFor='email'>Email</Label>
                <Input id="email"
                  {...register('email')}
                  className={cn({
                    "focus-visible:ring-red-500": true
                  })}
                  placeholder="you@example.com" />
                <p className="text-sm text-red-500">
                  {errors.email ? errors.email.message as string : <br />}
                </p>
              </div>
              <div className="flex flex-col gap-1 pt-2 pb-4 ">
                <Label htmlFor='email'>Password</Label>
                <Input id="password"
                  {...register('password')}
                  className={cn({
                    "focus-visible:ring-red-500": true
                  })}
                  placeholder="xxxx" />
                <p className="text-sm text-red-500">
                  {errors.password ? errors.password.message as string : <br />}
                </p>
              </div>
              <Button>Sign in</Button>
            </div>
          </form>

          {separator}

          {isSeller ?
            (
              <Button
                onClick={continueAsBuyer}
                variant='secondary'
                disabled={isLoading}
              >Continue as customer</Button>)
            :
            (
              <Button
                onClick={continueAsSeller}
                variant='secondary'
                disabled={isLoading}
              >Continue as seller</Button>
            )
          }
        </div>
      </div>

    </div>
  </>
}