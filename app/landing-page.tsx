export default function LandingPage(props) {
  return (
    <div className="bg-gray-900 pb-8 sm:pb-12 lg:pb-12 h-screen">
      <div className="pt-8 sm:pt-12 lg:relative lg:py-48 ">
        <div className="max-w-2xl mx-auto">
          <div>
            <img
              className="h-20 w-auto invert"
              src="https://i.imgur.com/8DxKT0H.png"
              alt="Minnal"
            />
          </div>
          <div className="mt-10">
            <div className="mt-6">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                The future of Games
              </h1>
              <p className="mt-6 text-xl text-gray-500">
                Minnal accelerates game development by providing a platform that
                turns game ideas into reality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
