import Link from 'next/link';
import { createClient } from "@/utils/supabase/server";




export default async function Games() {

    const supabase = createClient();
    const { data: games } = await supabase.from('game').select();
    if(!games){
      return <p>No games</p>
    }
    return games.map((games) => (
        <p key={games.gameid}>
        <Link href={`/games/${games.gameid}`}>{games.gamedate}</Link>
      </p>
      ))


}