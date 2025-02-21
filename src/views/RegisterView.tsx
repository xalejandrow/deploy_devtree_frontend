import { Link } from "react-router-dom";

export default function RegisterView() {
    return (
            <>
                <div className="text-4xl text-white font-bold">Crear Cuenta</div>

                <nav className="mt-10">
                    <Link 
                        className="text-center text-white text-lg block"
                        to="/auth/login"
                    >¿Ya tienes una cuenta? Inicia Sesión
                    </Link>
                </nav>
            </>
    )
}
