import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import Button from "../ui/Button";
import { User, X, Save } from "lucide-react";
import { createCliente } from '../../services/clienteService';
import { useToast } from "../../context/ToastContext";

export default function ModalClienteForm({ isOpen, onClose, onSubmit, cliente }) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    documento: '',
    data_nascimento: '',
    endereco: {
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: ''
    },
    observacoes: ''
  });
  const { showToast } = useToast();

  useEffect(() => {
    if (cliente) {
      setForm({
        ...cliente,
        endereco: {
          rua: cliente.rua || '',
          numero: cliente.numero || '',
          complemento: cliente.complemento || '',
          bairro: cliente.bairro || '',
          cidade: cliente.cidade || '',
          estado: cliente.estado || '',
          cep: cliente.cep || ''
        }
      });
    } else {
      setForm({
        nome: '',
        email: '',
        telefone: '',
        documento: '',
        data_nascimento: '',
        endereco: {
          rua: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          estado: '',
          cep: ''
        },
        observacoes: ''
      });
    }
  }, [cliente]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (onSubmit) {
        await onSubmit(form);
      } else {
        await createCliente(form);
      }

      onClose();
      showToast(cliente ? 'Cliente atualizado com sucesso!' : 'Cliente salvo com sucesso!');
    } catch (err) {
      console.error('Erro ao salvar cliente:', err);
      showToast('Erro ao salvar cliente', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              <User className="w-5 h-5 text-blue-600" />
              {cliente ? "Editar Cliente" : "Novo Cliente"}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <h1 className="border-b text-xl pb-1 border-gray-200 font-medium">Dados Pessoais</h1>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="documento">CPF/CNPJ</Label>
                <Input
                  id="documento"
                  value={form.documento}
                  onChange={(e) => setForm({ ...form, documento: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={form.telefone}
                  onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <Label htmlFor="data_nascimento">Data de Nascimento</Label>
                <Input
                  id="data_nascimento"
                  type="date"
                  value={form.data_nascimento}
                  onChange={(e) => setForm({ ...form, data_nascimento: e.target.value })}
                />
              </div>
            </div>

            <h1 className="border-b text-xl pb-1 border-gray-200 font-medium">Endereço</h1>

            <div>
              <Label htmlFor="rua">Rua</Label>
              <Input
                id="rua"
                value={form.endereco.rua}
                onChange={(e) =>
                  setForm({ ...form, endereco: { ...form.endereco, rua: e.target.value } })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="numero">Número</Label>
                <Input
                  id="numero"
                  value={form.endereco.numero}
                  onChange={(e) =>
                    setForm({ ...form, endereco: { ...form.endereco, numero: e.target.value } })
                  }
                />
              </div>
              <div>
                <Label htmlFor="complemento">Complemento</Label>
                <Input
                  id="complemento"
                  value={form.endereco.complemento}
                  onChange={(e) =>
                    setForm({ ...form, endereco: { ...form.endereco, complemento: e.target.value } })
                  }
                />
              </div>
              <div>
                <Label htmlFor="bairro">Bairro</Label>
                <Input
                  id="bairro"
                  value={form.endereco.bairro}
                  onChange={(e) =>
                    setForm({ ...form, endereco: { ...form.endereco, bairro: e.target.value } })
                  }
                />
              </div>
              <div>
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  value={form.endereco.cidade}
                  onChange={(e) =>
                    setForm({ ...form, endereco: { ...form.endereco, cidade: e.target.value } })
                  }
                />
              </div>
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Input
                  id="estado"
                  value={form.endereco.estado}
                  onChange={(e) =>
                    setForm({ ...form, endereco: { ...form.endereco, estado: e.target.value } })
                  }
                />
              </div>
              <div>
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  value={form.endereco.cep}
                  onChange={(e) =>
                    setForm({ ...form, endereco: { ...form.endereco, cep: e.target.value } })
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={form.observacoes}
                onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
                rows={3}
                placeholder="Informações adicionais sobre o cliente..."
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="gradient-bg hover:opacity-90">
              <Save className="w-4 h-4 mr-2" />
              {cliente ? "Atualizar" : "Salvar"} Cliente
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
