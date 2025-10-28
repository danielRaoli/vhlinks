'use client'
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function RegistrarLink() {
    const [link, setLink] = useState('');
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchLink = async () => {
            const { data, error } = await supabase
                .from('links')
                .select('link')
                .eq('id', 1);
            console.log(data)
            if (error) {
                console.error('Erro ao buscar link:', error);
            } else {
                setLink(data?.[0]?.link || '');
            }
        }
        fetchLink();
    }, []);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const { data, error } = await supabase
            .from('links')
            .update({ link: link })
            .eq('id', 1);
        
        if (error) {
            console.error('Erro ao atualizar link:', error);
        } else {
            alert('Link atualizado com sucesso!')
        }
    }
  return (
    <div className="flex w-full h-screen bg-linear-to-b from-[#e651b9] to-[#c41dad] items-center justify-center  font-sans dark:bg-black">
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
        <label htmlFor="link" className="text-gray-700 font-medium">Digite o link</label>
        <input 
          id="link" 
          type="text" 
          value={link} 
          onChange={(e) => setLink(e.target.value)}
          className="px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="https://exemplo.com"
          required
        />
        <button 
          type="submit"
          className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
        >
          {isLoading ? 'Atualizando...' : 'Atualizar Link'}
        </button>
      </form>
    </div>
  );
}