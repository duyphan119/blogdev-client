"use client";

import { RiMailLine, RiMapPinLine, RiPhoneLine } from "react-icons/ri";
import ContactForm from "./contact-form";

type Props = {};

const Contact = (props: Props) => {
    return (
        <div className="mx-auto md:max-w-7xl md:px-4 sm:px-0 px-8 space-y-8">
            <ul className="grid grid-cols-12 gap-8">
                <li className="col-span-12 md:col-span-4 p-4 shadow border border-border rounded-sm">
                    <div className="flex items-center gap-4 h-full">
                        <RiMapPinLine className="text-3xl" />
                        <div className="flex-1">
                            <p className="font-bold">Location</p>
                            <p className="text-[0.8rem] text-neutral-500">
                                11/298/16 Nguyen Minh Truong, Ward 3, Tan An
                                city, Long An province
                            </p>
                        </div>
                    </div>
                </li>
                <li className="col-span-12 md:col-span-4 p-4 shadow border border-border rounded-sm">
                    <div className="flex items-center gap-4 h-full">
                        <RiMailLine className="text-3xl" />
                        <div className="flex-1">
                            <p className="font-bold">Email</p>
                            <p className="text-[0.8rem] text-neutral-500">
                                duychomap123@gmail.com
                            </p>
                        </div>
                    </div>
                </li>
                <li className="col-span-12 md:col-span-4 p-4 shadow border border-border rounded-sm">
                    <div className="flex items-center gap-4 h-full">
                        <RiPhoneLine className="text-3xl" />
                        <div className="flex-1">
                            <p className="font-bold">Technical Support</p>
                            <p className="text-[0.8rem] text-neutral-500">
                                +84 385 981 196
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 md:col-span-4">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.686093863111!2d106.42250427684975!3d10.525371463770645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310ab7630feb12e5%3A0x6fce6d936a95d2fd!2zMTEgTmd1eeG7hW4gTWluaCBUcsaw4budbmcsIFBoxrDhu51uZyAzLCBUw6JuIEFuLCBMb25nIEFuIDgyMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1707960563564!5m2!1svi!2s"
                        className="border-0 w-full h-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <div className="col-span-12 md:col-span-8">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};

export default Contact;
