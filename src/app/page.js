export default function Login() {
  return (
    <div className="flex  items-center justify-center h-screen">
      <div className="flex-col bg-white flex items-center justify-center p-4 rounded-md  ">
        <h1 className="text-black mb-4">Faça o seu login</h1>
        <form className="space-y-4" action="#">
          <div>
            <label className="block mb-2 font-medium text-black">
              Seu email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50"
            ></input>
          </div>
          <div>
            <label className="block mb-2 font-medium text-black">
              Sua senha:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-gray-50 border rounded border-gray-100"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}
