
import { createClient } from "@supabase/supabase-js";


export default async function Home() {
  
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { data, error } = await supabase.from('links').select('*').eq('id', 1);



  return (
    <div className="flex w-full h-screen bg-linear-to-b from-[#e651b9] to-[#c41dad] items-center justify-center  font-sans dark:bg-black">
      <div className="flex justify-center items-center gap-8 flex-col w-full">
        <h1 className="text-white text-center text-4xl font-bold">😈Você tá só a um passo de acessar o meu VIP😈</h1>
        <a 
          rel="noopener noreferrer"
          href={data?.[0]?.link || ''} 
          className="text-white rounded-full bg-pink-600 p-4 text-2xl font-bold animate-bounce transition-all duration-1000 ease-in infinite"
        >
          QUERO ACESSAR AGORA!!
        </a>
      </div>

    </div>
  );
}
