
import { useState } from "react";
import { Upload, FileUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export function GraphUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if it's an image file
      if (!selectedFile.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (jpg, png, etc.)",
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreviewUrl(null);
    
    // Reset the file input
    const fileInput = document.getElementById('graph-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a graph image to upload",
        variant: "destructive",
      });
      return;
    }

    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please provide a title for your graph",
        variant: "destructive",
      });
      return;
    }

    // In a real application, you would send the file to your server here
    // For demonstration, we'll just show a success message
    toast({
      title: "Graph uploaded successfully",
      description: `Your graph "${title}" has been uploaded and will be reviewed.`,
    });

    // Clear the form
    setFile(null);
    setTitle("");
    setDescription("");
    setPreviewUrl(null);
    
    // Reset the file input
    const fileInput = document.getElementById('graph-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="border rounded-lg p-6 bg-card">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Graph Title</Label>
          <Input 
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Flood Frequency in Kerala (2010-2023)"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (optional)</Label>
          <Textarea 
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide details about the data source, methodology, or other relevant information"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="graph-upload">Upload Graph Image</Label>
          <div className="flex flex-col gap-4">
            {!previewUrl ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Input
                  id="graph-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <Label 
                  htmlFor="graph-upload" 
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                  <span className="text-lg font-medium">Click to upload graph</span>
                  <span className="text-sm text-muted-foreground mt-1">
                    PNG, JPG, GIF up to 10MB
                  </span>
                </Label>
              </div>
            ) : (
              <div className="relative">
                <img 
                  src={previewUrl} 
                  alt="Graph preview" 
                  className="max-h-[400px] mx-auto rounded-md border" 
                />
                <Button 
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={clearFile}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {file && (
              <div className="flex items-center gap-2 text-sm">
                <FileUp className="h-4 w-4" />
                <span className="text-muted-foreground">{file.name}</span>
                <span className="text-muted-foreground ml-auto">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full">
          Upload Graph
        </Button>
      </form>
    </div>
  );
}
