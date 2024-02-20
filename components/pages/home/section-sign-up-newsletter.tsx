"use client";

import subscriberApi from "@/api/subscriber-api";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { PiArrowLineDownRightBold } from "react-icons/pi";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email({
        message: "Email is invalid",
    }),
});

export type SubscriberRequest = z.infer<typeof formSchema>;

type Props = {};

const SectionSignUpNewsletter = (props: Props) => {
    const { toast } = useToast();

    const form = useForm<SubscriberRequest>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: SubscriberRequest) => {
        try {
            const response = await subscriberApi.create(values);
            if (response.message === "Success") {
                toast({
                    title: "Thank you for sign up newsletter. We will send email when having a new post.",
                });
                form.reset();
            }
        } catch (error) {
            toast({
                title: "Something went wrong. Try Again",
                variant: "destructive",
            });
        }
    };

    return (
        <section
            className="md:p-32 sm:p-16 p-8"
            style={{
                backgroundImage: `url("https://i.pinimg.com/564x/85/bf/c9/85bfc913541db29d098b15c0b2f3ce4f.jpg")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="flex items-center md:flex-row flex-col md:gap-8 bg-white text-black sm:p-4 p-2 md:py-14 md:px-8 gap-y-8">
                <div className="md:flex-1 w-full md:w-auto space-y-4">
                    <div className="">
                        <PiArrowLineDownRightBold className="text-5xl" />
                    </div>
                    <p className="uppercase text-2xl font-bold">
                        SIGN UP FOR THE DAILY NEWSLETTER
                    </p>
                    <div className="">
                        <p className="">
                            Our biggest stories, delivered to your inbox every
                            day.
                        </p>
                        <Link
                            href="/newsletter"
                            className="text-neutral-500 underline-offset-4 underline"
                        >
                            See all newsletters.
                        </Link>
                    </div>
                </div>
                <div className="md:flex-1 w-full md:w-auto space-y-4">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex items-center gap-4 md:gap-8"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                placeholder="Email address"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="uppercase rounded-none"
                            >
                                Submit
                            </Button>
                        </form>
                    </Form>
                    <p className="text-neutral-500 text-[0.725rem]">
                        By signing up you agree to our&nbsp;
                        <Link
                            className="underline-offset-4 underline"
                            href="https://www.condenast.com/user-agreement"
                        >
                            User Agreement
                        </Link>
                        &nbsp; (including the&nbsp;
                        <Link
                            className="underline-offset-4 underline"
                            href="https://www.condenast.com/user-agreement#introduction-arbitration-notice"
                        >
                            class action waiver and arbitration provisions
                        </Link>
                        ), our&nbsp;
                        <Link
                            className="underline-offset-4 underline"
                            href="https://www.condenast.com/privacy-policy"
                        >
                            Privacy Policy &amp; Cookie Statement
                        </Link>
                        &nbsp; and to receive marketing and account-related
                        emails from WIRED. You can unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SectionSignUpNewsletter;
