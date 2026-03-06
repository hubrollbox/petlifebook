import { useState } from "react";
import { Camera, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { validateImage, compressImage } from "@/lib/imageUtils";

interface AddMemoryDialogProps {
  petId: string;
  onMemoryAdded: () => void;
}

const AddMemoryDialog = ({ petId, onMemoryAdded }: AddMemoryDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [memoryDate, setMemoryDate] = useState(new Date().toISOString().split("T")[0]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateImage(file);
    if (error) {
      toast({ title: "Imagem inválida", description: error.message, variant: "destructive" });
      return;
    }

    try {
      const compressed = await compressImage(file);
      setImageFile(compressed);
      setImagePreview(URL.createObjectURL(compressed));
    } catch {
      toast({ title: "Erro ao processar imagem", variant: "destructive" });
    }
  };

  const handleSubmit = async () => {
    if (!user || !title.trim()) {
      toast({ title: "Título obrigatório", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      let mediaUrl: string | null = null;
      let mediaType: string | null = null;

      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const path = `${user.id}/${petId}/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("pet-media").upload(path, imageFile);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from("pet-media").getPublicUrl(path);
        mediaUrl = publicUrl;
        mediaType = "photo";
      }

      const { error } = await supabase.from("memories").insert({
        pet_id: petId,
        user_id: user.id,
        title: title.trim(),
        content: content.trim() || null,
        memory_date: memoryDate,
        media_url: mediaUrl,
        media_type: mediaType,
      });

      if (error) throw error;

      toast({ title: "Memória adicionada!", description: `"${title}" foi guardada com sucesso.` });
      setOpen(false);
      resetForm();
      onMemoryAdded();
    } catch (err: any) {
      toast({ title: "Erro ao guardar memória", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setMemoryDate(new Date().toISOString().split("T")[0]);
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
      <DialogTrigger asChild>
        <Button variant="memorial">
          <Plus className="w-4 h-4 mr-2" />
          Nova Memória
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar Memória</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="mem-title">Título *</Label>
            <Input id="mem-title" placeholder="Ex: Primeiro dia em casa" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="mem-content">Descrição</Label>
            <Textarea id="mem-content" placeholder="Conte este momento especial..." rows={3} value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="mem-date">Data</Label>
            <Input id="mem-date" type="date" value={memoryDate} onChange={(e) => setMemoryDate(e.target.value)} />
          </div>
          <div>
            <Label>Foto</Label>
            <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                  <Button size="sm" variant="destructive" className="absolute top-2 right-2" onClick={() => { setImageFile(null); if (imagePreview) URL.revokeObjectURL(imagePreview); setImagePreview(null); }}>
                    Remover
                  </Button>
                </div>
              ) : (
                <>
                  <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" id="mem-image" />
                  <Button variant="outline" size="sm" onClick={() => document.getElementById("mem-image")?.click()}>
                    Selecionar Foto
                  </Button>
                </>
              )}
            </div>
          </div>
          <Button className="w-full" variant="memorial" onClick={handleSubmit} disabled={loading || !title.trim()}>
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> A guardar...</> : "Guardar Memória"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemoryDialog;
