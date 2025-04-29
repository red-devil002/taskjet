"use client";

import React from "react";
import Navbar from "./(components)/Navbar/page";
import Sidebar from "./(components)/Sidebar/page";
import StoreProvider from "./redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
        {/* Sidebar */}
        <Sidebar />
        <main className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg md:pl-64`}>
            {/* Navbar */}
            <Navbar />
            {children}
        </main>
    </div>
  );
}

const DashboardWrapper = ({ children } : { children: React.ReactNode }) => {
  return(
    <StoreProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </StoreProvider>
  )
}

export default DashboardWrapper;