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
import { useRouter } from "next/navigation";

export default function Page() {

  const { register, handleSubmit, formState: { errors } }
    = useForm({ resolver: zodResolver(authCredentialsValidator) });

  // const { data } = trpc.anyApiRoute.useQuery();
  // console.log(data);

  const router = useRouter();

  const { mutate, isLoading } =
    trpc.auth.createPayloadUser.useMutation({
      onError: (err) => {
        if (err.data?.code === 'CONFLICT') {
          toast.error(
            'This email is already in use. Sign in instead?'
          );
          return;
        }

        if (err instanceof ZodError) {
          toast.error(err.issues[0].message);
          return;
        }

        toast.error('Something went wrong. Please try again.');
      },
      onSuccess: ({ sentToEmail }) => {
        toast.success(`Verification email sent to ${sentToEmail}.`);
        router.push('/verify-email?to=' + sentToEmail);
      }
    });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    // Send data to server
    mutate({ email, password });
  }

  return <>
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />
          <h1 className="text-2xl font-bold">
            Create an account
          </h1>
          <Link
            className={buttonVariants({
              variant: 'link',
              className: "text-muted-foreground"
            })}
            href='/sign-in'>
            Already have an account? Sign-in
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="w-80 mx-auto">
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
              <Button>Sign up</Button>
            </div>
          </form>
        </div>
      </div>

    </div>
  </>
}