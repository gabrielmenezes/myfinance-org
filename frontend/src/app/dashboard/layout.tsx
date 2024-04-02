import Menu from "@/components/menu";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex min-h-screen items-center space-y-4 p-24 flex-col md:flex-row">
            <Menu />
            <div className="w-2/3 flex bg-blue-700">
                {children}
            </div>
        </main>
    )
}