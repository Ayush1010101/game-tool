import Form from "./form";

export default function Signup() {
  return (
    <div className="flex flex-col py-20 py-12 sm:px-6 lg:px-8 bg-slate-900 min-h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="h-20 w-auto invert text-center mx-auto"
          src="https://i.imgur.com/8DxKT0H.png"
          alt="Minnal"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Signup to Minnal
        </h2>
      </div>
      <Form />
    </div>
  );
}
