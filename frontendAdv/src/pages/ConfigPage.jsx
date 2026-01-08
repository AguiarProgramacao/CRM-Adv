import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Switch from "../components/ui/switch";
import { Input } from "../components/ui/input";
import Button from "../components/ui/Button";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { LogOut, Settings, User, Palette, LockOpen, Link } from "lucide-react";
import { getPerfil } from "../services/usuarioService";
import { useToast } from '../context/ToastContext';
import { conectarGoogleCalendar } from "../services/clienteService";
import { useTheme } from "../context/ThemeContext";

export default function ConfigPage({ isOpen }) {
  const { theme, toggleTheme } = useTheme();
  const [perfil, setPerfil] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    empresa: '',
  });
  const { showToast } = useToast("");
  const [qrCode, setQrCode] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const navigate = useNavigate("");

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setPerfil(parsedUser);
        setFormData({
          nome: parsedUser.nome || parsedUser.name || '',
          email: parsedUser.email || '',
          whatsapp: parsedUser.whatsapp || '',
          empresa: parsedUser.empresa || '',
        });
      } catch (err) {
        console.error('Erro ao parsear usuário do localStorage:', err);
      }
    }

    if (isOpen) {
      getPerfil()
        .then((data) => {
          setPerfil(data);
          setFormData({
            nome: data.nome || data.name || '',
            email: data.email || '',
            whatsapp: data.whatsapp || '',
            empresa: data.empresa || '',
          });
          localStorage.setItem('user', JSON.stringify(data));
        })
        .catch((err) => {
          showToast('Erro ao carregar perfil', 'error');
        });
    }
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  async function handleGoogleConnect() {
    await conectarGoogleCalendar();
  }

  async function handleWhatsappConnect() {
    try {
      const res = await fetch(
        "http://localhost:5678/webhook-test/fc55c33a-6b40-4e8c-b92d-9a3ae078854e",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            instanceName: formData.empresa,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Erro ao conectar WhatsApp");
      }

      setQrCode(data.base64);
      setShowQrModal(true);
    } catch (err) {
      console.error("Erro no webhook:", err);
      showToast("Erro ao conectar WhatsApp", "error");
    }
  }

  if (!perfil) {
    return <div className="p-6 text-gray-500">Carregando perfil...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="w-7 h-7" />
        <div>
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie seu perfil e preferências.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold flex"><User className='text-blue-500' /> Perfil do Usuário</h2>
            <p className="text-sm text-muted-foreground text-gray-400">
              Atualize suas informações pessoais e de contato.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nome Completo</Label>
              <Input value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={formData.email} disabled />
            </div>
            <div>
              <Label>Telefone</Label>
              <Input value={formData.whatsapp} onChange={e => setFormData({ ...formData, whatsapp: e.target.value })} />
            </div>
            <div>
              <Label>Empresa/Escritório</Label>
              <Input value={formData.empresa} onChange={e => setFormData({ ...formData, empresa: e.target.value })} />
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="default">Salvar Alterações</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2"><Link size={18} className='text-green-500' /> Integrações</h2>
            <p className="text-sm text-muted-foreground">
              Conecte sua conta a outros serviços.
            </p>
          </div>

          <div className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-3">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Google Calendar</span>
            </div>
            <Button onClick={handleGoogleConnect}>Conectar</Button>
          </div>

          <div className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-3">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                alt="Whatsapp"
                className="w-5 h-5"
              />
              <span>Whatsapp</span>
            </div>
            <Button onClick={handleWhatsappConnect}>Conectar</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2"><Palette size={18} className='text-orange-500' /> Aparência</h2>
            <p className="text-sm text-muted-foreground">
              Personalize a aparência do sistema.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span>Tema Escuro</span>
            <Switch checked={theme === "dark"} onChange={toggleTheme} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className='flex justify-between'>
            <div>
              <h2 className="text-lg font-semibold text-destructive flex items-center gap-2"><LockOpen size={18} className='text-purple-500' /> Sair da Conta</h2>
              <p className="text-sm text-muted-foreground">
                Encerra sua sessão atual de forma segura.
              </p>
            </div>
            <button className="flex bg-red-500 px-5 py-3 rounded text-white items-center hover:bg-red-700 cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 w-4 h-4" /> Sair
            </button>
          </div>
        </CardContent>
      </Card>

      {showQrModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-bold mb-4">
              Conectar WhatsApp
            </h2>

            {qrCode ? (
              <img
                src={qrCode}
                alt="QR Code WhatsApp"
                className="mx-auto mb-4"
              />
            ) : (
              <p className="text-gray-500">
                Gerando QR Code...
              </p>
            )}

            <p className="text-sm text-gray-600 mb-4">
              Abra o WhatsApp no celular e escaneie o QR Code.
            </p>

            <Button
              variant="outline"
              onClick={() => setShowQrModal(false)}
            >
              Fechar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
