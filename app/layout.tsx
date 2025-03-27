export default function LandingLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="flex min-h-screen h-full">
        <div className="flex-1 flex flex-col">
          <main className="flex-1 bg-[#0e0e0e] overflow-auto">
            {children}
          </main>
        </div>
      </div>
    )
  } 