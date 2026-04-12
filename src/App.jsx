export default function DoctorToothComingSoon() {
  const floating = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-orange-100 text-slate-800 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-200/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/40 rounded-full blur-3xl animate-pulse" />
      </div>

      {floating.map((i) => (
        <div
          key={i}
          className="absolute text-4xl opacity-20 animate-bounce"
          style={{
            left: `${8 + i * 11}%`,
            top: `${10 + (i % 4) * 18}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${3 + (i % 3)}s`,
          }}
        >
          🦷
        </div>
      ))}

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10 min-h-screen flex flex-col">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-3xl shadow-xl">
              🦷
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Doctor Tooth Dental Care
              </h1>
              <p className="text-sm text-slate-500">
                Smile With Confidence
              </p>
            </div>
          </div>
        </header>

        <section className="grid lg:grid-cols-2 gap-10 items-center flex-1 py-16">
          <div>
            <div className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-semibold mb-6 shadow-sm">
              ✨ Modern Dental Experience
            </div>
            <h2 className="text-5xl md:text-7xl font-black leading-tight">
              WEBSITE <span className="text-orange-500">COMING SOON</span>
            </h2>
            <p className="mt-6 text-lg text-slate-600 max-w-xl leading-8">
              A brighter, cleaner, and more confident smile starts here.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
             <img
  src="/clinic.jpg"
  alt="Clinic"
  className="h-72 w-full object-cover rounded-[2rem] shadow-2xl border border-orange-100"
/>
              <div className="space-y-4">
                <img
  src="/reception.jpg"
  alt="Reception"
  className="h-32 w-full object-cover rounded-[2rem]"
/>
               <img
  src="/doctor.jpg"
  alt="Doctor"
  className="h-36 w-full object-cover rounded-[2rem]"
/>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}