"use client";

import { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

export default function Page() {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            <Link href="#" className="text-sm font-semibold text-gray-900">
              Product
            </Link>
            <Link href="#" className="text-sm font-semibold text-gray-900">
              Features
            </Link>
            <Link href="#" className="text-sm font-semibold text-gray-900">
              Marketplace
            </Link>
            <Link href="#" className="text-sm font-semibold text-gray-900">
              Company
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}
