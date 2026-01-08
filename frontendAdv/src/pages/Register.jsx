import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    localStorage.setItem("novoUsuario", JSON.stringify(data));
    navigate("/planos");
  };

  return (
    <div className="min-h-screen flex">
      <div
        className="hidden md:flex w-1/2 items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="bg-blue-800 bg-opacity-40 p-8 rounded-xl text-white text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4">Crie sua conta!</h2>
          <p className="text-sm">
            Comece a gerenciar sua advocacia com tecnologia, segurança e eficiência.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-blue-100 px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white py-5 px-10 rounded-xl shadow-md w-full max-w-md"
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
            Cadastro
          </h1>

          <div className="mb-4">
            <label className="text-gray-700 text-sm font-semibold">Nome completo</label>
            <input
              {...register("nome")}
              placeholder="Seu nome"
              className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 text-sm font-semibold">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="exemplo@email.com"
              className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 text-sm font-semibold">Senha</label>
            <input
              {...register("senha")}
              type="password"
              placeholder="Crie uma senha"
              className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 text-sm font-semibold">WhatsApp</label>
            <input
              {...register("whatsapp")}
              placeholder="(xx) xxxxx-xxxx"
              className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-700 text-sm font-semibold">Nome do escritório</label>
            <input
              {...register("empresa")}
              placeholder="Nome do escritório"
              className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Salvando..." : "Selecionar Plano"}
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Já tem uma conta?</p>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="mt-2 text-blue-600 font-semibold hover:underline"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
