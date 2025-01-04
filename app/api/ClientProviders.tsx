"use client"

import { SessionProvider } from "next-auth/react"
import { AuthProvider } from "@/lib/auth/AuthContext";
import React from "react"

const ClientProviders = ({children}: {children: React.ReactNode}) => {
    return (
        <SessionProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </SessionProvider>
    )
}

export default ClientProviders