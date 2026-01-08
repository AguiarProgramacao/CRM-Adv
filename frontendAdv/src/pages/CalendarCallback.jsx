import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      if (!code) return;

      await api.get(`/google/callback?code=${encodeURIComponent(code)}`);
      navigate("/configuracao");
    };

    handleCallback();
  }, [navigate]);

  return <p>Conectando sua conta Google...</p>;
}
